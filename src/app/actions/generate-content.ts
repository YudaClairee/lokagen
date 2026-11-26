"use server";

import { cookies, headers } from "next/headers";
import { openai, AI_MODEL, SYSTEM_PROMPT, generateUserPrompt } from "@/lib/openai";
import type {
  GenerateContentInput,
  GenerateContentResponse,
} from "@/lib/types";
import { VALIDATION, ERROR_MESSAGES } from "@/lib/constants";
import { AUTH_COOKIE, getAuthPassword, isValidAuthToken } from "@/lib/auth";
import { resolvePromoMode, extractPromoFacts } from "@/lib/promo";
import { normalizeContent } from "@/lib/normalize-content";

// Rate limit ringan per IP (in-memory per instance) untuk mencegah spam saat beta testing.
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000; // 5 menit
const RATE_LIMIT_MAX_REQUESTS = 10;
const requestLog = new Map<string, number[]>();

function isRateLimited(clientKey: string): boolean {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;
  const recent = (requestLog.get(clientKey) ?? []).filter((ts) => ts > cutoff);
  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(clientKey, recent);
    return true;
  }
  recent.push(now);
  requestLog.set(clientKey, recent);
  // Bersihkan key lama bila map terlalu besar
  if (requestLog.size > 500) {
    for (const [k, timestamps] of requestLog.entries()) {
      if (timestamps.every((ts) => ts <= cutoff)) requestLog.delete(k);
    }
  }
  return false;
}

export async function generateContent(
  input: GenerateContentInput
): Promise<GenerateContentResponse> {
  const startedAt = Date.now();
  try {
    // Lapis proteksi kedua (Edge middleware sudah memeriksa halaman /generate).
    if (!getAuthPassword()) {
      return { success: false, error: ERROR_MESSAGES.NOT_CONFIGURED };
    }
    const cookieStore = await cookies();
    if (!(await isValidAuthToken(cookieStore.get(AUTH_COOKIE)?.value))) {
      return { success: false, error: ERROR_MESSAGES.UNAUTHORIZED };
    }

    const headerStore = await headers();
    const forwarded = headerStore.get("x-forwarded-for")?.split(",")[0]?.trim();
    const clientIp = forwarded || headerStore.get("x-real-ip") || "unknown";
    if (isRateLimited(clientIp)) {
      return { success: false, error: ERROR_MESSAGES.RATE_LIMIT };
    }

    const { productName, productImage, description, brandInfo } = input;

    const hasImage =
      !!productImage && productImage.length > VALIDATION.MIN_IMAGE_SIZE;

    const promoMode = resolvePromoMode(input);
    const promoFacts = extractPromoFacts(input);
    // Semua angka yang sah berasal dari input user (dipakai normalizeContent).
    const userText = [
      productName,
      description,
      brandInfo?.storeName,
      brandInfo?.priceText,
      brandInfo?.promoBadge,
      brandInfo?.contactInfo,
      brandInfo?.location,
    ]
      .filter(Boolean)
      .join(" ");

    const userPrompt = generateUserPrompt({ input, hasImage, promoMode, promoFacts });

    const messages: Parameters<
      typeof openai.chat.completions.create
    >[0]["messages"] = [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
    ];

    if (hasImage) {
      messages.push({
        role: "user",
        content: [
          {
            type: "text",
            text: userPrompt,
          },
          {
            type: "image_url",
            image_url: {
              url: productImage.startsWith("data:")
                ? productImage
                : `data:image/jpeg;base64,${productImage}`,
              // "auto": gambar sudah dikompresi (maks 1080px), sehingga teks pada kemasan terbaca
              detail: "auto",
            },
          },
        ],
      });
    } else {
      messages.push({
        role: "user",
        content: userPrompt,
      });
    }

    const completion = await openai.chat.completions.create({
      model: AI_MODEL,
      messages,
      temperature: 0.7,
      max_tokens: 2048,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      return {
        success: false,
        error: ERROR_MESSAGES.NO_RESPONSE,
      };
    }

    let cleanedContent = content.trim();
    if (cleanedContent.startsWith("```json")) {
      cleanedContent = cleanedContent.replace(/^```json\s*/, "");
    } else if (cleanedContent.startsWith("```")) {
      cleanedContent = cleanedContent.replace(/^```\s*/, "");
    }
    if (cleanedContent.endsWith("```")) {
      cleanedContent = cleanedContent.replace(/\s*```$/, "");
    }

    const parsed: unknown = JSON.parse(cleanedContent.trim());
    const normalized = normalizeContent(parsed, promoMode, userText);

    if (!normalized) {
      return {
        success: false,
        error: ERROR_MESSAGES.INVALID_FORMAT,
      };
    }

    if (normalized.warnings.length) {
      console.warn("[generate] normalize:", normalized.warnings);
    }

    console.info("[generate] ok", {
      ms: Date.now() - startedAt,
      category: input.category,
      campaignType: input.campaignType,
      theme: input.theme,
      tone: input.tone,
      hasImage,
      warnings: normalized.warnings.length,
    });

    return {
      success: true,
      data: normalized.content,
    };
  } catch (error) {
    console.error("[generate] error:", { ms: Date.now() - startedAt, error });

    if (error instanceof SyntaxError) {
      return {
        success: false,
        error: ERROR_MESSAGES.PARSE_ERROR,
      };
    }

    if (error instanceof Error) {
      const msg = error.message.toLowerCase();
      if (error.name === "APIConnectionTimeoutError" || msg.includes("timeout") || msg.includes("timed out") || msg.includes("aborted")) {
        return {
          success: false,
          error: ERROR_MESSAGES.TIMEOUT,
        };
      }

      if (msg.includes("api key")) {
        return {
          success: false,
          error: ERROR_MESSAGES.INVALID_API_KEY,
        };
      }

      if (msg.includes("rate limit") || msg.includes("429")) {
        return {
          success: false,
          error: ERROR_MESSAGES.RATE_LIMIT,
        };
      }
    }

    return {
      success: false,
      error: ERROR_MESSAGES.GENERIC_ERROR,
    };
  }
}

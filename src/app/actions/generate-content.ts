"use server";

import { openai, AI_MODEL, SYSTEM_PROMPT, generateUserPrompt } from "@/lib/openai";
import type {
  GenerateContentInput,
  GenerateContentResponse,
} from "@/lib/types";
import { VALIDATION, ERROR_MESSAGES } from "@/lib/constants";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseServerConfigured } from "@/lib/supabase/config";
import { consumeGenerationCredit, refundGenerationCredit } from "@/lib/credits";
import { resolvePromoMode, extractPromoFacts } from "@/lib/promo";
import { normalizeContent } from "@/lib/normalize-content";

// Rate limit ringan per akun (in-memory per instance) untuk mencegah spam/double-click.
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
  let consumedForUserId: string | null = null;

  const refundIfConsumed = async (): Promise<number | undefined> => {
    if (!consumedForUserId) return undefined;
    const uid = consumedForUserId;
    consumedForUserId = null;
    const refunded = await refundGenerationCredit(uid);
    return refunded ?? undefined;
  };

  try {
    if (!isSupabaseServerConfigured()) {
      return { success: false, error: ERROR_MESSAGES.NOT_CONFIGURED };
    }

    const supabase = await createSupabaseServerClient();
    if (!supabase) {
      return { success: false, error: ERROR_MESSAGES.NOT_CONFIGURED };
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return { success: false, error: ERROR_MESSAGES.UNAUTHORIZED };
    }

    if (isRateLimited(user.id)) {
      return { success: false, error: ERROR_MESSAGES.RATE_LIMIT };
    }

    // Potong 1 kuota secara atomik sebelum memanggil AI (aman dari multi-tab/double-click).
    const fullName =
      (typeof user.user_metadata?.full_name === "string" && user.user_metadata.full_name) ||
      (typeof user.user_metadata?.name === "string" && user.user_metadata.name) ||
      null;

    const creditResult = await consumeGenerationCredit({
      id: user.id,
      email: user.email,
      fullName,
    });

    if (!creditResult) {
      return { success: false, error: ERROR_MESSAGES.GENERIC_ERROR };
    }

    if (!creditResult.allowed) {
      return {
        success: false,
        error: ERROR_MESSAGES.QUOTA_EXHAUSTED,
        creditsRemaining: creditResult.creditsRemaining,
        isUnlimited: creditResult.isUnlimited,
        quotaExhausted: true,
      };
    }

    if (!creditResult.isUnlimited) {
      consumedForUserId = user.id;
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
      const creditsRemaining = await refundIfConsumed();
      return {
        success: false,
        error: ERROR_MESSAGES.NO_RESPONSE,
        creditsRemaining,
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
      const creditsRemaining = await refundIfConsumed();
      return {
        success: false,
        error: ERROR_MESSAGES.INVALID_FORMAT,
        creditsRemaining,
      };
    }

    // Konten valid — kuota resmi terpakai.
    consumedForUserId = null;

    if (normalized.warnings.length) {
      console.warn("[generate] normalize:", normalized.warnings);
    }

    console.info("[generate] ok", {
      ms: Date.now() - startedAt,
      userId: user.id,
      creditsRemaining: creditResult.creditsRemaining,
      isUnlimited: creditResult.isUnlimited,
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
      creditsRemaining: creditResult.creditsRemaining,
      isUnlimited: creditResult.isUnlimited,
    };
  } catch (error) {
    const creditsRemaining = await refundIfConsumed();
    console.error("[generate] error:", { ms: Date.now() - startedAt, error });

    if (error instanceof SyntaxError) {
      return {
        success: false,
        error: ERROR_MESSAGES.PARSE_ERROR,
        creditsRemaining,
      };
    }

    if (error instanceof Error) {
      const msg = error.message.toLowerCase();
      if (error.name === "APIConnectionTimeoutError" || msg.includes("timeout") || msg.includes("timed out") || msg.includes("aborted")) {
        return {
          success: false,
          error: ERROR_MESSAGES.TIMEOUT,
          creditsRemaining,
        };
      }

      if (msg.includes("api key")) {
        return {
          success: false,
          error: ERROR_MESSAGES.INVALID_API_KEY,
          creditsRemaining,
        };
      }

      if (msg.includes("rate limit") || msg.includes("429")) {
        return {
          success: false,
          error: ERROR_MESSAGES.RATE_LIMIT,
          creditsRemaining,
        };
      }
    }

    return {
      success: false,
      error: ERROR_MESSAGES.GENERIC_ERROR,
      creditsRemaining,
    };
  }
}

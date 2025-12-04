"use server";

import { openai, SYSTEM_PROMPT, generateUserPrompt } from "@/lib/openai";
import type {
  GenerateContentInput,
  GenerateContentResponse,
  GeneratedContent,
} from "@/lib/types";

export async function generateContent(
  input: GenerateContentInput
): Promise<GenerateContentResponse> {
  try {
    
    const { productName, productImage, description, tone, theme, brandColor } = input;

    const hasImage = productImage && productImage.length > 100;

    // Build messages array
    const messages: Parameters<
      typeof openai.chat.completions.create
    >[0]["messages"] = [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
    ];

    // Add user message with or without image
    if (hasImage) {
      messages.push({
        role: "user",
        content: [
          {
            type: "text",
            text: generateUserPrompt(productName, description, tone, theme, brandColor, true),
          },
          {
            type: "image_url",
            image_url: {
              url: productImage.startsWith("data:")
                ? productImage
                : `data:image/jpeg;base64,${productImage}`,
              detail: "low",
            },
          },
        ],
      });
    } else {
      messages.push({
        role: "user",
        content: generateUserPrompt(productName, description, tone, theme, brandColor, false),
      });
    }

    const completion = await openai.chat.completions.create({
      model: "Claude Sonnet 4.5",
      messages,
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      return {
        success: false,
        error: "Tidak ada response dari AI. Silahkan coba lagi.",
      };
    }

    // Clean up markdown formatting
    let cleanedContent = content.trim();
    if (cleanedContent.startsWith("```json")) {
      cleanedContent = cleanedContent.replace(/^```json\s*/, "");
    } else if (cleanedContent.startsWith("```")) {
      cleanedContent = cleanedContent.replace(/^```\s*/, "");
    }
    if (cleanedContent.endsWith("```")) {
      cleanedContent = cleanedContent.replace(/\s*```$/, "");
    }

    const parsedContent = JSON.parse(cleanedContent.trim()) as GeneratedContent;

    if (
      !parsedContent.caption ||
      !parsedContent.slides ||
      parsedContent.slides.length !== 5
    ) {
      return {
        success: false,
        error: "Format response AI tidak valid. Silahkan coba lagi.",
      };
    }

    return {
      success: true,
      data: parsedContent,
    };
  } catch (error) {
    console.error("Error generating content:", error);

    if (error instanceof SyntaxError) {
      return {
        success: false,
        error: "Gagal parsing response AI. Silakan coba lagi.",
      };
    }

    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        return {
          success: false,
          error: "API key tidak valid. Hubungi admin.",
        };
      }

      if (error.message.includes("rate limit")) {
        return {
          success: false,
          error: "Terlalu banyak request. Coba lagi dalam beberapa saat.",
        };
      }
    }

    return {
      success: false,
      error: "Terjadi kesalahan. Silakan coba lagi.",
    };
  }
}

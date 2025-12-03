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
    const { productImage, description, tone } = input;

    // Check if image is provided (not empty base64)
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
            text: generateUserPrompt(description, tone, true),
          },
          {
            type: "image_url",
            image_url: {
              url: productImage.startsWith("data:")
                ? productImage
                : `data:image/jpeg;base64,${productImage}`,
              detail: "low", // Use low detail to save tokens
            },
          },
        ],
      });
    } else {
      messages.push({
        role: "user",
        content: generateUserPrompt(description, tone, false),
      });
    }

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "GLM 4.6",
      messages,
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 1500,
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      return {
        success: false,
        error: "Tidak ada response dari AI. Silakan coba lagi.",
      };
    }

    // Parse JSON response
    const parsedContent = JSON.parse(content) as GeneratedContent;

    // Validate the structure
    if (
      !parsedContent.caption ||
      !parsedContent.slides ||
      parsedContent.slides.length !== 5
    ) {
      return {
        success: false,
        error: "Format response AI tidak valid. Silakan coba lagi.",
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
      // Handle OpenAI specific errors
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

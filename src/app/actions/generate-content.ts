"use server";

import { openai, SYSTEM_PROMPT, generateUserPrompt } from "@/lib/openai";
import type {
  GenerateContentInput,
  GenerateContentResponse,
  GeneratedContent,
} from "@/lib/types";
import {
  VALIDATION,
  ERROR_MESSAGES,
  TOTAL_SLIDES,
} from "@/lib/constants";

export async function generateContent(
  input: GenerateContentInput
): Promise<GenerateContentResponse> {
  try {
    const { productName, productImage, description, tone, theme, brandColor } = input;

    const hasImage = productImage && productImage.length > VALIDATION.MIN_IMAGE_SIZE;

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
        error: ERROR_MESSAGES.NO_RESPONSE,
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
      parsedContent.slides.length !== TOTAL_SLIDES
    ) {
      return {
        success: false,
        error: ERROR_MESSAGES.INVALID_FORMAT,
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
        error: ERROR_MESSAGES.PARSE_ERROR,
      };
    }

    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        return {
          success: false,
          error: ERROR_MESSAGES.INVALID_API_KEY,
        };
      }

      if (error.message.includes("rate limit")) {
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

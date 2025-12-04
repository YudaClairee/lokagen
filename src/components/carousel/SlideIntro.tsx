"use client";

import { forwardRef } from "react";
import type { SlideIntro as SlideIntroType, Theme } from "@/lib/types";
import { getThemeStyles } from "./theme-utils";
import Image from "next/image";

interface SlideIntroProps {
  data: SlideIntroType;
  theme: Theme;
  brandColor: string;
  productImage?: string;
  isPlaceholder?: boolean;
}

export const SlideIntro = forwardRef<HTMLDivElement, SlideIntroProps>(
  function SlideIntro({ data, theme, brandColor, productImage, isPlaceholder }, ref) {
    const styles = getThemeStyles(theme, brandColor);

    return (
      <div
        ref={ref}
        className="relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden p-8"
        style={{ background: styles.background }}
      >
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: styles.pattern }}
        />

        {/* Product Image (if available) */}
        {productImage && (
          <div className="relative mb-6 h-32 w-32 overflow-hidden rounded-2xl shadow-2xl">
            <Image
              src={productImage}
              alt="Product"
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 text-center">
          <h1
            className="mb-4 text-3xl font-bold leading-tight md:text-4xl"
            style={{ color: styles.titleColor }}
          >
            {data.title}
          </h1>
          <p
            className="text-lg md:text-xl"
            style={{ color: styles.subtitleColor }}
          >
            {data.subtitle}
          </p>
        </div>

        {/* Accent Decoration */}
        <div
          className="absolute bottom-0 left-0 h-2 w-full"
          style={{ background: brandColor }}
        />

        {/* Slide Number */}
        <div
          className="absolute bottom-4 right-4 rounded-full px-3 py-1 text-xs font-medium"
          style={{
            background: styles.badgeBg,
            color: styles.badgeColor,
          }}
        >
          1/5
        </div>

        {isPlaceholder && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/60">
            <span className="text-slate-400">Preview</span>
          </div>
        )}
      </div>
    );
  }
);


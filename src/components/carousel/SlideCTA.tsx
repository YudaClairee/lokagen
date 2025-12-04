"use client";

import { forwardRef } from "react";
import type { SlideCTA as SlideCTAType, Theme } from "@/lib/types";
import { getThemeStyles } from "./theme-utils";
import { ArrowRight } from "lucide-react";

interface SlideCTAProps {
  data: SlideCTAType;
  theme: Theme;
  brandColor: string;
  isPlaceholder?: boolean;
}

export const SlideCTA = forwardRef<HTMLDivElement, SlideCTAProps>(
  function SlideCTA({ data, theme, brandColor, isPlaceholder }, ref) {
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

        {/* Background Accent Circle */}
        <div
          className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full opacity-20"
          style={{ background: brandColor }}
        />

        {/* Content */}
        <div className="relative z-10 text-center">
          <h2
            className="mb-6 text-3xl font-bold md:text-4xl"
            style={{ color: styles.titleColor }}
          >
            {data.title}
          </h2>

          <p
            className="mb-8 text-lg md:text-xl"
            style={{ color: styles.subtitleColor }}
          >
            {data.ctaText}
          </p>

          {/* CTA Button Visual */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-lg font-bold transition-transform hover:scale-105"
            style={{ background: brandColor, color: "#fff" }}
          >
            Order Sekarang
            <ArrowRight className="h-5 w-5" />
          </div>

          <p
            className="mt-4 text-sm"
            style={{ color: styles.mutedColor }}
          >
            Link di bio 👆
          </p>
        </div>

        {/* Slide Number */}
        <div
          className="absolute bottom-4 right-4 rounded-full px-3 py-1 text-xs font-medium"
          style={{
            background: styles.badgeBg,
            color: styles.badgeColor,
          }}
        >
          5/5
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


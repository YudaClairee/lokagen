"use client";

import { forwardRef } from "react";
import type { SlidePromo as SlidePromoType, Theme } from "@/lib/types";
import { getThemeStyles } from "./theme-utils";
import { Sparkles } from "lucide-react";

interface SlidePromoProps {
  data: SlidePromoType;
  theme: Theme;
  brandColor: string;
  isPlaceholder?: boolean;
}

export const SlidePromo = forwardRef<HTMLDivElement, SlidePromoProps>(
  function SlidePromo({ data, theme, brandColor, isPlaceholder }, ref) {
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

        {/* Sparkle Decorations */}
        <Sparkles
          className="absolute left-8 top-8 h-8 w-8 opacity-30"
          style={{ color: brandColor }}
        />
        <Sparkles
          className="absolute bottom-16 right-8 h-6 w-6 opacity-30"
          style={{ color: brandColor }}
        />

        {/* Content */}
        <div className="relative z-10 text-center">
          <div
            className="mb-4 inline-block rounded-full px-4 py-1 text-sm font-semibold"
            style={{ background: brandColor, color: "#fff" }}
          >
            PROMO SPESIAL
          </div>

          <h2
            className="mb-6 text-2xl font-bold md:text-3xl"
            style={{ color: styles.titleColor }}
          >
            {data.title}
          </h2>

          <div
            className="rounded-xl p-6"
            style={{
              background: styles.cardBg,
              border: `2px solid ${brandColor}`,
            }}
          >
            <p
              className="text-xl font-bold md:text-2xl"
              style={{ color: brandColor }}
            >
              {data.promoText}
            </p>
          </div>
        </div>

        {/* Corner Accent */}
        <div
          className="absolute right-0 top-0 h-24 w-24"
          style={{
            background: `linear-gradient(135deg, ${brandColor} 50%, transparent 50%)`,
            opacity: 0.3,
          }}
        />

        {/* Slide Number */}
        <div
          className="absolute bottom-4 right-4 rounded-full px-3 py-1 text-xs font-medium"
          style={{
            background: styles.badgeBg,
            color: styles.badgeColor,
          }}
        >
          4/5
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


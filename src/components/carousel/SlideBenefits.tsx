"use client";

import { forwardRef } from "react";
import type { SlideBenefits as SlideBenefitsType, Theme } from "@/lib/types";
import { getThemeStyles } from "./theme-utils";
import { Star } from "lucide-react";

interface SlideBenefitsProps {
  data: SlideBenefitsType;
  theme: Theme;
  brandColor: string;
  isPlaceholder?: boolean;
}

export const SlideBenefits = forwardRef<HTMLDivElement, SlideBenefitsProps>(
  function SlideBenefits({ data, theme, brandColor, isPlaceholder }, ref) {
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

        {/* Content */}
        <div className="relative z-10 w-full max-w-xs text-center">
          <h2
            className="mb-8 text-2xl font-bold md:text-3xl"
            style={{ color: styles.titleColor }}
          >
            {data.title}
          </h2>

          <ul className="space-y-4 text-left">
            {data.bullets.map((bullet, index) => (
              <li
                key={index}
                className="flex items-start gap-3"
              >
                <div
                  className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
                  style={{ background: brandColor }}
                >
                  <Star className="h-3 w-3 text-white" fill="white" />
                </div>
                <span
                  className="text-base font-medium md:text-lg"
                  style={{ color: styles.textColor }}
                >
                  {bullet}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Accent Decoration */}
        <div
          className="absolute right-0 top-0 h-full w-2"
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
          3/5
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


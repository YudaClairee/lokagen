"use client";

import { forwardRef } from "react";
import type { SlideCTAProps } from "../types";
import { ArrowUpRight } from "lucide-react";

export const SlideCTA = forwardRef<HTMLDivElement, SlideCTAProps>(
  function SlideCTA({ data, brandColor, isPlaceholder }, ref) {
    return (
      <div
        ref={ref}
        className="relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden bg-white p-10"
      >
        {/* Content */}
        <div className="relative z-10 max-w-[280px] text-center">
          <h2 className="mb-4 font-serif text-3xl font-light tracking-tight text-gray-900">
            {data.title}
          </h2>
          
          <p className="mb-8 text-sm font-light leading-relaxed text-gray-500">
            {data.ctaText}
          </p>

          {/* CTA Button - minimal style */}
          <div
            className="inline-flex items-center gap-2 rounded-none px-6 py-3 text-sm font-medium text-white transition-all hover:gap-3"
            style={{ background: brandColor }}
          >
            Order Sekarang
            <ArrowUpRight className="h-4 w-4" />
          </div>

          <p className="mt-6 text-[11px] font-light tracking-wide text-gray-400">
            Klik link di bio
          </p>
        </div>

        {/* Slide Number */}
        <div className="absolute bottom-6 right-6 text-[10px] font-medium uppercase tracking-[0.2em] text-gray-300">
          05 / 05
        </div>

        {isPlaceholder && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50/80">
            <span className="text-sm text-gray-400">Preview</span>
          </div>
        )}
      </div>
    );
  }
);


"use client";

import { forwardRef } from "react";
import type { SlidePromoProps } from "../types";

export const SlidePromo = forwardRef<HTMLDivElement, SlidePromoProps>(
  function SlidePromo({ data, brandColor, isPlaceholder }, ref) {
    return (
      <div
        ref={ref}
        className="relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden bg-white p-10"
      >
        {/* Content */}
        <div className="relative z-10 max-w-[280px] text-center">
          <span className="mb-3 inline-block text-[10px] font-medium uppercase tracking-[0.25em] text-gray-400">
            Special Offer
          </span>

          <h2 className="mb-6 font-serif text-2xl font-light tracking-tight text-gray-900">
            {data.title}
          </h2>

          <div 
            className="rounded-sm border border-gray-100 bg-gray-50/50 px-6 py-5"
          >
            <p 
              className="text-lg font-medium"
              style={{ color: brandColor }}
            >
              {data.promoText}
            </p>
          </div>
        </div>

        {/* Corner accent */}
        <div 
          className="absolute right-0 top-0 h-20 w-[2px]"
          style={{ background: brandColor }}
        />
        <div 
          className="absolute right-0 top-0 h-[2px] w-20"
          style={{ background: brandColor }}
        />

        {/* Slide Number */}
        <div className="absolute bottom-6 right-6 text-[10px] font-medium uppercase tracking-[0.2em] text-gray-300">
          04 / 05
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


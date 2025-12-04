"use client";

import { forwardRef } from "react";
import type { SlideBenefitsProps } from "../types";

export const SlideBenefits = forwardRef<HTMLDivElement, SlideBenefitsProps>(
  function SlideBenefits({ data, brandColor, isPlaceholder }, ref) {
    return (
      <div
        ref={ref}
        className="relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden bg-[#fafafa] p-10"
      >
        {/* Content */}
        <div className="relative z-10 w-full max-w-[280px]">
          <h2 className="mb-2 font-serif text-2xl font-light tracking-tight text-gray-900">
            {data.title}
          </h2>
          <div 
            className="mb-8 h-[2px] w-8"
            style={{ background: brandColor }}
          />

          <ul className="space-y-4">
            {data.bullets.map((bullet, index) => (
              <li key={index} className="flex items-start gap-3">
                <span 
                  className="mt-[6px] h-[6px] w-[6px] flex-shrink-0 rounded-full"
                  style={{ background: brandColor }}
                />
                <span className="text-sm font-light leading-relaxed text-gray-600">
                  {bullet}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Decorative line */}
        <div 
          className="absolute bottom-0 left-0 h-1 w-full opacity-10"
          style={{ background: brandColor }}
        />

        {/* Slide Number */}
        <div className="absolute bottom-6 right-6 text-[10px] font-medium uppercase tracking-[0.2em] text-gray-300">
          03 / 05
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


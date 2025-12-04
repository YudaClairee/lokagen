"use client";

import { forwardRef } from "react";
import type { SlideFeaturesProps } from "../types";

export const SlideFeatures = forwardRef<HTMLDivElement, SlideFeaturesProps>(
  function SlideFeatures({ data, brandColor, isPlaceholder }, ref) {
    return (
      <div
        ref={ref}
        className="relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden bg-white p-10"
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

          <ul className="space-y-5">
            {data.bullets.map((bullet, index) => (
              <li key={index} className="flex items-start gap-4">
                <span 
                  className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-medium text-white"
                  style={{ background: brandColor }}
                >
                  {index + 1}
                </span>
                <span className="text-sm font-light leading-relaxed text-gray-600">
                  {bullet}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Slide Number */}
        <div className="absolute bottom-6 right-6 text-[10px] font-medium uppercase tracking-[0.2em] text-gray-300">
          02 / 05
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


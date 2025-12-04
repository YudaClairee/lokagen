"use client";

import { forwardRef } from "react";
import type { SlideFeaturesProps } from "../types";

export const SlideFeatures = forwardRef<HTMLDivElement, SlideFeaturesProps>(
  function SlideFeatures({ data, brandColor, isPlaceholder }, ref) {
    return (
      <div
        ref={ref}
        className="relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden bg-black p-8"
      >
        {/* Content */}
        <div className="relative z-10 w-full max-w-[300px]">
          <h2 className="mb-8 text-3xl font-black uppercase leading-none tracking-tighter text-white">
            {data.title}
          </h2>

          <ul className="space-y-5">
            {data.bullets.map((bullet, index) => (
              <li key={index} className="flex items-start gap-4">
                <span 
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center text-lg font-black text-white"
                  style={{ background: brandColor }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="pt-1 text-sm font-semibold uppercase leading-relaxed tracking-wide text-white/80">
                  {bullet}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bold accent line */}
        <div 
          className="absolute left-0 top-0 h-2 w-full"
          style={{ background: brandColor }}
        />

        {/* Slide Number */}
        <div className="absolute bottom-6 right-6 text-xs font-black uppercase tracking-widest text-neutral-600">
          02—05
        </div>

        {isPlaceholder && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80">
            <span className="text-sm font-bold uppercase tracking-wider text-neutral-500">Preview</span>
          </div>
        )}
      </div>
    );
  }
);


"use client";

import { forwardRef } from "react";
import type { SlideBenefitsProps } from "../types";

export const SlideBenefits = forwardRef<HTMLDivElement, SlideBenefitsProps>(
  function SlideBenefits({ data, brandColor, isPlaceholder }, ref) {
    return (
      <div
        ref={ref}
        className="relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden p-8"
        style={{ background: brandColor }}
      >
        {/* Large background number */}
        <div className="absolute -right-8 top-1/2 -translate-y-1/2 text-[200px] font-black leading-none text-white/10">
          ✦
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-[300px]">
          <h2 className="mb-8 text-3xl font-black uppercase leading-none tracking-tighter text-white">
            {data.title}
          </h2>

          <ul className="space-y-4">
            {data.bullets.map((bullet, index) => (
              <li 
                key={index} 
                className="flex items-start gap-3 border-l-4 border-white/30 bg-black/10 py-3 pl-4"
              >
                <span className="text-sm font-bold uppercase leading-relaxed tracking-wide text-white">
                  {bullet}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Slide Number */}
        <div className="absolute bottom-6 right-6 text-xs font-black uppercase tracking-widest text-white/50">
          03—05
        </div>

        {isPlaceholder && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="text-sm font-bold uppercase tracking-wider text-white/50">Preview</span>
          </div>
        )}
      </div>
    );
  }
);


"use client";

import { forwardRef } from "react";
import type { SlideBenefitsProps } from "../types";
import { ChevronRight } from "lucide-react";

export const SlideBenefits = forwardRef<HTMLDivElement, SlideBenefitsProps>(
  function SlideBenefits({ data, brandColor, isPlaceholder }, ref) {
    return (
      <div
        ref={ref}
        className="relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden p-10"
        style={{
          background: `linear-gradient(135deg, #080810 0%, #12121c 100%)`,
        }}
      >
        {/* Radial glow background */}
        <div 
          className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-[100px]"
          style={{ background: brandColor }}
        />

        {/* Content */}
        <div className="relative z-10 w-full max-w-[280px]">
          <div 
            className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em]"
            style={{ color: brandColor }}
          >
            Benefits
          </div>
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-white">
            {data.title}
          </h2>

          <ul className="space-y-3">
            {data.bullets.map((bullet, index) => (
              <li 
                key={index} 
                className="flex items-center gap-2"
              >
                <ChevronRight 
                  className="h-4 w-4 flex-shrink-0" 
                  style={{ color: brandColor }} 
                />
                <span className="text-sm leading-relaxed text-gray-400">
                  {bullet}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Hexagon decoration */}
        <div 
          className="absolute -right-10 top-10 h-32 w-32 rotate-12 opacity-10"
          style={{
            background: `linear-gradient(135deg, ${brandColor} 0%, transparent 60%)`,
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          }}
        />

        {/* Slide Number */}
        <div 
          className="absolute bottom-5 right-5 rounded border px-2 py-1 text-[10px] font-mono tracking-wider"
          style={{ 
            borderColor: `${brandColor}50`,
            color: brandColor,
          }}
        >
          03/05
        </div>

        {isPlaceholder && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70">
            <span className="text-sm text-gray-500">Preview</span>
          </div>
        )}
      </div>
    );
  }
);


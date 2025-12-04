"use client";

import { forwardRef } from "react";
import type { SlideFeaturesProps } from "../types";
import { Zap } from "lucide-react";

export const SlideFeatures = forwardRef<HTMLDivElement, SlideFeaturesProps>(
  function SlideFeatures({ data, brandColor, isPlaceholder }, ref) {
    return (
      <div
        ref={ref}
        className="relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden p-10"
        style={{
          background: `linear-gradient(180deg, #0a0a0a 0%, #101018 100%)`,
        }}
      >
        {/* Scan lines effect */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 3px)`,
          }}
        />

        {/* Side glow */}
        <div 
          className="absolute left-0 top-1/4 h-1/2 w-1 blur-sm"
          style={{ background: brandColor }}
        />

        {/* Content */}
        <div className="relative z-10 w-full max-w-[280px]">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-white">
            {data.title}
          </h2>

          <ul className="space-y-4">
            {data.bullets.map((bullet, index) => (
              <li 
                key={index} 
                className="flex items-start gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3 backdrop-blur-sm"
              >
                <div 
                  className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded"
                  style={{ 
                    background: `${brandColor}20`,
                    boxShadow: `0 0 10px ${brandColor}40`,
                  }}
                >
                  <Zap className="h-3 w-3" style={{ color: brandColor }} />
                </div>
                <span className="text-sm leading-relaxed text-gray-300">
                  {bullet}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Corner decorations */}
        <div 
          className="absolute left-4 top-4 h-8 w-[2px]"
          style={{ background: `linear-gradient(180deg, ${brandColor}, transparent)` }}
        />
        <div 
          className="absolute left-4 top-4 h-[2px] w-8"
          style={{ background: `linear-gradient(90deg, ${brandColor}, transparent)` }}
        />

        {/* Slide Number */}
        <div 
          className="absolute bottom-5 right-5 rounded border px-2 py-1 text-[10px] font-mono tracking-wider"
          style={{ 
            borderColor: `${brandColor}50`,
            color: brandColor,
          }}
        >
          02/05
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


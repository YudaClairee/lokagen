"use client";

import { forwardRef } from "react";
import type { SlideFeaturesProps } from "../types";
import { Sparkles } from "lucide-react";

export const SlideFeatures = forwardRef<HTMLDivElement, SlideFeaturesProps>(
  function SlideFeatures({ data, brandColor, isPlaceholder }, ref) {
    const emojis = ['🔥', '💫', '✨', '⚡', '🎯'];
    
    return (
      <div
        ref={ref}
        className="relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden p-8"
        style={{
          background: `linear-gradient(180deg, #fce7f3 0%, #ede9fe 50%, #dbeafe 100%)`,
        }}
      >
        {/* Decorative circles */}
        <div className="absolute -left-6 top-1/4 h-20 w-20 rounded-full bg-yellow-300 opacity-40" />
        <div className="absolute -right-8 top-1/3 h-24 w-24 rounded-full bg-pink-300 opacity-40" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-[280px]">
          <div className="mb-6 flex items-center gap-2">
            <Sparkles className="h-5 w-5" style={{ color: brandColor }} />
            <h2 className="text-2xl font-black text-gray-800">
              {data.title}
            </h2>
          </div>

          <ul className="space-y-3">
            {data.bullets.map((bullet, index) => (
              <li 
                key={index} 
                className="flex items-start gap-3 rounded-2xl bg-white/80 p-4 shadow-sm backdrop-blur-sm"
              >
                <span className="text-xl">
                  {emojis[index % emojis.length]}
                </span>
                <span className="text-sm font-semibold leading-relaxed text-gray-700">
                  {bullet}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Colorful side accent */}
        <div 
          className="absolute left-0 top-0 h-full w-3 rounded-r-full"
          style={{ 
            background: `linear-gradient(180deg, #f472b6, ${brandColor}, #facc15)`,
          }}
        />

        {/* Slide Number */}
        <div 
          className="absolute bottom-6 right-6 rounded-full px-3 py-1 text-xs font-bold text-white shadow-lg"
          style={{ background: brandColor }}
        >
          2 of 5 💪
        </div>

        {isPlaceholder && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm">
            <span className="text-sm font-medium text-gray-500">Preview</span>
          </div>
        )}
      </div>
    );
  }
);


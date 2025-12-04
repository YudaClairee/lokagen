"use client";

import { forwardRef } from "react";
import type { SlideBenefitsProps } from "../types";
import { Heart } from "lucide-react";

export const SlideBenefits = forwardRef<HTMLDivElement, SlideBenefitsProps>(
  function SlideBenefits({ data, brandColor, isPlaceholder }, ref) {
    const emojis = ['💖', '🌟', '🎁', '💝', '🌈'];
    
    return (
      <div
        ref={ref}
        className="relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden p-8"
        style={{
          background: `linear-gradient(135deg, #d8b4fe 0%, #fce7f3 50%, #fbcfe8 100%)`,
        }}
      >
        {/* Floating hearts/shapes */}
        <div className="absolute right-8 top-8 text-3xl opacity-40">💜</div>
        <div className="absolute bottom-16 left-8 text-2xl opacity-40">💗</div>
        <div className="absolute left-12 top-24 text-xl opacity-30">✨</div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-[280px]">
          <div className="mb-6 flex items-center gap-2">
            <Heart className="h-5 w-5" style={{ color: brandColor }} fill={brandColor} />
            <h2 className="text-2xl font-black text-gray-800">
              {data.title}
            </h2>
          </div>

          <ul className="space-y-3">
            {data.bullets.map((bullet, index) => (
              <li 
                key={index} 
                className="flex items-center gap-3 rounded-xl bg-white/70 px-4 py-3 backdrop-blur-sm"
                style={{ 
                  borderLeft: `4px solid ${brandColor}`,
                }}
              >
                <span className="text-lg">{emojis[index % emojis.length]}</span>
                <span className="text-sm font-semibold text-gray-700">
                  {bullet}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Rainbow accent */}
        <div 
          className="absolute right-0 top-0 h-full w-3 rounded-l-full"
          style={{ 
            background: `linear-gradient(180deg, #f472b6, ${brandColor}, #34d399, #60a5fa)`,
          }}
        />

        {/* Slide Number */}
        <div 
          className="absolute bottom-6 right-6 rounded-full px-3 py-1 text-xs font-bold text-white shadow-lg"
          style={{ background: brandColor }}
        >
          3 of 5 💕
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


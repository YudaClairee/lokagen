"use client";

import { forwardRef } from "react";
import type { SlidePromoProps } from "../types";
import { Sparkles } from "lucide-react";

export const SlidePromo = forwardRef<HTMLDivElement, SlidePromoProps>(
  function SlidePromo({ data, brandColor, isPlaceholder }, ref) {
    return (
      <div
        ref={ref}
        className="relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden p-10"
        style={{
          background: `linear-gradient(180deg, #0a0a0f 0%, #0f0f18 100%)`,
        }}
      >
        {/* Animated gradient border effect (static for export) */}
        <div 
          className="absolute inset-4 rounded-2xl opacity-30"
          style={{
            background: `linear-gradient(135deg, ${brandColor}, transparent 40%, transparent 60%, ${brandColor})`,
            padding: '1px',
          }}
        />
        <div className="absolute inset-[17px] rounded-2xl bg-[#0c0c14]" />

        {/* Content */}
        <div className="relative z-10 max-w-[260px] text-center">
          <div 
            className="mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1"
            style={{ 
              borderColor: `${brandColor}50`,
              background: `${brandColor}10`,
            }}
          >
            <Sparkles className="h-3 w-3" style={{ color: brandColor }} />
            <span 
              className="text-[10px] font-semibold uppercase tracking-wider"
              style={{ color: brandColor }}
            >
              Limited Offer
            </span>
          </div>

          <h2 className="mb-6 text-2xl font-bold text-white">
            {data.title}
          </h2>

          <div 
            className="rounded-xl border p-5"
            style={{ 
              borderColor: `${brandColor}30`,
              background: `linear-gradient(135deg, ${brandColor}10 0%, transparent 100%)`,
              boxShadow: `0 0 30px ${brandColor}20`,
            }}
          >
            <p 
              className="text-lg font-bold"
              style={{ color: brandColor }}
            >
              {data.promoText}
            </p>
          </div>
        </div>

        {/* Slide Number */}
        <div 
          className="absolute bottom-5 right-5 rounded border px-2 py-1 text-[10px] font-mono tracking-wider"
          style={{ 
            borderColor: `${brandColor}50`,
            color: brandColor,
          }}
        >
          04/05
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


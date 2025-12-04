"use client";

import { forwardRef } from "react";
import type { SlideCTAProps } from "../types";
import { ArrowRight } from "lucide-react";

export const SlideCTA = forwardRef<HTMLDivElement, SlideCTAProps>(
  function SlideCTA({ data, brandColor, isPlaceholder }, ref) {
    return (
      <div
        ref={ref}
        className="relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden p-10"
        style={{
          background: `radial-gradient(ellipse at center, #141420 0%, #0a0a0f 100%)`,
        }}
      >
        {/* Central glow */}
        <div 
          className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[80px]"
          style={{ background: brandColor }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-[280px] text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white">
            {data.title}
          </h2>
          
          <p className="mb-8 text-sm leading-relaxed text-gray-400">
            {data.ctaText}
          </p>

          {/* CTA Button - cyber style */}
          <div
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg px-8 py-4 text-sm font-bold text-white transition-all"
            style={{ 
              background: brandColor,
              boxShadow: `0 0 20px ${brandColor}50`,
            }}
          >
            <span className="relative z-10">Order Sekarang</span>
            <ArrowRight className="relative z-10 h-4 w-4" />
            {/* Shine effect */}
            <div className="absolute -left-full top-0 h-full w-1/2 skew-x-12 bg-white/20" />
          </div>

          <p className="mt-6 text-xs text-gray-500">
            Link di bio 👆
          </p>
        </div>

        {/* Corner brackets */}
        <div className="absolute bottom-8 left-8 h-6 w-6 border-b-2 border-l-2" style={{ borderColor: `${brandColor}40` }} />
        <div className="absolute right-8 top-8 h-6 w-6 border-r-2 border-t-2" style={{ borderColor: `${brandColor}40` }} />

        {/* Slide Number */}
        <div 
          className="absolute bottom-5 right-5 rounded border px-2 py-1 text-[10px] font-mono tracking-wider"
          style={{ 
            borderColor: `${brandColor}50`,
            color: brandColor,
          }}
        >
          05/05
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


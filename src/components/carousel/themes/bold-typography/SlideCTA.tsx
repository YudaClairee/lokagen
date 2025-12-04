"use client";

import { forwardRef } from "react";
import type { SlideCTAProps } from "../types";
import { ArrowRight } from "lucide-react";

export const SlideCTA = forwardRef<HTMLDivElement, SlideCTAProps>(
  function SlideCTA({ data, brandColor, isPlaceholder }, ref) {
    return (
      <div
        ref={ref}
        className="relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden bg-[#fafafa] p-8"
      >
        {/* Large background text */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <span className="whitespace-nowrap text-[120px] font-black uppercase tracking-tighter text-black/[0.03]">
            ORDER NOW
          </span>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[300px] text-center">
          <h2 className="mb-4 text-4xl font-black uppercase leading-[0.9] tracking-tighter text-black">
            {data.title}
          </h2>
          
          <p className="mb-8 text-sm font-medium uppercase tracking-widest text-neutral-500">
            {data.ctaText}
          </p>

          {/* CTA Button - bold style */}
          <div
            className="inline-flex items-center gap-3 px-8 py-4 text-sm font-black uppercase tracking-wider text-white transition-transform hover:scale-105"
            style={{ background: brandColor }}
          >
            <span>Order Sekarang</span>
            <ArrowRight className="h-5 w-5" strokeWidth={3} />
          </div>

          <p className="mt-6 text-xs font-bold uppercase tracking-widest text-neutral-400">
            Link di bio ↑
          </p>
        </div>

        {/* Bottom accent */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-2"
          style={{ background: brandColor }}
        />

        {/* Slide Number */}
        <div className="absolute bottom-6 right-6 text-xs font-black uppercase tracking-widest text-neutral-300">
          05—05
        </div>

        {isPlaceholder && (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-100/80">
            <span className="text-sm font-bold uppercase tracking-wider text-neutral-400">Preview</span>
          </div>
        )}
      </div>
    );
  }
);


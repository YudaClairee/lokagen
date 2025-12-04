"use client";

import { forwardRef } from "react";
import type { SlidePromoProps } from "../types";

export const SlidePromo = forwardRef<HTMLDivElement, SlidePromoProps>(
  function SlidePromo({ data, brandColor, isPlaceholder }, ref) {
    return (
      <div
        ref={ref}
        className="relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden bg-black p-8"
      >
        {/* Diagonal stripes background */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              ${brandColor},
              ${brandColor} 2px,
              transparent 2px,
              transparent 20px
            )`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-[300px] text-center">
          <span 
            className="mb-4 inline-block px-3 py-1 text-xs font-black uppercase tracking-widest text-black"
            style={{ background: brandColor }}
          >
            Limited Offer
          </span>

          <h2 className="mb-6 text-3xl font-black uppercase leading-none tracking-tighter text-white">
            {data.title}
          </h2>

          <div 
            className="border-4 bg-transparent p-6"
            style={{ borderColor: brandColor }}
          >
            <p 
              className="text-2xl font-black uppercase tracking-tight"
              style={{ color: brandColor }}
            >
              {data.promoText}
            </p>
          </div>
        </div>

        {/* Corner accents */}
        <div 
          className="absolute left-4 top-4 h-12 w-12 border-l-4 border-t-4"
          style={{ borderColor: brandColor }}
        />
        <div 
          className="absolute bottom-4 right-4 h-12 w-12 border-b-4 border-r-4"
          style={{ borderColor: brandColor }}
        />

        {/* Slide Number */}
        <div className="absolute bottom-6 right-6 text-xs font-black uppercase tracking-widest text-neutral-600">
          04—05
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


"use client";

import { forwardRef } from "react";
import type { SlidePromoProps } from "../types";
import { Gift } from "lucide-react";

export const SlidePromo = forwardRef<HTMLDivElement, SlidePromoProps>(
  function SlidePromo({ data, brandColor, isPlaceholder }, ref) {
    return (
      <div
        ref={ref}
        className="relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden p-8"
        style={{
          background: `linear-gradient(135deg, #fef08a 0%, #fce7f3 50%, #c4b5fd 100%)`,
        }}
      >
        {/* Confetti-like shapes */}
        <div className="absolute left-8 top-12 h-4 w-4 rotate-45 rounded-sm bg-pink-400 opacity-60" />
        <div className="absolute right-12 top-20 h-3 w-3 rounded-full bg-yellow-400 opacity-70" />
        <div className="absolute bottom-24 left-16 h-3 w-3 rounded-full bg-purple-400 opacity-60" />
        <div className="absolute bottom-16 right-10 h-4 w-4 rotate-12 rounded-sm bg-blue-400 opacity-50" />
        <div className="absolute left-1/3 top-8 text-2xl">🎉</div>
        <div className="absolute bottom-20 right-1/4 text-xl">🎊</div>

        {/* Content */}
        <div className="relative z-10 max-w-[280px] text-center">
          <div 
            className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-white shadow-lg"
            style={{ background: brandColor }}
          >
            <Gift className="h-4 w-4" />
            <span>PROMO SPESIAL! 🔥</span>
          </div>

          <h2 className="mb-6 text-2xl font-black text-gray-800">
            {data.title}
          </h2>

          <div 
            className="relative rounded-3xl bg-white/90 p-6 shadow-xl backdrop-blur-sm"
          >
            {/* Sticker-like decoration */}
            <div 
              className="absolute -right-2 -top-2 flex h-12 w-12 rotate-12 items-center justify-center rounded-full text-white shadow-lg"
              style={{ background: brandColor }}
            >
              <span className="text-lg">🤑</span>
            </div>
            
            <p 
              className="text-xl font-black"
              style={{ color: brandColor }}
            >
              {data.promoText}
            </p>
          </div>
        </div>

        {/* Slide Number */}
        <div 
          className="absolute bottom-6 right-6 rounded-full px-3 py-1 text-xs font-bold text-white shadow-lg"
          style={{ background: brandColor }}
        >
          4 of 5 🎁
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


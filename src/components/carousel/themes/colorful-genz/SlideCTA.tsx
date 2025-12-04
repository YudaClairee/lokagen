"use client";

import { forwardRef } from "react";
import type { SlideCTAProps } from "../types";
import { ShoppingBag } from "lucide-react";

export const SlideCTA = forwardRef<HTMLDivElement, SlideCTAProps>(
  function SlideCTA({ data, brandColor, isPlaceholder }, ref) {
    return (
      <div
        ref={ref}
        className="relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden p-8"
        style={{
          background: `linear-gradient(180deg, #fce7f3 0%, #f0abfc 50%, #c4b5fd 100%)`,
        }}
      >
        {/* Decorations */}
        <div className="absolute left-6 top-6 text-3xl">🛍️</div>
        <div className="absolute bottom-1/3 right-6 text-2xl">💸</div>
        <div className="absolute left-12 top-1/3 h-8 w-8 rounded-full bg-yellow-300 opacity-50" />
        <div className="absolute bottom-1/4 right-12 h-6 w-6 rounded-full bg-pink-300 opacity-50" />

        {/* Content */}
        <div className="relative z-10 max-w-[280px] text-center">
          <h2 className="mb-4 text-3xl font-black text-gray-800">
            {data.title}
          </h2>
          
          <p className="mb-8 rounded-full bg-white/70 px-4 py-2 text-sm font-medium text-gray-600 backdrop-blur-sm">
            {data.ctaText}
          </p>

          {/* CTA Button - fun gradient style */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-bold text-white shadow-xl transition-transform hover:scale-105"
            style={{ 
              background: `linear-gradient(135deg, ${brandColor}, #f472b6)`,
            }}
          >
            <ShoppingBag className="h-5 w-5" />
            <span>Order Sekarang!</span>
          </div>

          <p className="mt-6 text-sm font-bold text-gray-600">
            👆 Klik link di bio ya! 👆
          </p>
        </div>

        {/* Wavy top border */}
        <div 
          className="absolute left-0 right-0 top-0 h-4"
          style={{ 
            background: brandColor,
            clipPath: 'polygon(0% 0%, 0% 50%, 5% 60%, 10% 50%, 15% 60%, 20% 50%, 25% 60%, 30% 50%, 35% 60%, 40% 50%, 45% 60%, 50% 50%, 55% 60%, 60% 50%, 65% 60%, 70% 50%, 75% 60%, 80% 50%, 85% 60%, 90% 50%, 95% 60%, 100% 50%, 100% 0%)',
          }}
        />

        {/* Slide Number */}
        <div 
          className="absolute bottom-6 right-6 rounded-full px-3 py-1 text-xs font-bold text-white shadow-lg"
          style={{ background: brandColor }}
        >
          5 of 5 🚀
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


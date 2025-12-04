"use client";

import { forwardRef } from "react";
import type { SlideIntroProps } from "../types";
import Image from "next/image";

export const SlideIntro = forwardRef<HTMLDivElement, SlideIntroProps>(
  function SlideIntro({ data, brandColor, productImage, isPlaceholder }, ref) {
    return (
      <div
        ref={ref}
        className="relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden p-8"
        style={{
          background: `linear-gradient(135deg, #fef3c7 0%, #fce7f3 35%, #ddd6fe 65%, #cffafe 100%)`,
        }}
      >
        {/* Floating shapes */}
        <div 
          className="absolute right-6 top-6 h-16 w-16 rounded-full opacity-40"
          style={{ background: brandColor }}
        />
        <div 
          className="absolute bottom-20 left-8 h-10 w-10 rotate-45 rounded-lg opacity-30"
          style={{ background: brandColor }}
        />
        <div className="absolute left-16 top-16 h-6 w-6 rounded-full bg-pink-400 opacity-50" />
        <div className="absolute bottom-32 right-16 h-8 w-8 rounded-full bg-yellow-400 opacity-50" />

        {/* Product Image with fun border */}
        {productImage && (
          <div className="relative mb-6">
            <div className="absolute -inset-2 rotate-3 rounded-3xl bg-white/60" />
            <div className="absolute -inset-2 -rotate-2 rounded-3xl bg-white/40" />
            <div className="relative h-28 w-28 overflow-hidden rounded-2xl border-4 border-white shadow-xl">
              <Image
                src={productImage}
                alt="Product"
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 max-w-[280px] text-center">
          <h1 className="mb-3 text-3xl font-black tracking-tight text-gray-800">
            {data.title}
          </h1>
          <p className="rounded-full bg-white/70 px-4 py-2 text-base font-medium text-gray-600 backdrop-blur-sm">
            {data.subtitle}
          </p>
        </div>

        {/* Wavy bottom border */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-4"
          style={{ 
            background: brandColor,
            clipPath: 'polygon(0% 100%, 0% 50%, 5% 40%, 10% 50%, 15% 40%, 20% 50%, 25% 40%, 30% 50%, 35% 40%, 40% 50%, 45% 40%, 50% 50%, 55% 40%, 60% 50%, 65% 40%, 70% 50%, 75% 40%, 80% 50%, 85% 40%, 90% 50%, 95% 40%, 100% 50%, 100% 100%)',
          }}
        />

        {/* Slide Number - playful style */}
        <div 
          className="absolute bottom-6 right-6 rounded-full px-3 py-1 text-xs font-bold text-white shadow-lg"
          style={{ background: brandColor }}
        >
          1 of 5 ✨
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


"use client";

import { forwardRef } from "react";
import type { SlideIntroProps } from "../types";
import Image from "next/image";

export const SlideIntro = forwardRef<HTMLDivElement, SlideIntroProps>(
  function SlideIntro({ data, brandColor, productImage, isPlaceholder }, ref) {
    return (
      <div
        ref={ref}
        className="relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden bg-white p-10"
      >
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(${brandColor} 1px, transparent 1px), linear-gradient(90deg, ${brandColor} 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Product Image */}
        {productImage && (
          <div className="relative mb-8 h-28 w-28 overflow-hidden rounded-lg shadow-sm ring-1 ring-gray-100">
            <Image
              src={productImage}
              alt="Product"
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 max-w-[280px] text-center">
          <h1 className="mb-3 font-serif text-3xl font-light tracking-tight text-gray-900">
            {data.title}
          </h1>
          <div 
            className="mx-auto mb-4 h-[2px] w-12"
            style={{ background: brandColor }}
          />
          <p className="text-base font-light leading-relaxed text-gray-500">
            {data.subtitle}
          </p>
        </div>

        {/* Slide Number - minimal style */}
        <div className="absolute bottom-6 right-6 text-[10px] font-medium uppercase tracking-[0.2em] text-gray-300">
          01 / 05
        </div>

        {isPlaceholder && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50/80">
            <span className="text-sm text-gray-400">Preview</span>
          </div>
        )}
      </div>
    );
  }
);


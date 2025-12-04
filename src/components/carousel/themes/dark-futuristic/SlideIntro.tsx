"use client";

import { forwardRef } from "react";
import type { SlideIntroProps } from "../types";
import Image from "next/image";

export const SlideIntro = forwardRef<HTMLDivElement, SlideIntroProps>(
  function SlideIntro({ data, brandColor, productImage, isPlaceholder }, ref) {
    return (
      <div
        ref={ref}
        className="relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden p-10"
        style={{
          background: `linear-gradient(135deg, #0a0a0a 0%, #141420 50%, #0a0a12 100%)`,
        }}
      >
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(${brandColor}30 1px, transparent 1px),
              linear-gradient(90deg, ${brandColor}30 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px',
          }}
        />

        {/* Glow effects */}
        <div 
          className="absolute -left-20 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full blur-[100px] opacity-30"
          style={{ background: brandColor }}
        />
        <div 
          className="absolute -right-20 bottom-1/4 h-32 w-32 rounded-full blur-[80px] opacity-20"
          style={{ background: brandColor }}
        />

        {/* Product Image with glow */}
        {productImage && (
          <div className="relative mb-8">
            <div 
              className="absolute inset-0 rounded-xl blur-xl opacity-50"
              style={{ background: brandColor }}
            />
            <div className="relative h-28 w-28 overflow-hidden rounded-xl border border-white/10 shadow-2xl">
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
        <div className="relative z-10 max-w-[300px] text-center">
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-white">
            {data.title}
          </h1>
          <p className="text-base leading-relaxed text-gray-400">
            {data.subtitle}
          </p>
        </div>

        {/* Bottom accent line with glow */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px]">
          <div 
            className="h-full w-full"
            style={{ 
              background: `linear-gradient(90deg, transparent, ${brandColor}, transparent)`,
            }}
          />
        </div>

        {/* Slide Number - tech style */}
        <div 
          className="absolute bottom-5 right-5 rounded border px-2 py-1 text-[10px] font-mono tracking-wider"
          style={{ 
            borderColor: `${brandColor}50`,
            color: brandColor,
          }}
        >
          01/05
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


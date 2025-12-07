"use client";

import { forwardRef } from "react";
import type { SlideIntroProps } from "../types";
import Image from "next/image";

export const SlideIntro = forwardRef<HTMLDivElement, SlideIntroProps>(
  function SlideIntro({ data, productName, brandColor, productImage, isPlaceholder }, ref) {
    return (
      <div
        ref={ref}
        className="relative flex aspect-square w-full flex-col overflow-hidden bg-white text-black"
      >
        {/* Massive Background Text - Decorative */}
        <div className="absolute -left-10 top-0 text-[180px] font-black leading-none opacity-[0.03] select-none">
          {productName ? productName.toUpperCase() : 'INTRO'}
        </div>

        {/* Brand Accent Bar */}
        <div 
          className="absolute left-0 top-10 h-4 w-32"
          style={{ backgroundColor: brandColor }}
        />

        {/* Content Container */}
        <div className="relative z-10 flex h-full flex-col p-10">
          
          {/* Main Title Area */}
          <div className="mt-12">
            <h1 className="text-[60px] font-black leading-[0.9] tracking-tighter mix-blend-multiply">
              {data.title.split(" ").map((word, i) => (
                <span key={i} className="block">{word}</span>
              ))}
            </h1>
          </div>

          {/* Subtitle with stark divider */}
          <div className="mt-8 flex items-start gap-4">
            <div className="mt-2 h-[2px] w-12 bg-black" />
            <p className="max-w-[250px] text-lg font-bold leading-tight text-gray-800">
              {data.subtitle}
            </p>
          </div>

          {/* Image Area - Brutalist Offset */}
          {productImage ? (
            <div className="absolute bottom-10 right-10 h-48 w-48 border-4 border-black bg-gray-100 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src={productImage}
                  alt="Product"
                  fill
                  className="object-cover grayscale"
                />
              </div>
            </div>
          ) : (
             <div className="absolute bottom-10 right-10 flex h-48 w-48 items-center justify-center border-4 border-black bg-gray-100 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <span className="font-black text-gray-300">IMG</span>
             </div>
          )}
        </div>

        {/* Slide Number */}
        <div className="absolute bottom-5 left-5 font-mono text-xs font-bold">
          01 / 05
        </div>

        {isPlaceholder && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/5">
            <span className="bg-black px-2 py-1 font-mono text-xs text-white">PREVIEW ONLY</span>
          </div>
        )}
      </div>
    );
  }
);

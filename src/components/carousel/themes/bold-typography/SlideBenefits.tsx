"use client";

import { forwardRef } from "react";
import type { SlideBenefitsProps } from "../types";
import Image from "next/image";

export const SlideBenefits = forwardRef<HTMLDivElement, SlideBenefitsProps>(
  function SlideBenefits({ data, brandColor, productImage, isPlaceholder }, ref) {
    return (
      <div
        ref={ref}
        className="relative flex aspect-square w-full flex-col overflow-hidden bg-black p-8 text-white"
      >
        {/* Background Image if present */}
        {productImage && (
          <div className="absolute inset-0 z-0">
            <Image
              src={productImage}
              alt="Background"
              fill
              className="object-cover opacity-20 filter grayscale"
            />
            <div className="absolute inset-0 bg-black/80" />
          </div>
        )}
        {/* Giant Number Background */}
        <div 
          className="absolute right-[-20px] top-[-40px] text-[200px] font-black leading-none opacity-20"
          style={{ color: brandColor }}
        >
          03
        </div>

        <div className="relative z-10 mt-20">
          <h2 className="mb-8 border-l-4 border-white pl-6 text-5xl font-black uppercase italic leading-[0.8] tracking-tighter">
            WHY <br />
            CHOOSE <br />
            US?
          </h2>

          <div className="space-y-4">
            {data.bullets.map((bullet, index) => (
              <div 
                key={index}
                className="group flex items-center gap-4 border-b border-white/20 pb-2"
              >
                <div 
                  className="h-3 w-3 rotate-45" 
                  style={{ backgroundColor: brandColor }}
                />
                <p className="text-xl font-bold uppercase tracking-wide">
                  {bullet}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Tag */}
        <div 
          className="absolute bottom-8 right-8 bg-white px-4 py-2 text-sm font-bold text-black"
        >
          {data.title}
        </div>

        {isPlaceholder && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/10">
             <span className="bg-white px-2 py-1 font-mono text-xs text-black">PREVIEW ONLY</span>
          </div>
        )}
      </div>
    );
  }
);

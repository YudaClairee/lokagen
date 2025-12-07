"use client";

import { forwardRef } from "react";
import type { SlideFeaturesProps } from "../types";
import Image from "next/image";

export const SlideFeatures = forwardRef<HTMLDivElement, SlideFeaturesProps>(
  function SlideFeatures({ data, brandColor, productImage, isPlaceholder }, ref) {
    return (
      <div
        ref={ref}
        className="relative flex aspect-square w-full flex-col overflow-hidden bg-white p-8 text-black"
      >
        {/* Background Image if present */}
        {productImage && (
          <div className="absolute inset-0 z-0">
            <Image
              src={productImage}
              alt="Background"
              fill
              className="object-cover opacity-10 filter grayscale"
            />
            <div className="absolute inset-0 bg-white/90" />
          </div>
        )}
        {/* Header - Heavy Border Bottom */}
        <div className="mb-8 border-b-4 border-black pb-4">
          <h2 className="text-4xl font-black uppercase tracking-tighter">
            FEATURES
          </h2>
        </div>

        {/* Features Grid */}
        <div className="flex flex-1 flex-col justify-center gap-6">
          {data.bullets.map((bullet, index) => (
            <div 
              key={index} 
              className="relative border-l-8 bg-gray-50 p-4"
              style={{ borderLeftColor: brandColor }}
            >
              <div className="absolute -top-3 -right-2 bg-black px-2 py-0.5 text-xs font-bold text-white">
                0{index + 1}
              </div>
              <p className="font-bold leading-tight text-gray-900">
                {bullet}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Marquee-like Element */}
        <div 
          className="absolute bottom-0 left-0 h-12 w-full overflow-hidden border-t-4 border-black bg-black text-white"
        >
          <div className="flex h-full items-center whitespace-nowrap px-4 font-mono text-sm font-bold uppercase tracking-widest">
            {data.title} • {data.title} • {data.title}
          </div>
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

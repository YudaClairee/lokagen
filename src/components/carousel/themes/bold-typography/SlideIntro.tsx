"use client";

import { forwardRef } from "react";
import type { SlideIntroProps } from "../types";
import Image from "next/image";

export const SlideIntro = forwardRef<HTMLDivElement, SlideIntroProps>(
  function SlideIntro({ data, brandColor, productImage, isPlaceholder }, ref) {
    return (
      <div
        ref={ref}
        className="relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden bg-[#fafafa] p-8"
      >
        {/* Large background text */}
        <div 
          className="absolute inset-0 flex items-center justify-center overflow-hidden opacity-[0.03]"
          style={{ color: brandColor }}
        >
          <span className="whitespace-nowrap text-[180px] font-black uppercase tracking-tighter">
            {data.title.split(' ')[0]}
          </span>
        </div>

        {/* Product Image */}
        {productImage && (
          <div className="relative mb-6 h-24 w-24 overflow-hidden rounded-lg shadow-2xl">
            <Image
              src={productImage}
              alt="Product"
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 max-w-[320px] text-center">
          <h1 className="mb-4 text-4xl font-black uppercase leading-[0.9] tracking-tighter text-black md:text-5xl">
            {data.title}
          </h1>
          <div 
            className="mx-auto mb-4 h-1 w-16"
            style={{ background: brandColor }}
          />
          <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">
            {data.subtitle}
          </p>
        </div>

        {/* Slide Number - bold style */}
        <div className="absolute bottom-6 right-6 text-xs font-black uppercase tracking-widest text-neutral-300">
          01—05
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


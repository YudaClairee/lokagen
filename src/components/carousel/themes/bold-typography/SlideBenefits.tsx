"use client";

import { forwardRef } from "react";
import type { SlideBenefitsProps } from "../types";
import { fitText } from "../fit-text";
import { BackgroundImage, PreviewOverlay } from "../shared";

export const SlideBenefits = forwardRef<HTMLDivElement, SlideBenefitsProps>(
  function SlideBenefits({ data, brandColor, productImage, isPlaceholder, productName, brandInfo }, ref) {
    return (
      <div
        ref={ref}
        lang="id"
        className="relative flex h-full w-full flex-col overflow-hidden bg-black p-8 text-white"
      >
        <BackgroundImage src={productImage} opacity={0.2} grayscale overlayClassName="bg-black/80" />
        <div 
          className="absolute right-[-20px] top-[-40px] text-[200px] font-black leading-none opacity-20"
          style={{ color: brandColor }}
        >
          03
        </div>

        <div className="relative z-10 mt-20">
          <h2 className={`mb-8 break-words border-l-4 border-white pl-6 font-black uppercase italic leading-[0.9] tracking-tighter ${fitText(data.title, [[12, "text-5xl"], [18, "text-4xl"]], "text-3xl")}`}>
            {data.title}
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
                <p className="break-words text-xl font-bold uppercase tracking-wide">
                  {bullet}
                </p>
              </div>
            ))}
          </div>
        </div>

        {(productName || brandInfo?.storeName) && (
          <div
            className="absolute bottom-8 right-8 max-w-[60%] truncate bg-white px-4 py-2 text-sm font-bold text-black"
          >
            {productName || brandInfo?.storeName}
          </div>
        )}

        <PreviewOverlay active={isPlaceholder} variant="boldDark" />
      </div>
    );
  }
);

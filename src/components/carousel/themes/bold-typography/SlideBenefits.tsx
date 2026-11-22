"use client";

import { forwardRef } from "react";
import type { SlideBenefitsProps } from "../types";
import { fitText } from "../fit-text";
import { getBoldAccents } from "./parts";
import { BackgroundImage, PreviewOverlay } from "../shared";

export const SlideBenefits = forwardRef<HTMLDivElement, SlideBenefitsProps>(
  function SlideBenefits({ data, brandColor, productImage, isPlaceholder, productName, brandInfo }, ref) {
    const accent = getBoldAccents(brandColor);
    return (
      <div
        ref={ref}
        lang="id"
        className="relative flex h-full w-full flex-col overflow-hidden bg-black p-8 text-white"
      >
        <BackgroundImage src={productImage} opacity={0.2} grayscale overlayClassName="bg-black/80" />
        <div 
          className="absolute right-[-20px] top-[-40px] font-bold-display text-[200px] leading-none opacity-20"
          style={{ color: brandColor }}
        >
          03
        </div>

        <div className="relative z-10 mt-16">
          <h2 className={`mb-6 break-words border-l-4 border-white pl-6 font-bold-display font-normal uppercase leading-[0.95] tracking-normal ${fitText(data.title, [[14, "text-5xl"], [22, "text-4xl"]], "text-3xl")}`}>
            {data.title}
          </h2>

          <div className="space-y-4">
            {data.bullets.map((bullet, index) => (
              <div 
                key={index}
                className="group flex items-center gap-4 border-b border-white/20 pb-2"
              >
                <div 
                  className="h-3 w-3 shrink-0 rotate-45" 
                  style={{ backgroundColor: accent.onDark }}
                />
                <p className="line-clamp-2 break-words text-xl font-bold uppercase tracking-wide">
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

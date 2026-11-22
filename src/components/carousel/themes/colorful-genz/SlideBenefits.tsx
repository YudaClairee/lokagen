"use client";

import { forwardRef } from "react";
import type { SlideBenefitsProps } from "../types";
import { fitText } from "../fit-text";
import { SECTION_LABELS } from "../copy";
import { BackgroundImage, PreviewOverlay } from "../shared";
import { GenZFooter, GenZHeader, pickContrastingPop } from "./parts";

export const SlideBenefits = forwardRef<HTMLDivElement, SlideBenefitsProps>(
  function SlideBenefits({ data, brandColor, productImage, isPlaceholder, productName, brandInfo }, ref) {
    const pop = pickContrastingPop(brandColor);
    return (
      <div
        ref={ref}
        lang="id"
        className="relative flex h-full w-full flex-col bg-[#E5E5E5] font-sans text-black overflow-hidden"
      >
        <BackgroundImage src={productImage} opacity={0.1} multiply />
        <GenZHeader
          title={SECTION_LABELS.benefits.toUpperCase()}
          subtitle={data.title}
          color="#FF69B4"
          subtitleClassName={fitText(data.title, [[18, "text-xl"], [30, "text-lg"]], "text-base")}
        />
        <div className="relative z-10 flex-1 px-4 pb-4 min-h-0">
            <div 
                className="flex h-full w-full flex-col items-center justify-center rounded-3xl border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                style={{ backgroundColor: brandColor }}
            >
                <div className="grid grid-cols-1 gap-3 w-full">
                    {data.bullets.map((bullet, i) => (
                        <div key={i} className={`bg-white border-2 border-black p-3 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center transform ${i % 2 === 0 ? "-rotate-1" : "rotate-1"}`}>
                            <span className="break-words text-sm font-black uppercase leading-tight">★ {bullet}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <GenZFooter
          left={brandInfo?.storeName || productName || "INFO PRODUK"}
          right={brandInfo?.contactInfo || brandInfo?.location || ""}
          bg={pop}
        />

        <PreviewOverlay active={isPlaceholder} variant="genz" />
      </div>
    );
  }
);
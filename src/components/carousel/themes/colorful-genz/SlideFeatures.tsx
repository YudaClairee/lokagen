"use client";

import { forwardRef } from "react";
import type { SlideFeaturesProps } from "../types";
import { fitText } from "../fit-text";
import { SECTION_LABELS } from "../copy";
import { BackgroundImage, PreviewOverlay } from "../shared";
import { GenZFooter, GenZHeader, pickContrastingPop } from "./parts";

export const SlideFeatures = forwardRef<HTMLDivElement, SlideFeaturesProps>(
  function SlideFeatures({ data, brandColor, productImage, isPlaceholder, productName, brandInfo }, ref) {
    const pop = pickContrastingPop(brandColor);
    return (
      <div
        ref={ref}
        lang="id"
        className="relative flex h-full w-full flex-col bg-[#E5E5E5] font-sans text-black overflow-hidden"
      >
        <BackgroundImage src={productImage} opacity={0.1} multiply />
        <GenZHeader
          title={SECTION_LABELS.features.toUpperCase()}
          subtitle={data.title}
          color="#0088FF"
          subtitleClassName={fitText(data.title, [[18, "text-xl"], [30, "text-lg"]], "text-base")}
        />
        <div className="relative z-10 flex-1 px-4 pb-4 min-h-0">
            <div 
                className="flex h-full w-full flex-col items-start justify-center rounded-3xl border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                style={{ backgroundColor: brandColor }}
            >
                <ul className="w-full space-y-3">
                    {data.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-center gap-3 bg-white border-2 border-black p-2 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#00FF94] border-2 border-black font-black text-sm">
                                {i + 1}
                            </div>
                            <span className="break-words text-sm font-bold uppercase leading-tight">{bullet}</span>
                        </li>
                    ))}
                </ul>
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
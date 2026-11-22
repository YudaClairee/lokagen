"use client";

import { forwardRef } from "react";
import type { SlidePromoProps } from "../types";
import { fitText } from "../fit-text";
import { BackgroundImage, PreviewOverlay } from "../shared";
import { GenZFooter, GenZHeader, pickContrastingPop } from "./parts";
import { readableTextColor } from "@/lib/color";
import { PROMO_LABELS } from "../copy";

export const SlidePromo = forwardRef<HTMLDivElement, SlidePromoProps>(
  function SlidePromo({ data, brandColor, productImage, isPlaceholder, productName, brandInfo }, ref) {
    const pop = pickContrastingPop(brandColor);
    const popText = readableTextColor(pop);
    const mode = data.mode ?? "value";
    return (
      <div
        ref={ref}
        lang="id"
        className="relative flex h-full w-full flex-col bg-[#E5E5E5] font-sans text-black overflow-hidden"
      >
        <BackgroundImage src={productImage} opacity={0.1} multiply />
        <GenZHeader
          title={PROMO_LABELS[mode].header}
          subtitle={data.title}
          color="#00FF94"
          titleClassName={mode === "value" ? "text-5xl" : "text-6xl"}
          subtitleClassName="text-xl"
        />
        <div className="relative z-10 flex-1 px-6 pb-6 min-h-0">
            <div 
                className="flex h-full w-full flex-col items-center justify-center rounded-[2rem] border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative"
                style={{ backgroundColor: brandColor }}
            >
                <div style={{ backgroundColor: pop }} className="absolute -top-5 -right-5 border-4 border-black p-3 rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-20 rotate-12">
                    <span className="text-sm font-black" style={{ color: popText }}>{data.highlightBadge || (mode === "promo" ? brandInfo?.promoBadge : undefined) || PROMO_LABELS[mode].badge}</span>
                </div>

                <div className="w-full bg-white border-4 border-black p-8 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center transform -rotate-2">
                    <p className={`font-black uppercase leading-tight text-[#0099FF] break-words ${fitText(data.promoText, [[25, "text-3xl"], [45, "text-2xl"]], "text-xl")}`} style={{ WebkitTextStroke: '1.5px black' }}>
                        {data.promoText}
                    </p>
                </div>
            </div>
        </div>
        <GenZFooter
          left={brandInfo?.storeName || productName || ""}
          right={brandInfo?.location || brandInfo?.contactInfo || brandInfo?.storeName || ""}
          bg={pop}
        />

        <PreviewOverlay active={isPlaceholder} variant="genz" />
      </div>
    );
  }
);

"use client";

import { forwardRef } from "react";
import type { SlideCTAProps } from "../types";
import { fitText } from "../fit-text";
import { BackgroundImage, PreviewOverlay } from "../shared";
import { GenZFooter, GenZHeader, pickContrastingPop } from "./parts";
import { readableTextColor } from "@/lib/color";

export const SlideCTA = forwardRef<HTMLDivElement, SlideCTAProps>(
  function SlideCTA({ data, brandColor, productImage, isPlaceholder, productName, brandInfo }, ref) {
    const pop = pickContrastingPop(brandColor);
    const cardText = readableTextColor(brandColor);
    return (
      <div
        ref={ref}
        lang="id"
        className="relative flex h-full w-full flex-col bg-[#E5E5E5] font-sans text-black overflow-hidden"
      >
        <BackgroundImage src={productImage} opacity={0.1} multiply />
        <GenZHeader
          title="ORDER"
          subtitle={data.title}
          color="#0088FF"
          titleClassName="text-5xl"
          subtitleClassName={fitText(data.title, [[18, "text-xl"], [30, "text-lg"]], "text-base")}
        />

        <div className="relative z-10 flex-1 px-4 pb-4 min-h-0">
            <div 
                className="flex h-full w-full flex-col items-center justify-center rounded-3xl border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                style={{ backgroundColor: brandColor }}
            >
                <div className="bg-black p-1 rounded-2xl w-full">
                    <div className="bg-[#00FF94] border-2 border-black p-4 rounded-xl text-center">
                        <p className={`break-words font-black uppercase leading-tight text-black ${fitText(data.ctaText, [[24, "text-2xl"], [40, "text-xl"]], "text-lg")}`}>
                            {data.ctaText}
                        </p>
                    </div>
                </div>
                <p className="mt-4 text-xs font-black uppercase" style={{ color: cardText }}>{brandInfo?.contactInfo || "KLIK LINK DI BIO!"}</p>
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
"use client";

import { forwardRef } from "react";
import type { SlideIntroProps } from "../types";
import { fitText } from "../fit-text";
import { PreviewOverlay, ProductPhoto } from "../shared";
import { GenZFooter, GenZHeader, pickContrastingPop } from "./parts";
import { readableTextColor } from "@/lib/color";

export const SlideIntro = forwardRef<HTMLDivElement, SlideIntroProps>(
  function SlideIntro({ data, productName, brandColor, productImage, isPlaceholder, brandInfo }, ref) {
    const pop = pickContrastingPop(brandColor);
    const cardText = readableTextColor(brandColor);
    return (
      <div
        ref={ref}
        lang="id"
        className="relative flex h-full w-full flex-col bg-[#E5E5E5] font-sans text-black overflow-hidden"
      >
        <GenZHeader
          title={data.title}
          subtitle={data.subtitle}
          color="#00FF94"
          titleClassName={`line-clamp-2 ${fitText(data.title, [[12, "text-5xl"], [18, "text-4xl"]], "text-3xl")}`}
        />

        <div className="relative z-10 flex-1 px-4 pb-4 min-h-0">
            <div 
                className="flex h-full w-full flex-row items-center justify-between rounded-3xl border-4 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] gap-2"
                style={{ backgroundColor: brandColor }}
            >
                <ProductPhoto
                  src={productImage}
                  brandColor={pop}
                  name={brandInfo?.storeName || productName}
                  className="aspect-square w-[55%] shrink-0 rounded-2xl border-4 border-black shadow-[4px_4px_0_0_#000]"
                />

                <div className="flex flex-col justify-center items-end h-full w-[45%] gap-2">
                    <div className="text-right">
                        <p className="text-xs font-black leading-tight uppercase" style={{ color: cardText }}>
                            {productName || brandInfo?.storeName || data.subtitle}
                        </p>
                    </div>
                    
                    <div className="w-full rounded-xl bg-white border-2 border-black p-2 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        {brandInfo?.priceText ? (
                          <>
                            <p className="text-[10px] font-black uppercase mb-1">
                                HARGA
                            </p>
                            <p className="text-xl font-black text-[#00FF94] leading-none break-words" style={{ WebkitTextStroke: '1px black' }}>
                                {brandInfo.priceText}
                            </p>
                          </>
                        ) : (
                          <p className="text-sm font-black text-[#00FF94] leading-none break-words" style={{ WebkitTextStroke: '1px black' }}>
                              {brandInfo?.promoBadge || "TERBAIK"}
                          </p>
                        )}
                    </div>
                </div>
            </div>
        </div>

        <GenZFooter
          left={brandInfo?.storeName || productName || "PRODUK LOKAL"}
          right={brandInfo?.contactInfo || brandInfo?.location || ""}
          bg={pop}
        />

        <PreviewOverlay active={isPlaceholder} variant="genz" />
      </div>
    );
  }
);
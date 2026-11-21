"use client";

import { forwardRef } from "react";
import type { SlidePromoProps } from "../types";
import Image from "next/image";
import { fitText, PROMO_LABELS } from "../fit-text";

export const SlidePromo = forwardRef<HTMLDivElement, SlidePromoProps>(
  function SlidePromo({ data, brandColor, productImage, isPlaceholder, brandInfo }, ref) {
    const mode = data.mode ?? "value";
    const titleSize = fitText(data.title, [[10, "text-5xl"], [16, "text-4xl"]], "text-3xl");
    return (
      <div
        ref={ref}
        lang="id"
        className="relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden p-8 text-white"
        style={{ backgroundColor: brandColor }}
      >
        
        <div 
          className="absolute inset-0 pointer-events-none z-10 opacity-20"
          style={{
            background: 'linear-gradient(135deg, transparent 40%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.1) 60%, transparent 60%)',
            filter: 'blur(40px)'
          }}
        />
        
        <div className="absolute top-12 left-0 right-0 z-20 text-center">
            <h2 
                className={`break-words font-black uppercase italic leading-none text-transparent z-20 ${titleSize}`}
                style={{ 
                    WebkitTextStroke: titleSize.includes("5xl") ? '1px white' : '1.5px white',
                }}
            >
                {data.title}
            </h2>
            
        </div>

        
        <div className="relative z-10 mt-16 flex aspect-[3/4] w-[60%] flex-col items-center justify-center rounded-[2rem]  shadow-2xl backdrop-blur-md ">
            {productImage ? (
                <div className="relative h-full w-full overflow-hidden rounded-[2rem] p-2">
                     <div className="relative h-full w-full overflow-hidden rounded-[1.5rem]">
                        <Image
                          src={productImage}
                          alt="Product"
                          fill
                          className="object-cover h-full w-full"
                        />
                     </div>
                </div>
            ) : (
                <div className="flex h-full w-full items-center justify-center text-white/50 font-bold">
                    PRODUCT
                </div>
            )}
            
             
             <div className="absolute -left-6 top-1/2 -translate-y-1/2 rounded-xl bg-white p-3 text-center shadow-lg transform -rotate-6">
                 <span className="block text-xs font-black uppercase text-gray-900">{PROMO_LABELS[mode].header}</span>
                 <span className="block max-w-[140px] break-words text-xl font-black text-red-500">{brandInfo?.priceText || data.highlightBadge || "SPESIAL"}</span>
             </div>
             
             <div className="absolute -right-6 top-1/2 -translate-y-1/2 rounded-xl bg-white p-3 text-center shadow-lg transform rotate-6">
                 <span className="block text-xs font-black uppercase text-gray-900">{PROMO_LABELS[mode].order}</span>
                 <span className="block text-xl font-black text-gray-900">{mode === "promo" ? "NOW" : "SEKARANG"}</span>
             </div>
        </div>

        
        <div className="relative z-40 mt-6">
             <p className="line-clamp-3 text-sm font-medium uppercase tracking-[0.3em] text-white/80 break-words">
                 {data.promoText}
             </p>
        </div>

        {isPlaceholder && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80">
            <span className="border border-gray-200 bg-white px-3 py-1 text-xs text-gray-500 shadow-sm rounded-full">Preview Mode</span>
          </div>
        )}
      </div>
    );
  }
);

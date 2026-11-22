"use client";

import { forwardRef } from "react";
import type { SlideCTAProps } from "../types";
import { ArrowRight } from "lucide-react";
import { fitText, shouldSplitWords } from "../fit-text";
import { getBoldAccents } from "./parts";
import { CTA_LABEL } from "../copy";
import { BackgroundImage, PreviewOverlay } from "../shared";

export const SlideCTA = forwardRef<HTMLDivElement, SlideCTAProps>(
  function SlideCTA({ data, brandColor, productImage, isPlaceholder, productName, brandInfo }, ref) {
    const accent = getBoldAccents(brandColor);
    const splitWords = shouldSplitWords(data.title);
    return (
      <div
        ref={ref}
        lang="id"
        className="relative flex h-full w-full flex-col items-center justify-between overflow-hidden bg-white p-8"
      >
        <BackgroundImage src={productImage} opacity={0.1} grayscale overlayClassName="bg-white/90" />
        <div className="relative z-10 flex w-full justify-between border-b-4 border-black pb-4">
           <span className="max-w-[70%] truncate font-mono text-sm font-bold uppercase">{brandInfo?.storeName || productName || ""}</span>
           <div className="flex gap-2">
             {[1,2,3].map(i => (
                <div key={i} className="h-3 w-3 rounded-full border-2 border-black bg-black" />
             ))}
           </div>
        </div>
        <div className="relative z-10 flex flex-col items-center text-center">
           <h2 className={`max-w-[85%] break-words font-black uppercase leading-[0.9] tracking-tighter ${fitText(data.title, [[8, "text-7xl"], [14, "text-6xl"], [20, "text-5xl"]], "text-4xl")}`}>
             {splitWords
               ? data.title.trim().split(/\s+/).map((word, i) => (
                   <span 
                     key={i} 
                     className="block"
                     style={{ color: i % 2 === 0 ? 'black' : accent.onLight.shape }}
                   >
                     {word}
                   </span>
                 ))
               : <span className="block">{data.title}</span>}
           </h2>
           
           <p className="mt-6 max-w-[280px] break-words font-bold text-gray-600">
             {data.ctaText}
           </p>
           <div 
             className="group mt-8 flex cursor-default items-center gap-3 border-4 border-black bg-white px-6 py-3 shadow-[6px_6px_0px_0px_#000]"
           >
              <span className="font-black uppercase">{CTA_LABEL.toUpperCase()}</span>
              <ArrowRight className="h-6 w-6 stroke-[3px]" />
           </div>
        </div>
        <div className="relative z-10 flex w-full items-center justify-center border-t-4 border-black pt-4">
          <span className="max-w-[80%] truncate font-mono font-bold uppercase">{brandInfo?.contactInfo || "LINK DI BIO"}</span>
        </div>

        <PreviewOverlay active={isPlaceholder} variant="bold" />
      </div>
    );
  }
);

"use client";

import { forwardRef } from "react";
import type { SlideBenefitsProps } from "../types";
import { fitText } from "../fit-text";
import { BackgroundImage, PreviewOverlay, getBrandLine } from "../shared";
import { SCANLINE_CLASS, getDarkAccents } from "./parts";

export const SlideBenefits = forwardRef<HTMLDivElement, SlideBenefitsProps>(
  function SlideBenefits({ data, brandColor, productImage, isPlaceholder, productName, brandInfo }, ref) {
    const accent = getDarkAccents(brandColor);
    const identity = getBrandLine(brandInfo, productName, "identity");
    const contact = getBrandLine(brandInfo, productName, "contact");
    return (
      <div
        ref={ref}
        lang="id"
        className="relative flex h-full w-full flex-col overflow-hidden bg-[#0a0a0f] p-8"
      >
        
        <BackgroundImage src={productImage} opacity={0.2} tint={brandColor}>
          <div className={SCANLINE_CLASS} />
        </BackgroundImage>
        
        <div className="absolute right-[-100px] top-[20%] h-[400px] w-[400px] rounded-full border border-white/5 opacity-50">
           <div className="absolute inset-[20px] rounded-full border border-dashed border-white/10" />
           <div className="absolute inset-[100px] rounded-full border border-white/5" />
        </div>

        
        <div className="relative z-10 mb-10">
           <div 
             className="mb-2 h-1 w-10"
             style={{ backgroundColor: accent.shape }}
           />
           <h2 className={`break-words font-mono font-bold uppercase tracking-wider text-white ${fitText(data.title, [[14, "text-3xl"]], "text-2xl")}`}>
             {data.title}
           </h2>
        </div>

        
        <div className="relative z-10 flex flex-1 flex-col gap-3 font-mono text-sm">
           {data.bullets.map((bullet, index) => (
             <div 
               key={index} 
               className="flex items-center gap-3 border-b border-white/5 pb-2 last:border-0"
             >
               <span style={{ color: accent.text }}>&gt;</span>
               <span className="break-words text-gray-300">{bullet}</span>
               
             </div>
           ))}
        </div>

        <div className="relative z-10 mt-auto flex items-center justify-between gap-4 border-t border-white/10 pt-3 font-mono text-[10px] text-gray-400">
          {identity && <span className="min-w-0 truncate">{identity}</span>}
          <span className="min-w-0 truncate text-right">{contact}</span>
        </div>

        <PreviewOverlay active={isPlaceholder} variant="dark" />
      </div>
    );
  }
);

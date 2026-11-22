"use client";

import { forwardRef } from "react";
import type { SlideCTAProps } from "../types";
import { ArrowRight } from "lucide-react";
import { fitText } from "../fit-text";
import { CTA_LABEL } from "../copy";
import { BackgroundImage, PreviewOverlay, getBrandLine } from "../shared";
import { SCANLINE_CLASS, getDarkAccents } from "./parts";

export const SlideCTA = forwardRef<HTMLDivElement, SlideCTAProps>(
  function SlideCTA({ data, brandColor, productImage, isPlaceholder, productName, brandInfo }, ref) {
    const accent = getDarkAccents(brandColor);
    const contact = getBrandLine(brandInfo, productName, "contact");
    const ctaText = CTA_LABEL.replace(/\s+/g, "_");
    return (
      <div
        ref={ref}
        lang="id"
        className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[#0a0a0f] p-8 text-white"
      >
        
        <BackgroundImage src={productImage} opacity={0.2} tint={brandColor}>
          <div className={SCANLINE_CLASS} />
        </BackgroundImage>
        
        <div className="absolute inset-0 flex select-none flex-col gap-1 overflow-hidden font-mono text-[10px] text-white/[0.03]">
           {Array.from({ length: 20 }).map((_, i) => (
             <div key={i} className="whitespace-nowrap">
               0101010100101110 0xFF 0x00 SYSTEM_CALL 1234567890 ACCESS_GRANTED
             </div>
           ))}
        </div>

        
        <div className="relative z-10 w-full text-center">
           <h2 
             className={`mb-2 break-words font-dark-display font-bold tracking-tighter ${fitText(data.title, [[14, "text-4xl"], [20, "text-3xl"]], "text-2xl")}`}
             style={{ textShadow: `0 0 15px ${brandColor}80` }}
           >
             {data.title}
           </h2>
           <p className="mb-10 font-mono text-sm text-gray-400">
             &lt; {data.ctaText} /&gt;
           </p>

           <div className="group relative inline-block">
             <div 
               className="absolute -inset-1 rounded opacity-70 blur-md"
               style={{ backgroundColor: brandColor }}
             />
             <div 
               className="relative flex items-center gap-3 border border-white/20 bg-black px-8 py-3 font-mono font-bold uppercase transition-transform"
               style={{ borderColor: accent.shape, color: accent.text }}
             >
               <span>{ctaText}</span>
               <ArrowRight className="h-4 w-4" />
             </div>
           </div>

           <p className="mt-10 truncate font-mono text-xs uppercase tracking-wider text-white/60">
             {contact}
           </p>

        </div>

        
        <div className="pointer-events-none absolute inset-4 border border-white/10">
           <div className="absolute -left-[1px] top-10 h-10 w-[2px] bg-white/50" />
           <div className="absolute -right-[1px] bottom-10 h-10 w-[2px] bg-white/50" />
        </div>

        <PreviewOverlay active={isPlaceholder} variant="dark" />
      </div>
    );
  }
);

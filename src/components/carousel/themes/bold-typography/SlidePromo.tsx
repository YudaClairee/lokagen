"use client";

import { forwardRef } from "react";
import type { SlidePromoProps } from "../types";
import { fitText } from "../fit-text";
import { PROMO_LABELS } from "../copy";
import { BackgroundImage, PreviewOverlay } from "../shared";

export const SlidePromo = forwardRef<HTMLDivElement, SlidePromoProps>(
  function SlidePromo({ data, brandColor, productImage, isPlaceholder }, ref) {
    const mode = data.mode ?? "value";
    return (
      <div
        ref={ref}
        lang="id"
        className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-white p-8"
      >
        <BackgroundImage src={productImage} opacity={0.1} grayscale overlayClassName="bg-white/90" />
        <div className="absolute inset-0 flex -rotate-12 translate-y-[-50%] transform flex-col gap-4 opacity-5">
           {Array.from({ length: 10 }).map((_, i) => (
             <div key={i} className="h-12 w-[150%] bg-black" />
           ))}
        </div>
        <div className="relative z-10 w-full max-w-[300px]">
           <div 
             className="relative border-4 border-black bg-white p-8 shadow-[12px_12px_0px_0px_#000]"
           >
             <div 
               className="absolute -left-3 -top-3 h-6 w-6 border-4 border-black bg-white" 
               style={{ backgroundColor: brandColor }}
             />
             <div 
               className="absolute -bottom-3 -right-3 h-6 w-6 border-4 border-black bg-white"
               style={{ backgroundColor: brandColor }}
             />
             {data.highlightBadge && (
               <span
                 className="absolute -right-4 -top-5 rotate-6 border-2 border-black px-2 py-1 font-mono text-xs font-black uppercase text-white"
                 style={{ backgroundColor: brandColor }}
               >
                 {data.highlightBadge}
               </span>
             )}

             <div className="text-center">
               <span 
                 className="mb-2 block font-mono text-sm font-bold uppercase tracking-widest"
                 style={{ color: brandColor }}
               >
                 {PROMO_LABELS[mode].kicker}
               </span>
               <h2 className={`break-words font-black uppercase italic leading-[0.9] tracking-tighter text-black ${fitText(data.title, [[12, "text-4xl"], [18, "text-3xl"]], "text-2xl")}`}>
                 {data.title}
               </h2>
               <div className="my-4 h-1 w-full bg-black/10" />
               <p className={`break-words font-bold text-gray-800 ${fitText(data.promoText, [[30, "text-xl"], [50, "text-lg"]], "text-base")}`}>
                 {data.promoText}
               </p>
             </div>
           </div>
        </div>
        <PreviewOverlay active={isPlaceholder} variant="bold" />
      </div>
    );
  }
);

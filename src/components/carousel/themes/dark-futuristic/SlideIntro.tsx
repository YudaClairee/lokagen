"use client";

import { forwardRef } from "react";
import type { SlideIntroProps } from "../types";
import { fitText } from "../fit-text";
import { PreviewOverlay, ProductPhoto, getBrandLine } from "../shared";
import { SCANLINE_CLASS, getDarkAccents } from "./parts";

export const SlideIntro = forwardRef<HTMLDivElement, SlideIntroProps>(
  function SlideIntro({ data, productName, brandColor, productImage, isPlaceholder, brandInfo }, ref) {
    const accent = getDarkAccents(brandColor);
    const identity = getBrandLine(brandInfo, productName, "identity");
    const contact = getBrandLine(brandInfo, productName, "contact");
    return (
      <div
        ref={ref}
        lang="id"
        className="relative flex h-full w-full flex-col overflow-hidden bg-[#0a0a0f] text-white"
        style={{
          backgroundImage: `
            linear-gradient(rgba(10,10,15,0.9), rgba(10,10,15,0.9)),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 40px 40px, 40px 40px'
        }}
      >
        <div 
          className="absolute -left-[20%] -top-[20%] h-[60%] w-[60%] rounded-full blur-[100px] opacity-20"
          style={{ backgroundColor: brandColor }}
        />
        <div className="flex justify-between border-b border-white/10 bg-white/5 p-4 backdrop-blur-sm">
          <div className="flex gap-2">
            <div className="h-2 w-2 rounded-full bg-red-500" />
            <div className="h-2 w-2 rounded-full bg-yellow-500" />
            <div className="h-2 w-2 rounded-full bg-green-500" />
          </div>
          {identity && (
            <div className="max-w-[70%] truncate font-mono text-[10px] tracking-widest text-white/60">
              {identity}
            </div>
          )}
        </div>
        <div className="relative z-10 flex flex-1 flex-col p-8">
           <div className="flex h-full gap-6">
              <div className="relative flex w-[45%] flex-col justify-center">
                 <div className="relative aspect-[3/4] w-full overflow-hidden border border-white/20 bg-black/50">
                    <div className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-white" />
                    <div className="absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-white" />
                    <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-white" />
                    <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-white" />
                    
                    <ProductPhoto
                      src={productImage}
                      brandColor={accent.shape}
                      name={identity}
                      className="h-full w-full"
                      imageClassName="opacity-80"
                    />
                    {productImage && (
                      <>
                        <div
                          className="pointer-events-none absolute inset-0 z-10 mix-blend-overlay opacity-50"
                          style={{ backgroundColor: brandColor }}
                        />
                        <div className={SCANLINE_CLASS} />
                      </>
                    )}
                 </div>
              </div>

              <div className="flex w-[55%] flex-col justify-center">
                 <div 
                   className="mb-4 inline-flex items-center gap-2 border px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white"
                   style={{ borderColor: accent.shape }}
                 >
                   <div className="h-1.5 w-1.5" style={{ backgroundColor: accent.shape }} />
                   {productName || "NEW_DROP"}
                 </div>
                 
                 <h1 className={`mb-6 break-words font-mono font-bold leading-[0.9] text-white ${fitText(data.title, [[12, "text-4xl"], [18, "text-3xl"]], "text-2xl")}`}>
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                     {data.title}
                   </span>
                 </h1>
                 
                 <p className="border-l-2 border-white/20 pl-4 text-xs leading-relaxed text-gray-400 font-mono break-words">
                   &gt; {data.subtitle}
                 </p>
              </div>
           </div>
        </div>
        <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 font-mono text-[10px] text-white/50">
          <span className="truncate">{contact}</span>
        </div>

        <PreviewOverlay active={isPlaceholder} variant="dark" />
      </div>
    );
  }
);

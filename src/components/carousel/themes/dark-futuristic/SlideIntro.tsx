"use client";

import { forwardRef } from "react";
import type { SlideIntroProps } from "../types";
import Image from "next/image";

export const SlideIntro = forwardRef<HTMLDivElement, SlideIntroProps>(
  function SlideIntro({ data, productName, brandColor, productImage, isPlaceholder }, ref) {
    return (
      <div
        ref={ref}
        className="relative flex aspect-square w-full flex-col overflow-hidden bg-[#0a0a0f] text-white"
        style={{
          backgroundImage: `
            linear-gradient(rgba(10,10,15,0.9), rgba(10,10,15,0.9)),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 40px 40px, 40px 40px'
        }}
      >
        {/* Glow Orb in corner */}
        <div 
          className="absolute -left-[20%] -top-[20%] h-[60%] w-[60%] rounded-full blur-[100px] opacity-20"
          style={{ backgroundColor: brandColor }}
        />

        {/* HUD Top Bar */}
        <div className="flex justify-between border-b border-white/10 bg-white/5 p-4 backdrop-blur-sm">
          <div className="flex gap-2">
            <div className="h-2 w-2 rounded-full bg-red-500" />
            <div className="h-2 w-2 rounded-full bg-yellow-500" />
            <div className="h-2 w-2 rounded-full bg-green-500" />
          </div>
          <div className="font-mono text-[10px] text-white/50 tracking-widest">{productName}</div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-1 flex-col p-8">
           <div className="flex h-full gap-6">
              {/* Left Column: Image */}
              <div className="relative flex w-[45%] flex-col justify-center">
                 <div className="relative aspect-[3/4] w-full overflow-hidden border border-white/20 bg-black/50">
                    {/* Corner accents */}
                    <div className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-white" />
                    <div className="absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-white" />
                    <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-white" />
                    <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-white" />
                    
                    {productImage ? (
                      <div className="relative h-full w-full">
                         <div 
                           className="absolute inset-0 z-10 mix-blend-overlay opacity-50"
                           style={{ backgroundColor: brandColor }}
                         />
                         <Image
                           src={productImage}
                           alt="Product"
                           fill
                           className="object-cover opacity-80"
                         />
                         {/* Scanline effect overlay (static) */}
                         <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_4px,3px_100%]" />
                      </div>
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <span className="font-mono text-xs text-white/30">NO SIGNAL</span>
                      </div>
                    )}
                 </div>
              </div>

              {/* Right Column: Text */}
              <div className="flex w-[55%] flex-col justify-center">
                 <div 
                   className="mb-4 inline-flex items-center gap-2 border px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white"
                   style={{ borderColor: brandColor }}
                 >
                   <div className="h-1.5 w-1.5 animate-pulse bg-white" />
                   Initialising...
                 </div>
                 
                 <h1 className="mb-6 font-mono text-4xl font-bold leading-[0.9] text-white">
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                     {data.title}
                   </span>
                 </h1>
                 
                 <p className="border-l-2 border-white/20 pl-4 text-xs leading-relaxed text-gray-400 font-mono">
                   &gt; {data.subtitle}
                 </p>
              </div>
           </div>
        </div>

        {/* Footer HUD */}
        <div className="flex items-center justify-between border-t border-white/10 p-4">
           
           
        </div>

        {isPlaceholder && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80">
            <span className="border border-white/50 bg-black/50 px-3 py-1 font-mono text-xs text-white backdrop-blur-md">PREVIEW_MODE</span>
          </div>
        )}
      </div>
    );
  }
);

"use client";

import { forwardRef } from "react";
import type { SlideBenefitsProps } from "../types";
import Image from "next/image";

export const SlideBenefits = forwardRef<HTMLDivElement, SlideBenefitsProps>(
  function SlideBenefits({ data, brandColor, productImage, isPlaceholder }, ref) {
    return (
      <div
        ref={ref}
        className="relative flex aspect-square w-full flex-col overflow-hidden bg-[#0a0a0f] p-8"
      >
        
        {productImage && (
          <div className="absolute inset-0 z-0">
             <div 
               className="absolute inset-0 z-10 mix-blend-overlay opacity-50"
               style={{ backgroundColor: brandColor }}
             />
             <Image
               src={productImage}
               alt="Background"
               fill
               className="object-cover opacity-20"
             />
             <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_4px,3px_100%]" />
          </div>
        )}
        
        <div className="absolute right-[-100px] top-[20%] h-[400px] w-[400px] rounded-full border border-white/5 opacity-50">
           <div className="absolute inset-[20px] rounded-full border border-dashed border-white/10" />
           <div className="absolute inset-[100px] rounded-full border border-white/5" />
        </div>

        
        <div className="relative z-10 mb-10">
           <div 
             className="mb-2 h-1 w-10"
             style={{ backgroundColor: brandColor }}
           />
           <h2 className="font-mono text-3xl font-bold uppercase tracking-wider text-white">
             Analysis <br />
             Report
           </h2>
        </div>

        
        <div className="relative z-10 flex flex-col gap-3 font-mono text-sm">
           {data.bullets.map((bullet, index) => (
             <div 
               key={index} 
               className="flex items-center gap-3 border-b border-white/5 pb-2 last:border-0"
             >
               <span style={{ color: brandColor }}>&gt;</span>
               <span className="text-gray-300">{bullet}</span>
               
             </div>
           ))}
        </div>

        
        <div className="absolute bottom-8 left-8 right-8">
           <div className="mb-2 flex justify-between text-[10px] text-gray-500 font-mono">
              <span>SCAN COMPLETE</span>
              <span>100%</span>
           </div>
           <div className="h-1 w-full bg-white/10">
              <div 
                className="h-full w-full" 
                style={{ backgroundColor: brandColor }}
              />
           </div>
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

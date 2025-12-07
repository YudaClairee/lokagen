"use client";

import { forwardRef } from "react";
import type { SlideCTAProps } from "../types";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export const SlideCTA = forwardRef<HTMLDivElement, SlideCTAProps>(
  function SlideCTA({ data, brandColor, productImage, isPlaceholder }, ref) {
    return (
      <div
        ref={ref}
        className="relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden bg-[#0a0a0f] p-8 text-white"
      >
        {/* Background Image if present */}
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
        {/* Data Stream Background (Static) */}
        <div className="absolute inset-0 flex select-none flex-col gap-1 overflow-hidden font-mono text-[10px] text-white/[0.03]">
           {Array.from({ length: 20 }).map((_, i) => (
             <div key={i} className="whitespace-nowrap">
               0101010100101110 0xFF 0x00 SYSTEM_CALL 1234567890 ACCESS_GRANTED
             </div>
           ))}
        </div>

        {/* Content */}
        <div className="relative z-10 w-full text-center">
           <h2 
             className="mb-2 text-4xl font-bold font-mono tracking-tighter"
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
               style={{ borderColor: brandColor, color: brandColor }}
             >
               <span>Initialize_Order</span>
               <ArrowRight className="h-4 w-4" />
             </div>
           </div>

           
        </div>

        {/* Border Frame */}
        <div className="pointer-events-none absolute inset-4 border border-white/10">
           <div className="absolute -left-[1px] top-10 h-10 w-[2px] bg-white/50" />
           <div className="absolute -right-[1px] bottom-10 h-10 w-[2px] bg-white/50" />
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

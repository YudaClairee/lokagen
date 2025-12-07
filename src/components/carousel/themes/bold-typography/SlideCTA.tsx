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
        className="relative flex aspect-square w-full flex-col items-center justify-between overflow-hidden bg-white p-8"
      >
        {productImage && (
          <div className="absolute inset-0 z-0">
            <Image
              src={productImage}
              alt="Background"
              fill
              className="object-cover opacity-10 filter grayscale"
            />
            <div className="absolute inset-0 bg-white/90" />
          </div>
        )}
        <div className="flex w-full justify-between border-b-4 border-black pb-4">
           <span className="font-mono text-sm font-bold">FINAL SLIDE</span>
           <div className="flex gap-2">
             {[1,2,3].map(i => (
                <div key={i} className="h-3 w-3 rounded-full border-2 border-black bg-black" />
             ))}
           </div>
        </div>
        <div className="relative z-10 flex flex-col items-center text-center">
           <h2 className="text-7xl font-black uppercase leading-[0.8] tracking-tighter">
             {data.title.split(" ").map((word, i) => (
               <span 
                 key={i} 
                 className="block"
                 style={{ color: i % 2 === 0 ? 'black' : brandColor }}
               >
                 {word}
               </span>
             ))}
           </h2>
           
           <p className="mt-6 max-w-[200px] font-bold text-gray-600">
             {data.ctaText}
           </p>
           <div 
             className="group mt-8 flex cursor-default items-center gap-3 border-4 border-black bg-white px-6 py-3 shadow-[6px_6px_0px_0px_#000]"
           >
              <span className="font-black uppercase">ORDER NOW</span>
              <ArrowRight className="h-6 w-6 stroke-[3px]" />
           </div>
        </div>
        <div className="flex w-full items-center justify-center border-t-4 border-black pt-4">
          <span className="font-mono font-bold">LINK IN BIO</span>
        </div>

        {isPlaceholder && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/5">
             <span className="bg-black px-2 py-1 font-mono text-xs text-white">PREVIEW ONLY</span>
          </div>
        )}
      </div>
    );
  }
);

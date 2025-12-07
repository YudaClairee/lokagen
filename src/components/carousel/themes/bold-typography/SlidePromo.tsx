"use client";

import { forwardRef } from "react";
import type { SlidePromoProps } from "../types";
import Image from "next/image";

export const SlidePromo = forwardRef<HTMLDivElement, SlidePromoProps>(
  function SlidePromo({ data, brandColor, productImage, isPlaceholder }, ref) {
    return (
      <div
        ref={ref}
        className="relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden bg-white p-8"
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

             <div className="text-center">
               <span 
                 className="mb-2 block font-mono text-sm font-bold uppercase tracking-widest"
                 style={{ color: brandColor }}
               >
                 Limited Offer
               </span>
               <h2 className="text-4xl font-black uppercase italic leading-[0.9] tracking-tighter text-black">
                 {data.title}
               </h2>
               <div className="my-4 h-1 w-full bg-black/10" />
               <p className="text-xl font-bold text-gray-800">
                 {data.promoText}
               </p>
             </div>
           </div>
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

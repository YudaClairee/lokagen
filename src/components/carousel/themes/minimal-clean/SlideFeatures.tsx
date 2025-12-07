"use client";

import { forwardRef } from "react";
import type { SlideFeaturesProps } from "../types";
import Image from "next/image";

export const SlideFeatures = forwardRef<HTMLDivElement, SlideFeaturesProps>(
  function SlideFeatures({ data, brandColor, productImage, isPlaceholder }, ref) {
    return (
      <div
        ref={ref}
        className="relative flex aspect-square w-full flex-col overflow-hidden bg-white p-12 text-gray-900"
      >

        <div 
          className="absolute left-12 top-0 h-1 w-24"
          style={{ backgroundColor: brandColor }}
        />

        <div className="relative z-10 mb-12">
           
           <h2 className="text-3xl font-light text-gray-900">
             {data.title}
           </h2>
        </div>


        {productImage && (
          <div className="absolute inset-0 z-0">
            <Image
              src={productImage}
              alt="Background"
              fill
              className="object-cover opacity-10"
            />
            <div className="absolute inset-0 bg-white/90" />
          </div>
        )}


        <div className="relative z-10 grid grid-cols-1 gap-8">
           {data.bullets.map((bullet, index) => (
             <div key={index} className="group relative pl-8">
               <span className="absolute left-0 top-0 text-xs font-medium text-gray-300 font-mono">
                 0{index + 1}
               </span>
               <div className="space-y-1">
                 <p className="text-base font-normal text-gray-800 leading-relaxed">
                   {bullet}
                 </p>
                 <div 
                   className="h-[1px] w-8 bg-gray-200"
                   style={{ backgroundColor: index === 0 ? brandColor : undefined }}
                 />
               </div>
             </div>
           ))}
        </div>


        <div className="absolute right-12 bottom-12">
           <div className="h-16 w-[1px] bg-gray-100" />
        </div>

        {isPlaceholder && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80">
            <span className="border border-gray-200 bg-white px-3 py-1 text-xs text-gray-500 shadow-sm rounded-full">Preview Mode</span>
          </div>
        )}
      </div>
    );
  }
);

"use client";

import { forwardRef } from "react";
import type { SlideIntroProps } from "../types";
import Image from "next/image";

export const SlideIntro = forwardRef<HTMLDivElement, SlideIntroProps>(
  function SlideIntro({ data, productName, brandColor, productImage, isPlaceholder }, ref) {
    return (
      <div
        ref={ref}
        className="relative flex aspect-square w-full flex-col overflow-hidden text-gray-900"
        style={{ backgroundColor: brandColor }}
      >
        
        <div 
          className="absolute inset-0 pointer-events-none z-10 opacity-20"
          style={{
            background: 'linear-gradient(135deg, transparent 40%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.1) 60%, transparent 60%)',
            filter: 'blur(40px)'
          }}
        />

        
        <div className="relative z-20 flex w-full flex-col items-center pt-12 text-center">
          
          <h1 
            className="text-5xl font-black uppercase tracking-tighter text-white/90"
            style={{ 
              WebkitTextStroke: '1px rgba(255,255,255,0.5)',
              textShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}
          >
            {productName || "NEW PRODUCT"}
          </h1>
          <p className="mt-2 text-sm font-medium uppercase tracking-[0.3em] text-gray-800/60">
            {data.subtitle}
          </p>
        </div>

        
        <div className="relative z-20 mx-auto mt-8 flex h-[65%] w-[70%] items-center justify-center rounded-t-[3rem] bg-white/20 shadow-2xl backdrop-blur-sm">
           <div className="relative h-full w-full p-6">
              <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-transparent bg-gray-100 shadow-inner">

                {productImage ? (
                  <Image
                    src={productImage}
                    alt="Product"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-gray-400 font-bold">
                    PRODUCT IMAGE
                  </div>
                )}
              </div>
              
              
           </div>
        </div>
           
        
        <div className="absolute bottom-6 w-full text-center z-20">
           <div className="text-[10px] font-bold tracking-widest text-black/40">
             WWW.LOKAGEN.COM
           </div>
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

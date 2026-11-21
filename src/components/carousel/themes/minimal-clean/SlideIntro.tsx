"use client";

import { forwardRef } from "react";
import type { SlideIntroProps } from "../types";
import Image from "next/image";
import { fitText } from "../fit-text";

export const SlideIntro = forwardRef<HTMLDivElement, SlideIntroProps>(
  function SlideIntro({ data, productName, brandColor, productImage, isPlaceholder, brandInfo }, ref) {
    return (
      <div
        ref={ref}
        lang="id"
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
          
          {(productName || brandInfo?.storeName) && (
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-800/70">
              {productName || brandInfo?.storeName}
            </p>
          )}
          <h1 
            className={`px-8 break-words font-black uppercase leading-tight tracking-tighter text-white/90 ${fitText(data.title, [[12, "text-5xl"], [18, "text-4xl"]], "text-3xl")}`}
            style={{ 
              WebkitTextStroke: '1px rgba(255,255,255,0.5)',
              textShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}
          >
            {data.title}
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
           <div className="text-[10px] font-bold tracking-widest text-black/40 break-words px-6">
             {brandInfo?.contactInfo || brandInfo?.storeName || productName || ""}
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

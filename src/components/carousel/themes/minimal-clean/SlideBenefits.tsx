"use client";

import { forwardRef } from "react";
import type { SlideBenefitsProps } from "../types";
import Image from "next/image";

export const SlideBenefits = forwardRef<HTMLDivElement, SlideBenefitsProps>(
  function SlideBenefits({ data, brandColor, productImage, isPlaceholder }, ref) {
    
    return (
      <div
        ref={ref}
        className="relative flex aspect-square w-full flex-col overflow-hidden p-8 text-white"
        style={{ backgroundColor: brandColor }}
      >
        
        <div 
          className="absolute inset-0 pointer-events-none z-10 opacity-20"
          style={{
            background: 'linear-gradient(135deg, transparent 40%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.1) 60%, transparent 60%)',
            filter: 'blur(40px)'
          }}
        />
        
        <div 
          className="absolute -right-10 top-20 text-[200px] font-medium leading-none opacity-[0.03] select-none text-gray-900"
        >
          03
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

        
        <div className="relative z-20 mb-8 mt-4 text-center">
            <h2 className="text-3xl font-black uppercase tracking-tight text-white/90"
                 style={{ 
                  textShadow: '0 2px 10px rgba(0,0,0,0.1)'
                 }}
            >
              Benefits
            </h2>
            <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-white/40" />
        </div>

        
        <div className="relative z-20 flex flex-1 flex-col overflow-hidden rounded-[2.5rem] bg-white/20 p-8 shadow-xl backdrop-blur-md">
            
            
            {productImage && (
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full border-4 border-white/20 bg-white shadow-lg overflow-hidden">
                    <Image
                      src={productImage}
                      alt="Product"
                      fill
                      className="object-cover"
                    />
                </div>
            )}

            <h3 className="mb-6 text-xl font-bold leading-tight text-white">
                {data.title}
            </h3>

        
        <div className="flex flex-col gap-5">
           {data.bullets.map((bullet, index) => (
             <div key={index} className="flex items-start gap-4">
                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-gray-900">
                    <span className="text-[10px] font-black">✓</span>
                </div>
                <p className="text-sm font-medium leading-relaxed text-white/90">
                  {bullet}
                </p>
             </div>
           ))}
        </div>
        </div>

        
        <div className="absolute bottom-6 left-0 right-0 text-center z-20">
           <span className="text-[10px] font-bold uppercase tracking-widest text-black/30">
             WWW.LOKAGEN.COM
           </span>
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

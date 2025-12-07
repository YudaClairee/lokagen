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
        className="relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden p-12 text-white"
        style={{ backgroundColor: brandColor }}
      >
   
        <div 
          className="absolute inset-0 pointer-events-none z-10 opacity-20"
          style={{
            background: 'linear-gradient(135deg, transparent 40%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.1) 60%, transparent 60%)',
            filter: 'blur(40px)'
          }}
        />
         <div className="relative z-20 flex flex-col items-center text-center">
            
           
            <div className="mb-8 h-16 w-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40">
                <ArrowRight className="h-6 w-6 text-white" />
            </div>

            <h2 className="mb-6 text-4xl font-black uppercase tracking-tight text-white">
              {data.title}
            </h2>
            
            <p className="mb-10 text-sm font-medium text-white/80 max-w-[200px] leading-relaxed">
              {data.ctaText}
            </p>

            <div className="rounded-full bg-white px-8 py-4 shadow-lg">
                <span 
                    className="text-sm font-bold uppercase tracking-widest"
                    style={{ color: brandColor }} 
                >
                    Order Now
                </span>
            </div>

            
            <div className="absolute -bottom-24 text-[10px] font-bold text-white/40 uppercase tracking-[0.3em]">
               Link in Bio
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

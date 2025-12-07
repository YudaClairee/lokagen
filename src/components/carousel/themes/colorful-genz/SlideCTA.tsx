"use client";

import { forwardRef } from "react";
import type { SlideCTAProps } from "../types";
import Image from "next/image";

export const SlideCTA = forwardRef<HTMLDivElement, SlideCTAProps>(
  function SlideCTA({ data, brandColor, productImage, isPlaceholder }, ref) {
    return (
      <div
        ref={ref}
        className="relative flex aspect-square w-full flex-col bg-[#E5E5E5] font-sans text-black overflow-hidden"
      >
        {/* Background Image if present */}
        {productImage && (
          <div className="absolute inset-0 z-0">
            <Image
              src={productImage}
              alt="Background"
              fill
              className="object-cover opacity-10 mix-blend-multiply"
            />
          </div>
        )}
        {/* Top Section */}
        <div className="relative z-10 flex flex-col items-center justify-center pt-6 pb-2">
             {/* Decorative Checkers */}
            <div className="absolute left-4 top-6 grid grid-cols-2 gap-1">
                <div className="h-3 w-3 bg-black"></div>
                <div className="h-3 w-3 bg-white border border-black"></div>
                <div className="h-3 w-3 bg-white border border-black"></div>
                <div className="h-3 w-3 bg-black"></div>
            </div>
            <div className="absolute right-4 top-6 grid grid-cols-2 gap-1">
                <div className="h-3 w-3 bg-black"></div>
                <div className="h-3 w-3 bg-white border border-black"></div>
                <div className="h-3 w-3 bg-white border border-black"></div>
                <div className="h-3 w-3 bg-black"></div>
            </div>

            <h1 
                className="text-center text-5xl font-black uppercase leading-none tracking-tighter px-12"
                style={{ 
                    color: '#0088FF', 
                    WebkitTextStroke: '2px black',
                    textShadow: '4px 4px 0px #000'
                }}
            >
                ORDER
            </h1>
             <h2 
                className="mt-1 text-center text-lg font-black uppercase tracking-widest text-[#FFD700]"
                style={{ 
                    WebkitTextStroke: '1px black',
                    textShadow: '2px 2px 0px #000'
                }}
            >
                {data.title}
            </h2>
        </div>

        {/* Main Card */}
        <div className="flex-1 px-4 pb-4 min-h-0">
            <div 
                className="flex h-full w-full flex-col items-center justify-center rounded-3xl border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                style={{ backgroundColor: brandColor || '#FDE047' }}
            >
                <div className="bg-black p-1 rounded-2xl w-full">
                    <div className="bg-[#00FF94] border-2 border-black p-4 rounded-xl text-center">
                        <p className="text-2xl font-black uppercase leading-tight text-black">
                            {data.ctaText}
                        </p>
                    </div>
                </div>
                <p className="mt-4 text-xs font-black uppercase">KLIK LINK DI BIO!</p>
            </div>
        </div>

        {/* Footer */}
        <div className="flex h-12 shrink-0 w-full items-center justify-between border-t-4 border-black bg-[#FF69B4] px-4">
             <span className="text-[10px] font-black uppercase leading-tight">MENERIMA<br/>PESANAN ONLINE</span>
             <span className="text-[10px] font-black uppercase text-right leading-tight">LOKAGEN<br/>APP</span>
        </div>

        {isPlaceholder && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-50">
            <span className="rounded-full bg-black px-4 py-2 text-sm font-bold text-white">PREVIEW</span>
          </div>
        )}
      </div>
    );
  }
);
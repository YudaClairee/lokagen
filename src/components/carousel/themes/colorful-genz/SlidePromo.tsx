"use client";

import { forwardRef } from "react";
import type { SlidePromoProps } from "../types";
import Image from "next/image";

export const SlidePromo = forwardRef<HTMLDivElement, SlidePromoProps>(
  function SlidePromo({ data, brandColor, productImage, isPlaceholder }, ref) {
    return (
      <div
        ref={ref}
        className="relative flex aspect-square w-full flex-col bg-[#E5E5E5] font-sans text-black overflow-hidden"
      >
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
        <div className="relative z-10 flex flex-col items-center justify-center pt-8 pb-4">
            <div className="absolute left-6 top-8 grid grid-cols-2 gap-1">
                <div className="h-4 w-4 bg-black"></div>
                <div className="h-4 w-4 bg-white border-2 border-black"></div>
                <div className="h-4 w-4 bg-white border-2 border-black"></div>
                <div className="h-4 w-4 bg-black"></div>
            </div>
            <div className="absolute right-6 top-8 grid grid-cols-2 gap-1">
                <div className="h-4 w-4 bg-black"></div>
                <div className="h-4 w-4 bg-white border-2 border-black"></div>
                <div className="h-4 w-4 bg-white border-2 border-black"></div>
                <div className="h-4 w-4 bg-black"></div>
            </div>

            <h1 
                className="text-center text-6xl font-black uppercase leading-none tracking-tighter px-12"
                style={{ 
                    color: '#00FF94', 
                    WebkitTextStroke: '2.5px black',
                    textShadow: '4px 4px 0px #000'
                }}
            >
                PROMO
            </h1>
             <h2 
                className="mt-2 text-center text-xl font-black uppercase tracking-widest text-[#FFD700]"
                style={{ 
                    WebkitTextStroke: '1.5px black',
                    textShadow: '2px 2px 0px #000'
                }}
            >
                {data.title}
            </h2>
        </div>
        <div className="flex-1 px-6 pb-6 min-h-0">
            <div 
                className="flex h-full w-full flex-col items-center justify-center rounded-[2rem] border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative"
                style={{ backgroundColor: brandColor || '#F4F269' }}
            >
                <div className="absolute -top-5 -right-5 bg-[#FF69B4] border-4 border-black p-3 rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-20 rotate-12">
                    <span className="text-sm font-black text-white">LIMITED!</span>
                </div>

                <div className="w-full bg-white border-4 border-black p-8 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center transform -rotate-2">
                    <p className="text-4xl font-black uppercase leading-tight text-[#0099FF]" style={{ WebkitTextStroke: '1.5px black' }}>
                        {data.promoText}
                    </p>
                </div>
            </div>
        </div>
        <div className="flex h-14 shrink-0 w-full items-center justify-between border-t-4 border-black bg-[#FF69B4] px-6">
             <span className="text-xs font-black uppercase leading-tight">MENERIMA<br/>PEMESANAN ONLINE</span>
             <span className="text-xs font-black uppercase text-right leading-tight">TAWANG, KOTA<br/>TASIKMALAYA</span>
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

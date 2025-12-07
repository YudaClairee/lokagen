"use client";

import { forwardRef } from "react";
import type { SlideIntroProps } from "../types";
import Image from "next/image";

export const SlideIntro = forwardRef<HTMLDivElement, SlideIntroProps>(
  function SlideIntro({ data, productName, brandColor, productImage, isPlaceholder }, ref) {
    return (
      <div
        ref={ref}
        className="relative flex aspect-square w-full flex-col bg-[#E5E5E5] font-sans text-black overflow-hidden"
      >
        {/* Top Section: Title */}
        <div className="relative z-10 flex flex-col items-center justify-center pt-6 pb-2">
            {/* Decorative Checkers Left */}
            <div className="absolute left-4 top-6 grid grid-cols-2 gap-1">
                <div className="h-3 w-3 bg-black"></div>
                <div className="h-3 w-3 bg-white border border-black"></div>
                <div className="h-3 w-3 bg-white border border-black"></div>
                <div className="h-3 w-3 bg-black"></div>
            </div>
             {/* Decorative Checkers Right */}
            <div className="absolute right-4 top-6 grid grid-cols-2 gap-1">
                <div className="h-3 w-3 bg-black"></div>
                <div className="h-3 w-3 bg-white border border-black"></div>
                <div className="h-3 w-3 bg-white border border-black"></div>
                <div className="h-3 w-3 bg-black"></div>
            </div>

            <h1 
                className="text-center text-5xl font-black uppercase leading-none tracking-tighter px-12"
                style={{ 
                    color: '#00FF94', 
                    WebkitTextStroke: '2px black',
                    textShadow: '4px 4px 0px #000'
                }}
            >
                {data.title}
            </h1>
            
            <h2 
                className="mt-1 text-center text-lg font-black uppercase tracking-widest text-[#FFD700]"
                style={{ 
                    WebkitTextStroke: '1px black',
                    textShadow: '2px 2px 0px #000'
                }}
            >
                {data.subtitle}
            </h2>
        </div>

        {/* Main Card Section */}
        <div className="flex-1 px-4 pb-4 min-h-0">
            <div 
                className="flex h-full w-full flex-row items-center justify-between rounded-3xl border-4 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] gap-2"
                style={{ backgroundColor: brandColor || '#FDE047' }}
            >
                {/* Image Circle - Left Side */}
                <div className="relative aspect-square w-[55%] shrink-0">
                    <div className="absolute inset-0 bg-transparent bg-gray-200 overflow-hidden border-none">
                         {productImage ? (
                            <Image
                                src={productImage}
                                alt="Product"
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gray-300 text-gray-500 font-bold text-xs">
                                PRODUCT
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Side Content */}
                <div className="flex flex-col justify-center items-end h-full w-[45%] gap-2">
                    <div className="text-right">
                        <p className="text-xs font-black leading-tight uppercase">
                            {productName || 'MAKAN PAGI, SIANG, MALAM HEMATNYA DI SINI'}
                        </p>
                    </div>
                    
                    <div className="w-full rounded-xl bg-white border-2 border-black p-2 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <p className="text-[10px] font-black uppercase mb-1">
                            HARGA MULAI
                        </p>
                        <p className="text-xl font-black text-[#00FF94] leading-none" style={{ WebkitTextStroke: '1px black' }}>
                            12K
                        </p>
                    </div>
                </div>
            </div>
        </div>

        {/* Footer Section */}
        <div className="flex h-12 shrink-0 w-full items-center justify-between border-t-4 border-black bg-[#FF69B4] px-4">
             <span className="text-[10px] font-black uppercase leading-tight">MENERIMA<br/>PESANAN ONLINE</span>
             
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
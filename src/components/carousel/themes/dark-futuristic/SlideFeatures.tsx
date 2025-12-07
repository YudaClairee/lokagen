"use client";

import { forwardRef } from "react";
import type { SlideFeaturesProps } from "../types";
import Image from "next/image";

export const SlideFeatures = forwardRef<HTMLDivElement, SlideFeaturesProps>(
  function SlideFeatures({ data, brandColor, productImage, isPlaceholder }, ref) {
    return (
      <div
        ref={ref}
        className="relative flex aspect-square w-full flex-col overflow-hidden bg-[#0a0a0f] p-8"
      >
        {/* Background Image if present */}
        {productImage && (
          <div className="absolute inset-0 z-0">
             <div 
               className="absolute inset-0 z-10 mix-blend-overlay opacity-50"
               style={{ backgroundColor: brandColor }}
             />
             <Image
               src={productImage}
               alt="Background"
               fill
               className="object-cover opacity-20"
             />
             <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_4px,3px_100%]" />
          </div>
        )}
        {/* Hex Grid Background */}
        <div 
           className="absolute inset-0 opacity-10"
           style={{
             backgroundImage: `radial-gradient(${brandColor} 1px, transparent 1px)`,
             backgroundSize: '20px 20px'
           }}
        />

        {/* Header */}
        <div className="relative z-10 mb-8 border-b border-white/10 pb-4">
           <div className="mb-2 flex items-center gap-2 font-mono text-[10px] text-gray-400">
              <span>/// FEATURES_LIST</span>
              <span className="flex-1 border-t border-dashed border-gray-700" />
           </div>
           <h2 
             className="text-3xl font-bold tracking-tight text-white mb-1"
             style={{ textShadow: `0 0 20px ${brandColor}40` }}
           >
             {data.title}
           </h2>
        </div>

        {/* Feature Cards */}
        <div className="relative z-10 flex flex-col gap-4">
           {data.bullets.map((bullet, index) => (
             <div
               key={index}
               className="relative overflow-hidden border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-colors"
             >
               {/* Left accent bar */}
               <div
                 className="absolute left-0 top-0 h-full w-[2px]"
                 style={{ backgroundColor: brandColor }}
               />

               <div className="flex items-start gap-4">
                 <div className="mt-1 font-mono text-xs text-gray-500">
                   0{index + 1}
                 </div>
                 <p className="font-mono text-sm leading-relaxed text-gray-300">
                   {bullet}
                 </p>
               </div>

               {/* Tech decoration corners */}
               <div className="absolute right-0 top-0 border-l border-b border-white/10 p-1" />
             </div>
           ))}
        </div>

        {/* Decorative elements */}
        <div 
           className="absolute bottom-10 right-10 h-24 w-24 rounded-full border border-dashed border-white/10"
           style={{ borderColor: `${brandColor}30` }}
        />

        {isPlaceholder && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80">
            <span className="border border-white/50 bg-black/50 px-3 py-1 font-mono text-xs text-white backdrop-blur-md">PREVIEW_MODE</span>
          </div>
        )}
      </div>
    );
  }
);

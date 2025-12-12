"use client";

import { forwardRef } from "react";
import type { SlidePromoProps } from "../types";
import Image from "next/image";

export const SlidePromo = forwardRef<HTMLDivElement, SlidePromoProps>(
  function SlidePromo({ data, brandColor, productImage, isPlaceholder }, ref) {
    return (
      <div
        ref={ref}
        className="relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden bg-[#0a0a0f] p-8"
      >
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
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at center, ${brandColor}50, transparent 70%)`,
          }}
        />

        <div className="relative z-10 w-full max-w-[320px] border border-white/20 bg-black/40 p-1 backdrop-blur-md">
          <div className="border border-white/10 bg-black/60 p-6 text-center">
            <div className="absolute -left-1 -top-1 h-2 w-2 bg-white" />
            <div className="absolute -right-1 -top-1 h-2 w-2 bg-white" />
            <div className="absolute -bottom-1 -left-1 h-2 w-2 bg-white" />
            <div className="absolute -bottom-1 -right-1 h-2 w-2 bg-white" />

            <span
              className="mb-4 inline-block border px-2 py-0.5 font-mono text-[10px] uppercase text-white"
              style={{ borderColor: brandColor, color: brandColor }}
            >
              Time_Limited_Event
            </span>

            <h2
              className="mb-4 text-3xl font-bold uppercase tracking-tight text-white font-mono"
              style={{ textShadow: `0 0 10px ${brandColor}` }}
            >
              {data.title}
            </h2>

            <div className="my-4 flex items-center gap-2 opacity-50">
              <div className="h-[1px] flex-1 bg-white" />
              <div className="h-2 w-2 rotate-45 border border-white" />
              <div className="h-[1px] flex-1 bg-white" />
            </div>

            <p className="font-mono text-lg text-gray-300">{data.promoText}</p>
          </div>
        </div>
        {isPlaceholder && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80">
            <span className="border border-white/50 bg-black/50 px-3 py-1 font-mono text-xs text-white backdrop-blur-md">
              PREVIEW_MODE
            </span>
          </div>
        )}
      </div>
    );
  }
);

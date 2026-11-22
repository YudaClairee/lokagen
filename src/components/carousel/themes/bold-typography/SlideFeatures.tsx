"use client";

import { forwardRef } from "react";
import type { SlideFeaturesProps } from "../types";
import { fitText } from "../fit-text";
import { getBoldAccents } from "./parts";
import { BackgroundImage, PreviewOverlay } from "../shared";

export const SlideFeatures = forwardRef<HTMLDivElement, SlideFeaturesProps>(
  function SlideFeatures({ data, brandColor, productImage, isPlaceholder, productName, brandInfo }, ref) {
    const accent = getBoldAccents(brandColor);
    return (
      <div
        ref={ref}
        lang="id"
        className="relative flex h-full w-full flex-col overflow-hidden bg-white p-8 text-black"
      >
        <BackgroundImage src={productImage} opacity={0.1} grayscale overlayClassName="bg-white/90" />
        <div className="relative z-10 mb-8 border-b-4 border-black pb-4">
          <h2 className={`break-words font-bold-display font-normal uppercase leading-none tracking-normal ${fitText(data.title, [[16, "text-5xl"], [26, "text-4xl"]], "text-3xl")}`}>
            {data.title}
          </h2>
        </div>
        <div className="flex flex-1 flex-col justify-center gap-6">
          {data.bullets.map((bullet, index) => (
            <div 
              key={index} 
              className="relative border-l-8 bg-gray-50 p-4"
              style={{ borderLeftColor: accent.onLight.shape }}
            >
              <div className="absolute -top-3 -right-2 bg-black px-2 py-0.5 text-xs font-bold text-white">
                0{index + 1}
              </div>
              <p className="line-clamp-2 break-words font-bold leading-tight text-gray-900">
                {bullet}
              </p>
            </div>
          ))}
        </div>
        <div 
          className="absolute bottom-0 left-0 h-12 w-full overflow-hidden border-t-4 border-black bg-black text-white"
        >
          <div className="flex h-full items-center px-4 font-mono text-sm font-bold uppercase tracking-widest">
            <span className="truncate">{productName || brandInfo?.storeName || "PRODUK"} • {data.title}</span>
          </div>
        </div>

        <PreviewOverlay active={isPlaceholder} variant="bold" />
      </div>
    );
  }
);

"use client";

import { forwardRef } from "react";
import type { SlideIntroProps } from "../types";
import { fitText, shouldSplitWords } from "../fit-text";
import { getBoldAccents } from "./parts";
import { PreviewOverlay, ProductPhoto, getBrandLine } from "../shared";

export const SlideIntro = forwardRef<HTMLDivElement, SlideIntroProps>(
  function SlideIntro({ data, productName, brandColor, productImage, isPlaceholder, brandInfo }, ref) {
    const accent = getBoldAccents(brandColor);
    const splitWords = shouldSplitWords(data.title);
    const identity = getBrandLine(brandInfo, productName, "identity");
    return (
      <div
        ref={ref}
        lang="id"
        className="relative flex h-full w-full flex-col overflow-hidden bg-white text-black"
      >
        <div className="absolute -left-10 top-0 font-bold-display text-[180px] leading-none opacity-[0.03] select-none">
          {productName ? productName.trim().slice(0, 8).toUpperCase() : "BARU"}
        </div>

        <div 
          className="absolute left-0 top-10 h-4 w-32"
          style={{ backgroundColor: accent.onLight.shape }}
        />

        <div className="relative z-10 flex h-full flex-col p-10">
          <div className="flex h-4 items-center justify-end">
            {identity && (
              <span className="max-w-[60%] truncate font-mono text-xs font-bold uppercase tracking-widest text-black">
                {identity}
              </span>
            )}
          </div>

          <div className="mt-8">
            <h1 className={`max-w-[65%] break-words font-bold-display font-normal uppercase tracking-normal ${fitText(data.title, [[10, "text-[72px] leading-[0.92]"], [16, "text-[60px] leading-[0.92]"], [24, "text-5xl leading-[0.95]"]], "text-4xl leading-none")}`}>
              {/* Pecah per kata hanya jika judul pendek dan kata-katanya tidak panjang */}
              {splitWords
                ? data.title.trim().split(/\s+/).map((word, i) => (
                    <span key={i} className="block">{word}</span>
                  ))
                : data.title}
            </h1>
          </div>
          <div className="mt-8 flex items-start gap-4">
            <div className="mt-2 h-[2px] w-12 bg-black" />
            <p className="line-clamp-3 max-w-[250px] break-words text-lg font-bold leading-tight text-gray-800">
              {data.subtitle}
            </p>
          </div>
          <ProductPhoto
            src={productImage}
            brandColor={accent.onLight.shape}
            name={identity}
            className="absolute bottom-10 right-10 h-48 w-48 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          />
        </div>

        <PreviewOverlay active={isPlaceholder} variant="bold" />
      </div>
    );
  }
);

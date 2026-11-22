"use client";

import { forwardRef } from "react";
import type { SlidePromoProps } from "../types";
import { fitText } from "../fit-text";
import { BackgroundImage, PreviewOverlay, getBrandLine } from "../shared";
import { SCANLINE_CLASS, getDarkAccents } from "./parts";

export const SlidePromo = forwardRef<HTMLDivElement, SlidePromoProps>(
  function SlidePromo({ data, brandColor, productImage, isPlaceholder, productName, brandInfo }, ref) {
    const accent = getDarkAccents(brandColor);
    const mode = data.mode ?? "value";
    const identity = getBrandLine(brandInfo, productName, "identity");
    const contact = brandInfo?.contactInfo?.trim() ?? "";
    return (
      <div
        ref={ref}
        lang="id"
        className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[#0a0a0f] p-8"
      >
        <BackgroundImage src={productImage} opacity={0.2} tint={brandColor}>
          <div className={SCANLINE_CLASS} />
        </BackgroundImage>
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
              style={{ borderColor: accent.shape, color: accent.text }}
            >
              {mode === "promo" ? data.highlightBadge || "PROMO_SPESIAL" : "KENAPA_INI"}
            </span>

            <h2
              className={`mb-4 break-words font-bold uppercase tracking-tight text-white font-mono ${fitText(data.title, [[14, "text-3xl"]], "text-2xl")}`}
              style={{ textShadow: `0 0 10px ${brandColor}` }}
            >
              {data.title}
            </h2>

            <div className="my-4 flex items-center gap-2 opacity-50">
              <div className="h-px flex-1 bg-white" />
              <div className="h-2 w-2 rotate-45 border border-white" />
              <div className="h-px flex-1 bg-white" />
            </div>

            <p className={`break-words font-mono text-gray-300 ${fitText(data.promoText, [[35, "text-lg"]], "text-base")}`}>{data.promoText}</p>
          </div>
        </div>

        {(identity || contact) && (
          <div className="absolute bottom-6 left-8 right-8 z-10 flex items-center justify-between gap-4 border-t border-white/10 pt-3 font-mono text-[10px] text-gray-400">
            {identity && <span className="min-w-0 truncate">{identity}</span>}
            {contact && contact !== identity && (
              <span className="min-w-0 truncate text-right">{contact}</span>
            )}
          </div>
        )}
        <PreviewOverlay active={isPlaceholder} variant="dark" />
      </div>
    );
  }
);

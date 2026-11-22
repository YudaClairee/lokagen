"use client";

import { forwardRef } from "react";
import type { SlideIntroProps } from "../types";
import { fitText } from "../fit-text";
import { PreviewOverlay, ProductPhoto } from "../shared";
import { MINIMAL, MinimalFooter, MinimalLabel, getAccents, getBrandLines } from "./parts";

export const SlideIntro = forwardRef<HTMLDivElement, SlideIntroProps>(
  function SlideIntro({ data, productName, brandColor, productImage, isPlaceholder, brandInfo }, ref) {
    const { identity, contact } = getBrandLines(brandInfo, productName);
    const accent = getAccents(brandColor);

    return (
      <div
        ref={ref}
        lang="id"
        className="relative flex h-full w-full flex-col overflow-hidden p-10"
        style={{ backgroundColor: MINIMAL.cream, color: MINIMAL.ink }}
      >
        {identity && <MinimalLabel accent={accent.shape}>{identity}</MinimalLabel>}

        <div className="mt-6 grid min-h-0 flex-1 grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-center gap-7">
          <div className="min-w-0">
            <div className="mb-5 h-[3px] w-10" style={{ backgroundColor: accent.shape }} />
            <h1
              className={`line-clamp-4 break-words font-minimal-display font-medium leading-[1.05] tracking-tight ${fitText(
                data.title,
                [[10, "text-5xl"], [18, "text-4xl"]],
                "text-3xl"
              )}`}
            >
              {data.title}
            </h1>
            <p className="mt-5 line-clamp-4 break-words text-sm leading-relaxed" style={{ color: MINIMAL.muted }}>
              {data.subtitle}
            </p>
          </div>

          <ProductPhoto
            src={productImage}
            brandColor={accent.shape}
            name={identity}
            className="aspect-[4/5] w-full rounded-2xl"
          />
        </div>

        <MinimalFooter left={contact} />

        <PreviewOverlay active={isPlaceholder} variant="minimal" />
      </div>
    );
  }
);

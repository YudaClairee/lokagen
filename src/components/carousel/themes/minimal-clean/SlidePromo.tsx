"use client";

import { forwardRef } from "react";
import type { SlidePromoProps } from "../types";
import { fitText } from "../fit-text";
import { PreviewOverlay, ProductPhoto } from "../shared";
import { PROMO_LABELS } from "../copy";
import { readableTextColor } from "@/lib/color";
import { MINIMAL, MinimalFooter, MinimalLabel, getAccents, getBrandLines } from "./parts";

export const SlidePromo = forwardRef<HTMLDivElement, SlidePromoProps>(
  function SlidePromo({ data, brandColor, productImage, productName, brandInfo, isPlaceholder }, ref) {
    const mode = data.mode ?? "value";
    const labels = PROMO_LABELS[mode];
    const { identity, contact } = getBrandLines(brandInfo, productName);
    const accent = getAccents(brandColor);
    const chipText = readableTextColor(accent.shape);
    const chipValue = brandInfo?.priceText?.trim() || data.highlightBadge?.trim() || labels.badge;

    return (
      <div
        ref={ref}
        lang="id"
        className="relative flex h-full w-full flex-col overflow-hidden p-10"
        style={{ backgroundColor: MINIMAL.cream, color: MINIMAL.ink }}
      >
        <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] items-center gap-8">
          <ProductPhoto
            src={productImage}
            brandColor={accent.shape}
            name={identity}
            className="aspect-[4/5] w-full rounded-2xl"
          />

          <div className="min-w-0">
            <MinimalLabel accent={accent.shape} color={accent.text}>
              {labels.kicker}
            </MinimalLabel>
            <h2
              className={`mt-4 line-clamp-3 break-words font-minimal-display font-medium leading-[1.05] tracking-tight ${fitText(
                data.title,
                [[10, "text-4xl"], [16, "text-3xl"]],
                "text-2xl"
              )}`}
            >
              {data.title}
            </h2>
            <p className="mt-4 line-clamp-4 break-words text-sm leading-relaxed" style={{ color: MINIMAL.muted }}>
              {data.promoText}
            </p>

            <div
              className="mt-6 inline-flex max-w-full flex-col rounded-2xl px-4 py-3"
              style={{ backgroundColor: accent.shape, color: chipText }}
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">{labels.header}</span>
              <span className="line-clamp-2 break-words text-xl font-semibold leading-tight">{chipValue}</span>
            </div>
          </div>
        </div>

        <MinimalFooter left={identity} right={contact} />

        <PreviewOverlay active={isPlaceholder} variant="minimal" />
      </div>
    );
  }
);

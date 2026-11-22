"use client";

import { forwardRef } from "react";
import { Check } from "lucide-react";
import type { SlideBenefitsProps } from "../types";
import { fitText } from "../fit-text";
import { PreviewOverlay, ProductPhoto } from "../shared";
import { SECTION_LABELS } from "../copy";
import { readableTextColor } from "@/lib/color";
import { MINIMAL, MinimalFooter, MinimalLabel, getAccents, getBrandLines } from "./parts";

export const SlideBenefits = forwardRef<HTMLDivElement, SlideBenefitsProps>(
  function SlideBenefits({ data, brandColor, productImage, productName, brandInfo, isPlaceholder }, ref) {
    const { identity, contact } = getBrandLines(brandInfo, productName);
    const accent = getAccents(brandColor);
    const checkColor = readableTextColor(accent.shape);

    return (
      <div
        ref={ref}
        lang="id"
        className="relative flex h-full w-full flex-col overflow-hidden p-10"
        style={{ backgroundColor: MINIMAL.cream, color: MINIMAL.ink }}
      >
        <MinimalLabel accent={accent.shape}>{SECTION_LABELS.benefits}</MinimalLabel>

        <div
          className="mt-4 flex min-h-0 flex-1 flex-col overflow-hidden rounded-3xl border p-8"
          style={{ backgroundColor: MINIMAL.surface, borderColor: MINIMAL.border }}
        >
          <div className="flex items-start justify-between gap-4">
            <h2
              className={`line-clamp-3 min-w-0 break-words font-minimal-display font-medium leading-[1.1] tracking-tight ${fitText(
                data.title,
                [[16, "text-3xl"]],
                "text-2xl"
              )}`}
            >
              {data.title}
            </h2>
            {productImage && (
              <ProductPhoto
                src={productImage}
                brandColor={accent.shape}
                name={identity}
                className="h-[72px] w-[72px] shrink-0 rounded-2xl"
              />
            )}
          </div>

          <ul className="mt-6 flex min-h-0 flex-1 flex-col justify-center gap-5">
            {data.bullets.map((bullet, index) => (
              <li key={index} className="flex items-start gap-3">
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: accent.shape }}
                >
                  <Check className="h-3.5 w-3.5" strokeWidth={3} style={{ color: checkColor }} />
                </span>
                <p className="line-clamp-2 min-w-0 break-words text-base leading-snug">{bullet}</p>
              </li>
            ))}
          </ul>
        </div>

        <MinimalFooter left={identity} right={contact} />

        <PreviewOverlay active={isPlaceholder} variant="minimal" />
      </div>
    );
  }
);

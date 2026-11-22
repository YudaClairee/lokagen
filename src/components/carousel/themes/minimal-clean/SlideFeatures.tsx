"use client";

import { forwardRef } from "react";
import type { SlideFeaturesProps } from "../types";
import { fitText } from "../fit-text";
import { PreviewOverlay } from "../shared";
import { SECTION_LABELS } from "../copy";
import { MINIMAL, MinimalFooter, MinimalLabel, getAccents, getBrandLines } from "./parts";

export const SlideFeatures = forwardRef<HTMLDivElement, SlideFeaturesProps>(
  function SlideFeatures({ data, brandColor, productName, brandInfo, isPlaceholder }, ref) {
    const { identity, contact } = getBrandLines(brandInfo, productName);
    const accent = getAccents(brandColor);

    return (
      <div
        ref={ref}
        lang="id"
        className="relative flex h-full w-full flex-col overflow-hidden p-10"
        style={{ backgroundColor: MINIMAL.cream, color: MINIMAL.ink }}
      >
        <MinimalLabel accent={accent.shape}>{SECTION_LABELS.features}</MinimalLabel>
        <h2
          className={`mt-4 line-clamp-2 break-words font-minimal-display font-medium leading-[1.1] tracking-tight ${fitText(
            data.title,
            [[16, "text-4xl"]],
            "text-3xl"
          )}`}
        >
          {data.title}
        </h2>

        <ol className="mt-6 flex min-h-0 flex-1 flex-col justify-center">
          {data.bullets.map((bullet, index) => (
            <li
              key={index}
              className="flex items-baseline gap-5 border-t py-5 first:border-t-0"
              style={{ borderColor: MINIMAL.border }}
            >
              <span className="w-6 shrink-0 font-minimal-display text-sm font-medium" style={{ color: accent.text }}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="line-clamp-2 min-w-0 break-words text-lg leading-snug">{bullet}</p>
            </li>
          ))}
        </ol>

        <MinimalFooter left={identity} right={contact} />

        <PreviewOverlay active={isPlaceholder} variant="minimal" />
      </div>
    );
  }
);

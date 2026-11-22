"use client";

import { forwardRef } from "react";
import { ArrowRight } from "lucide-react";
import type { SlideCTAProps } from "../types";
import { fitText } from "../fit-text";
import { PreviewOverlay, getBrandLine } from "../shared";
import { CTA_LABEL } from "../copy";
import { readableTextColor } from "@/lib/color";

// Satu-satunya slide Minimal Clean yang berlatar warna brand penuh: penutup visual carousel.
export const SlideCTA = forwardRef<HTMLDivElement, SlideCTAProps>(
  function SlideCTA({ data, brandColor, productName, brandInfo, isPlaceholder }, ref) {
    const fg = readableTextColor(brandColor);
    const identity = getBrandLine(brandInfo, productName, "identity");
    const contact = getBrandLine(brandInfo, productName, "contact");

    return (
      <div
        ref={ref}
        lang="id"
        className="relative flex h-full w-full flex-col overflow-hidden p-10"
        style={{ backgroundColor: brandColor, color: fg }}
      >
        <p className="truncate text-[10px] font-semibold uppercase tracking-[0.25em]">{identity}</p>

        <div className="flex min-h-0 flex-1 flex-col items-center justify-center text-center">
          <h2
            className={`line-clamp-3 max-w-full break-words font-minimal-display font-medium leading-[1.05] tracking-tight ${fitText(
              data.title,
              [[10, "text-6xl"], [16, "text-5xl"]],
              "text-4xl"
            )}`}
          >
            {data.title}
          </h2>
          <p className="mt-5 line-clamp-3 max-w-[360px] break-words text-base leading-relaxed">
            {data.ctaText}
          </p>

          {/* Tombol dibalik: latar = warna teks, teks = warna brand, sehingga kontrasnya sama dengan teks di atas. */}
          <div
            className="mt-8 inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.15em]"
            style={{ backgroundColor: fg, color: brandColor }}
          >
            {CTA_LABEL}
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </div>
        </div>

        <p className="line-clamp-2 break-words text-center text-xs font-semibold uppercase tracking-[0.2em]">
          {contact}
        </p>

        <PreviewOverlay active={isPlaceholder} variant="minimal" />
      </div>
    );
  }
);

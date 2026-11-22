"use client";

import { useMemo, useState, type ReactNode } from "react";
import type { BrandInfo, GeneratedContent, SlideFormat, Theme } from "@/lib/types";
import { TOTAL_SLIDES, PLACEHOLDER_CONTENT, SLIDE_FORMATS } from "@/lib/constants";
import { getThemeComponents } from "./themes";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { normalizeHex } from "@/lib/color";
import { ScaledSlide } from "./ScaledSlide";
import { SlideCanvas } from "./SlideCanvas";

interface CarouselPreviewProps {
  content: GeneratedContent | null;
  theme: Theme;
  brandColor: string;
  productName: string;
  productImage: string;
  brandInfo?: BrandInfo;
  registerSlide: (index: number, el: HTMLDivElement | null) => void;
  isLoading: boolean;
  currentSlide: number;
  onSlideChange: (index: number) => void;
}

type ViewMode = "single" | "grid";

export function CarouselPreview({
  content,
  theme,
  brandColor: rawBrandColor,
  productName,
  productImage,
  brandInfo,
  registerSlide,
  isLoading,
  currentSlide,
  onSlideChange,
}: CarouselPreviewProps) {
  // Input warna dari user bisa berupa "#abc" atau teks setengah jadi. Normalisasi sekali di sini,
  // sehingga tema dan canvas selalu menerima "#rrggbb" yang valid.
  const brandColor = normalizeHex(rawBrandColor);
  const [viewMode, setViewMode] = useState<ViewMode>("single");
  const [format, setFormat] = useState<SlideFormat>("square");
  // Bungkus slide dengan kanvas sesuai format (termasuk pita info toko untuk story)
  const framed = (slide: ReactNode, ref?: (el: HTMLDivElement | null) => void) => (
    <SlideCanvas
      ref={ref}
      format={format}
      brandColor={brandColor}
      productName={productName}
      brandInfo={brandInfo}
    >
      {slide}
    </SlideCanvas>
  );

  // Get theme-specific components
  const { SlideIntro, SlideFeatures, SlideBenefits, SlidePromo, SlideCTA } = useMemo(
    () => getThemeComponents(theme),
    [theme]
  );

  const displayContent = content || PLACEHOLDER_CONTENT;
  const isPlaceholder = !content;

  const nextSlide = () => onSlideChange((currentSlide + 1) % TOTAL_SLIDES);
  const prevSlide = () => onSlideChange((currentSlide - 1 + TOTAL_SLIDES) % TOTAL_SLIDES);

  // Slide untuk preview & grid (tanpa ref).
  const previewSlides = [
    <SlideIntro
      key="intro"
      data={displayContent.slides[0]}
      productName={productName}
      brandColor={brandColor}
      productImage={productImage}
      brandInfo={brandInfo}
      isPlaceholder={isPlaceholder}
    />,
    <SlideFeatures
      key="features"
      data={displayContent.slides[1]}
      productName={productName}
      brandColor={brandColor}
      productImage={productImage}
      brandInfo={brandInfo}
      isPlaceholder={isPlaceholder}
    />,
    <SlideBenefits
      key="benefits"
      data={displayContent.slides[2]}
      productName={productName}
      brandColor={brandColor}
      productImage={productImage}
      brandInfo={brandInfo}
      isPlaceholder={isPlaceholder}
    />,
    <SlidePromo
      key="promo"
      data={displayContent.slides[3]}
      productName={productName}
      brandColor={brandColor}
      productImage={productImage}
      brandInfo={brandInfo}
      isPlaceholder={isPlaceholder}
    />,
    <SlideCTA
      key="cta"
      data={displayContent.slides[4]}
      productName={productName}
      brandColor={brandColor}
      productImage={productImage}
      brandInfo={brandInfo}
      isPlaceholder={isPlaceholder}
    />,
  ];

  // Render kelima slide sekaligus di luar layar, selalu terpasang di DOM,
  // agar html-to-image bisa mengekspor semuanya dengan ukuran konsisten.
  const exportSlides = [
    <SlideIntro
      key="intro"
      data={displayContent.slides[0]}
      productName={productName}
      brandColor={brandColor}
      productImage={productImage}
      brandInfo={brandInfo}
      isPlaceholder={false}
    />,
    <SlideFeatures
      key="features"
      data={displayContent.slides[1]}
      productName={productName}
      brandColor={brandColor}
      productImage={productImage}
      brandInfo={brandInfo}
      isPlaceholder={false}
    />,
    <SlideBenefits
      key="benefits"
      data={displayContent.slides[2]}
      productName={productName}
      brandColor={brandColor}
      productImage={productImage}
      brandInfo={brandInfo}
      isPlaceholder={false}
    />,
    <SlidePromo
      key="promo"
      data={displayContent.slides[3]}
      productName={productName}
      brandColor={brandColor}
      productImage={productImage}
      brandInfo={brandInfo}
      isPlaceholder={false}
    />,
    <SlideCTA
      key="cta"
      data={displayContent.slides[4]}
      productName={productName}
      brandColor={brandColor}
      productImage={productImage}
      brandInfo={brandInfo}
      isPlaceholder={false}
    />,
  ];

  const tabClass = (active: boolean) =>
    cn(
      "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
      active ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"
    );

  return (
    <div className="space-y-4">
      {/* Format & mode tampilan */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="inline-flex gap-1 rounded-lg border border-border bg-card p-1">
          {(Object.keys(SLIDE_FORMATS) as SlideFormat[]).map((key) => (
            <button key={key} type="button" className={tabClass(format === key)} onClick={() => setFormat(key)}>
              {SLIDE_FORMATS[key].label}
            </button>
          ))}
        </div>
        <div className="inline-flex gap-1 rounded-lg border border-border bg-card p-1">
          <button type="button" className={tabClass(viewMode === "single")} onClick={() => setViewMode("single")}>
            📱 Tampilan Slide
          </button>
          <button type="button" className={tabClass(viewMode === "grid")} onClick={() => setViewMode("grid")}>
            ⊞ Lihat Semua ({TOTAL_SLIDES})
          </button>
        </div>
      </div>

      {/* Main Preview */}
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-card backdrop-blur-sm">
            <div className="flex flex-col items-center gap-2">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <span className="text-sm text-muted-foreground">Generating...</span>
            </div>
          </div>
        )}

        {viewMode === "single" ? (
          <div
            className={cn(
              "mx-auto overflow-hidden rounded-lg",
              format === "story" && "max-w-[360px]",
              isPlaceholder && "opacity-50"
            )}
          >
            <ScaledSlide format={format}>{framed(previewSlides[currentSlide])}</ScaledSlide>
          </div>
        ) : (
          <div className={`grid grid-cols-2 gap-3 sm:grid-cols-3 ${isPlaceholder ? "opacity-50" : ""}`}>
            {previewSlides.map((slide, idx) => (
              <div
                key={idx}
                role="button"
                tabIndex={0}
                aria-label={`Pilih slide ${idx + 1}`}
                onClick={() => onSlideChange(idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSlideChange(idx);
                  }
                }}
                className={cn(
                  "relative cursor-pointer overflow-hidden rounded-lg ring-2 transition-shadow",
                  currentSlide === idx ? "ring-primary" : "ring-transparent hover:ring-white/30"
                )}
              >
                <ScaledSlide format={format}>{framed(slide)}</ScaledSlide>
                <span className="absolute bottom-1 left-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                  {idx + 1}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Navigation (mode tunggal) */}
      {viewMode === "single" && (
        <>
          <div className="flex items-center justify-between">
            <Button variant="outline" size="icon" onClick={prevSlide} className="border-border bg-card text-foreground hover:bg-muted">
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex gap-2">
              {Array.from({ length: TOTAL_SLIDES }, (_, index) => (
                <button
                  key={index}
                  onClick={() => onSlideChange(index)}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    currentSlide === index ? "bg-primary" : "bg-muted-foreground/40"
                  }`}
                />
              ))}
            </div>

            <Button variant="outline" size="icon" onClick={nextSlide} className="border-border bg-card text-foreground hover:bg-muted">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Slide {currentSlide + 1} / {TOTAL_SLIDES}
          </p>
        </>
      )}

      {/* Export container: off-screen, selalu di DOM, ukuran tetap */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -left-[9999px] top-0 z-[-1] opacity-100"
      >
        {exportSlides.map((slide, idx) => (
          <div key={idx}>{framed(slide, (el) => registerSlide(idx, el))}</div>
        ))}
      </div>
    </div>
  );
}

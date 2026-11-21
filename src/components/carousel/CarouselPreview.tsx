"use client";

import { useMemo, useState } from "react";
import type { BrandInfo, GeneratedContent, Theme } from "@/lib/types";
import { TOTAL_SLIDES, PLACEHOLDER_CONTENT } from "@/lib/constants";
import { getThemeComponents } from "./themes";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EXPORT_SIZE, ScaledSlide } from "./ScaledSlide";

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
  brandColor,
  productName,
  productImage,
  brandInfo,
  registerSlide,
  isLoading,
  currentSlide,
  onSlideChange,
}: CarouselPreviewProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("single");

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
      ref={(el) => registerSlide(0, el)}
      data={displayContent.slides[0]}
      productName={productName}
      brandColor={brandColor}
      productImage={productImage}
      brandInfo={brandInfo}
      isPlaceholder={false}
    />,
    <SlideFeatures
      key="features"
      ref={(el) => registerSlide(1, el)}
      data={displayContent.slides[1]}
      productName={productName}
      brandColor={brandColor}
      productImage={productImage}
      brandInfo={brandInfo}
      isPlaceholder={false}
    />,
    <SlideBenefits
      key="benefits"
      ref={(el) => registerSlide(2, el)}
      data={displayContent.slides[2]}
      productName={productName}
      brandColor={brandColor}
      productImage={productImage}
      brandInfo={brandInfo}
      isPlaceholder={false}
    />,
    <SlidePromo
      key="promo"
      ref={(el) => registerSlide(3, el)}
      data={displayContent.slides[3]}
      productName={productName}
      brandColor={brandColor}
      productImage={productImage}
      brandInfo={brandInfo}
      isPlaceholder={false}
    />,
    <SlideCTA
      key="cta"
      ref={(el) => registerSlide(4, el)}
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
      active ? "bg-primary text-white" : "text-slate-400 hover:text-white"
    );

  return (
    <div className="space-y-4">
      {/* Mode tampilan */}
      <div className="flex justify-end">
        <div className="inline-flex gap-1 rounded-lg border border-white/10 bg-slate-800/50 p-1">
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
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-slate-900/80 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-2">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <span className="text-sm text-slate-400">Generating...</span>
            </div>
          </div>
        )}

        {viewMode === "single" ? (
          <div className={`overflow-hidden rounded-lg ${isPlaceholder ? "opacity-50" : ""}`}>
            {previewSlides[currentSlide]}
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
                <ScaledSlide>{slide}</ScaledSlide>
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
            <Button variant="outline" size="icon" onClick={prevSlide} className="border-white/10 bg-white/5 text-white hover:bg-white/10">
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex gap-2">
              {Array.from({ length: TOTAL_SLIDES }, (_, index) => (
                <button
                  key={index}
                  onClick={() => onSlideChange(index)}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    currentSlide === index ? "bg-primary" : "bg-slate-600"
                  }`}
                />
              ))}
            </div>

            <Button variant="outline" size="icon" onClick={nextSlide} className="border-white/10 bg-white/5 text-white hover:bg-white/10">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <p className="text-center text-sm text-slate-400">
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
          <div key={idx} style={{ width: EXPORT_SIZE, height: EXPORT_SIZE }}>
            {slide}
          </div>
        ))}
      </div>
    </div>
  );
}

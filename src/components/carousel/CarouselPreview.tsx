"use client";

import { useMemo, RefObject } from "react";
import type { BrandInfo, GeneratedContent, Theme } from "@/lib/types";
import { TOTAL_SLIDES, PLACEHOLDER_CONTENT } from "@/lib/constants";
import { getThemeComponents } from "./themes";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CarouselPreviewProps {
  content: GeneratedContent | null;
  theme: Theme;
  brandColor: string;
  productName: string;
  productImage: string;
  brandInfo?: BrandInfo;
  slideRefs: RefObject<(HTMLDivElement | null)[]>;
  isLoading: boolean;
  currentSlide: number;
  onSlideChange: (index: number) => void;
}

// Ukuran logis satu slide. Dikali pixelRatio 2 saat export → 1080x1080px.
const EXPORT_SIZE = 540;

export function CarouselPreview({
  content,
  theme,
  brandColor,
  productName,
  productImage,
  brandInfo,
  slideRefs,
  isLoading,
  currentSlide,
  onSlideChange,
}: CarouselPreviewProps) {
  // Get theme-specific components
  const { SlideIntro, SlideFeatures, SlideBenefits, SlidePromo, SlideCTA } = useMemo(
    () => getThemeComponents(theme),
    [theme]
  );

  const displayContent = content || PLACEHOLDER_CONTENT;
  const isPlaceholder = !content;

  const nextSlide = () => onSlideChange((currentSlide + 1) % TOTAL_SLIDES);
  const prevSlide = () => onSlideChange((currentSlide - 1 + TOTAL_SLIDES) % TOTAL_SLIDES);

  // Komponen slide untuk ditampilkan di preview utama (tanpa ref).
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
      ref={(el) => { slideRefs.current[0] = el; }}
      data={displayContent.slides[0]}
      productName={productName}
      brandColor={brandColor}
      productImage={productImage}
      brandInfo={brandInfo}
      isPlaceholder={false}
    />,
    <SlideFeatures
      key="features"
      ref={(el) => { slideRefs.current[1] = el; }}
      data={displayContent.slides[1]}
      productName={productName}
      brandColor={brandColor}
      productImage={productImage}
      brandInfo={brandInfo}
      isPlaceholder={false}
    />,
    <SlideBenefits
      key="benefits"
      ref={(el) => { slideRefs.current[2] = el; }}
      data={displayContent.slides[2]}
      productName={productName}
      brandColor={brandColor}
      productImage={productImage}
      brandInfo={brandInfo}
      isPlaceholder={false}
    />,
    <SlidePromo
      key="promo"
      ref={(el) => { slideRefs.current[3] = el; }}
      data={displayContent.slides[3]}
      productName={productName}
      brandColor={brandColor}
      productImage={productImage}
      brandInfo={brandInfo}
      isPlaceholder={false}
    />,
    <SlideCTA
      key="cta"
      ref={(el) => { slideRefs.current[4] = el; }}
      data={displayContent.slides[4]}
      productName={productName}
      brandColor={brandColor}
      productImage={productImage}
      brandInfo={brandInfo}
      isPlaceholder={false}
    />,
  ];

  return (
    <div className="space-y-4">
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
        
        <div className={`overflow-hidden rounded-lg ${isPlaceholder ? "opacity-50" : ""}`}>
          {previewSlides[currentSlide]}
        </div>
      </div>

      {/* Navigation */}
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
                currentSlide === index
                  ? "bg-primary"
                  : "bg-slate-600"
              }`}
            />
          ))}
        </div>
        
        <Button variant="outline" size="icon" onClick={nextSlide} className="border-white/10 bg-white/5 text-white hover:bg-white/10">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Slide Label */}
      <p className="text-center text-sm text-slate-400">
        Slide {currentSlide + 1} / {TOTAL_SLIDES}
      </p>

      {/* Export container: off-screen, selalu di DOM, ukuran tetap */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -left-[9999px] top-0 z-[-1] opacity-100"
      >
        {exportSlides.map((slide, idx) => (
          <div
            key={idx}
            style={{ width: EXPORT_SIZE, height: EXPORT_SIZE }}
          >
            {slide}
          </div>
        ))}
      </div>
    </div>
  );
}

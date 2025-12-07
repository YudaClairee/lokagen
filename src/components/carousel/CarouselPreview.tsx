"use client";

import { useState, useMemo, RefObject } from "react";
import type { GeneratedContent, Theme } from "@/lib/types";
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
  slideRefs: RefObject<(HTMLDivElement | null)[]>;
  isLoading: boolean;
}

export function CarouselPreview({
  content,
  theme,
  brandColor,
  productName,
  productImage,
  slideRefs,
  isLoading,
}: CarouselPreviewProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Get theme-specific components
  const { SlideIntro, SlideFeatures, SlideBenefits, SlidePromo, SlideCTA } = useMemo(
    () => getThemeComponents(theme),
    [theme]
  );

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % TOTAL_SLIDES);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + TOTAL_SLIDES) % TOTAL_SLIDES);
  };

  const displayContent = content || PLACEHOLDER_CONTENT;
  const isPlaceholder = !content;

  const slideComponents = [
    <SlideIntro
      key="intro"
      ref={(el) => { slideRefs.current[0] = el; }}
      data={displayContent.slides[0]}
      productName={productName}
      brandColor={brandColor}
      productImage={productImage}
      isPlaceholder={isPlaceholder}
    />,
    <SlideFeatures
      key="features"
      ref={(el) => { slideRefs.current[1] = el; }}
      data={displayContent.slides[1]}
      brandColor={brandColor}
      isPlaceholder={isPlaceholder}
    />,
    <SlideBenefits
      key="benefits"
      ref={(el) => { slideRefs.current[2] = el; }}
      data={displayContent.slides[2]}
      brandColor={brandColor}
      isPlaceholder={isPlaceholder}
    />,
    <SlidePromo
      key="promo"
      ref={(el) => { slideRefs.current[3] = el; }}
      data={displayContent.slides[3]}
      brandColor={brandColor}
      isPlaceholder={isPlaceholder}
    />,
    <SlideCTA
      key="cta"
      ref={(el) => { slideRefs.current[4] = el; }}
      data={displayContent.slides[4]}
      brandColor={brandColor}
      isPlaceholder={isPlaceholder}
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
          {slideComponents[currentSlide]}
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
              onClick={() => setCurrentSlide(index)}
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
    </div>
  );
}

"use client";

import { useState } from "react";
import type { GeneratedContent, Theme } from "@/lib/types";
import { SlideIntro } from "./SlideIntro";
import { SlideFeatures } from "./SlideFeatures";
import { SlideBenefits } from "./SlideBenefits";
import { SlidePromo } from "./SlidePromo";
import { SlideCTA } from "./SlideCTA";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CarouselPreviewProps {
  content: GeneratedContent | null;
  theme: Theme;
  brandColor: string;
  productImage: string;
  slideRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  isLoading: boolean;
}

export function CarouselPreview({
  content,
  theme,
  brandColor,
  productImage,
  slideRefs,
  isLoading,
}: CarouselPreviewProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 5);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 5) % 5);
  };

  // Placeholder content for preview
  const placeholderContent: GeneratedContent = {
    caption: "",
    slides: [
      { type: "intro", title: "Judul Produk", subtitle: "Deskripsi singkat produk kamu di sini" },
      { type: "features", title: "Keunggulan", bullets: ["Fitur 1", "Fitur 2", "Fitur 3"] },
      { type: "benefits", title: "Manfaat", bullets: ["Manfaat 1", "Manfaat 2", "Manfaat 3"] },
      { type: "promo", title: "Promo Spesial", promoText: "Diskon khusus untuk kamu!" },
      { type: "cta", title: "Yuk Order!", ctaText: "Klik link di bio sekarang" },
    ],
  };

  const displayContent = content || placeholderContent;
  const isPlaceholder = !content;

  const slideComponents = [
    <SlideIntro
      key="intro"
      ref={(el) => { slideRefs.current[0] = el; }}
      data={displayContent.slides[0]}
      theme={theme}
      brandColor={brandColor}
      productImage={productImage}
      isPlaceholder={isPlaceholder}
    />,
    <SlideFeatures
      key="features"
      ref={(el) => { slideRefs.current[1] = el; }}
      data={displayContent.slides[1]}
      theme={theme}
      brandColor={brandColor}
      isPlaceholder={isPlaceholder}
    />,
    <SlideBenefits
      key="benefits"
      ref={(el) => { slideRefs.current[2] = el; }}
      data={displayContent.slides[2]}
      theme={theme}
      brandColor={brandColor}
      isPlaceholder={isPlaceholder}
    />,
    <SlidePromo
      key="promo"
      ref={(el) => { slideRefs.current[3] = el; }}
      data={displayContent.slides[3]}
      theme={theme}
      brandColor={brandColor}
      isPlaceholder={isPlaceholder}
    />,
    <SlideCTA
      key="cta"
      ref={(el) => { slideRefs.current[4] = el; }}
      data={displayContent.slides[4]}
      theme={theme}
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
          {[0, 1, 2, 3, 4].map((index) => (
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
        Slide {currentSlide + 1} / 5
      </p>
    </div>
  );
}


"use client";

import { useState, useTransition, useRef } from "react";
import { generateContent } from "@/app/actions/generate-content";
import type {
  Tone,
  Theme,
  GeneratedContent,
  GenerateContentInput,
} from "@/lib/types";
import {
  DEFAULT_BRAND_COLOR,
  DEFAULT_TONE,
  DEFAULT_THEME,
  ERROR_MESSAGES,
} from "@/lib/constants";
import { ProductForm } from "@/components/generate/ProductForm";
import { GenerateOptions } from "@/components/generate/GenerateOptions";
import { CarouselPreview } from "@/components/carousel/CarouselPreview";
import { DownloadButton } from "@/components/generate/DownloadButton";
import { CaptionDisplay } from "@/components/generate/CaptionDisplay";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function GeneratePage() {
  // Form state
  const [productName, setProductName] = useState<string>("");
  const [productImage, setProductImage] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tone, setTone] = useState<Tone>(DEFAULT_TONE);
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);
  const [brandColor, setBrandColor] = useState<string>(DEFAULT_BRAND_COLOR);

  // Result state
  const [result, setResult] = useState<GeneratedContent | null>(null);
  const [error, setError] = useState<string>("");

  // Loading state
  const [isPending, startTransition] = useTransition();

  // Refs for slide elements (for download)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleGenerate = () => {
    setError("");

    if (!productImage && !description) {
      setError(ERROR_MESSAGES.NO_INPUT);
      return;
    }

    const input: GenerateContentInput = {
      productName: productName || undefined,
      productImage,
      description: description || undefined,
      tone,
      theme,
      brandColor,
    };

    startTransition(async () => {
      const response = await generateContent(input);

      if (response.success && response.data) {
        setResult(response.data);
      } else {
        setError(response.error || "Terjadi kesalahan");
      }
    });
  };

  return (
    <main className="relative min-h-screen text-white">
      {/* Dark Sphere Grid Background - same as landing page */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background: "#020617",
          backgroundImage: `
            linear-gradient(to right, rgba(71,85,105,0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(71,85,105,0.3) 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, rgba(59,130,246,0.1) 0%, transparent 70%)
          `,
          backgroundSize: "32px 32px, 32px 32px, 100% 100%",
        }}
      />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#020617]/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Kembali</span>
          </Link>
          <h1 className="text-lg font-semibold text-white">Generate Konten</h1>
          <div className="w-20" /> {/* Spacer for centering */}
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column - Form */}
          <div className="space-y-6">
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-sm">
              <h2 className="mb-6 text-xl font-semibold text-white">Detail Produk</h2>

              {/* Product Form */}
              <ProductForm
                productName={productName}
                setProductName={setProductName}
                productImage={productImage}
                setProductImage={setProductImage}
                description={description}
                setDescription={setDescription}
              />

              {/* Generate Options */}
              <GenerateOptions
                tone={tone}
                setTone={setTone}
                theme={theme}
                setTheme={setTheme}
                brandColor={brandColor}
                setBrandColor={setBrandColor}
              />

              {/* Error Message */}
              {error && (
                <div className="mt-4 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              {/* Generate Button */}
              <Button
                onClick={handleGenerate}
                disabled={isPending}
                className="mt-6 w-full bg-primary hover:bg-primary/90"
                size="lg"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Konten
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Right Column - Preview */}
          <div className="space-y-6">
            {/* Carousel Preview */}
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Preview Carousel</h2>
                {result && (
                  <DownloadButton slideRefs={slideRefs} />
                )}
              </div>

              <CarouselPreview
                content={result}
                theme={theme}
                brandColor={brandColor}
                productImage={productImage}
                slideRefs={slideRefs}
                isLoading={isPending}
              />
            </div>

            {/* Caption Display */}
            {result && (
              <CaptionDisplay caption={result.caption} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

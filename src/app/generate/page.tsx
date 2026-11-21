"use client";

import { useState, useTransition, useRef } from "react";
import { generateContent } from "@/app/actions/generate-content";
import type {
  Tone,
  Theme,
  BrandInfo,
  GeneratedContent,
  GenerateContentInput,
  SampleProduct,
  SlideContent,
} from "@/lib/types";
import {
  DEFAULT_BRAND_COLOR,
  DEFAULT_TONE,
  DEFAULT_THEME,
  ERROR_MESSAGES,
  SAMPLE_PRODUCTS,
} from "@/lib/constants";
import { createSampleImage } from "@/lib/utils";
import { ProductForm } from "@/components/generate/ProductForm";
import { GenerateOptions } from "@/components/generate/GenerateOptions";
import { CarouselPreview } from "@/components/carousel/CarouselPreview";
import { DownloadButton } from "@/components/generate/DownloadButton";
import { CaptionDisplay } from "@/components/generate/CaptionDisplay";
import { SampleProductButtons } from "@/components/generate/SampleProductButtons";
import { SlideTextEditor } from "@/components/generate/SlideTextEditor";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
  const [storeName, setStoreName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [priceText, setPriceText] = useState<string>("");
  const [contactInfo, setContactInfo] = useState<string>("");
  const [result, setResult] = useState<GeneratedContent | null>(null);
  const [error, setError] = useState<string>("");
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isLoadingSample, setIsLoadingSample] = useState<boolean>(false);

  const brandInfo: BrandInfo = {
    storeName: storeName.trim() || undefined,
    priceText: priceText.trim() || undefined,
    contactInfo: contactInfo.trim() || undefined,
    location: location.trim() || undefined,
  };

  const [isPending, startTransition] = useTransition();

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
      brandInfo,
    };

    startTransition(async () => {
      const response = await generateContent(input);

      if (response.success && response.data) {
        setResult(response.data);
        setCurrentSlide(0);
      } else {
        setError(response.error || "Terjadi kesalahan");
      }
    });
  };

  // Isi seluruh form dengan contoh produk (Tahap 2.1)
  const handleLoadSample = async (sample: SampleProduct) => {
    setError("");
    setIsLoadingSample(true);
    try {
      const image = await createSampleImage(sample.imageColor, sample.label);
      setProductName(sample.productName);
      setDescription(sample.description);
      setTone(sample.tone);
      setTheme(sample.theme);
      setBrandColor(sample.brandColor);
      setStoreName(sample.brandInfo.storeName ?? "");
      setPriceText(sample.brandInfo.priceText ?? "");
      setContactInfo(sample.brandInfo.contactInfo ?? "");
      setLocation(sample.brandInfo.location ?? "");
      setProductImage(image);
    } catch (err) {
      console.error("Gagal memuat contoh produk:", err);
      setError("Contoh produk gagal dimuat. Coba lagi ya!");
    } finally {
      setIsLoadingSample(false);
    }
  };

  // Update satu slide hasil AI (Tahap 2.2) — preview ikut berubah real-time
  const updateSlide = (index: number, next: SlideContent) => {
    setResult((prev) => {
      if (!prev) return prev;
      const slides = [...prev.slides] as GeneratedContent["slides"];
      slides[index] = next as GeneratedContent["slides"][number];
      return { ...prev, slides };
    });
  };

  const updateCaption = (caption: string) => {
    setResult((prev) => (prev ? { ...prev, caption } : prev));
  };

  return (
    <main className="relative min-h-screen text-white">
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
          <div className="w-20" />
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-sm">
              <h2 className="mb-6 text-xl font-semibold text-white">Detail Produk</h2>

              <SampleProductButtons
                samples={SAMPLE_PRODUCTS}
                onSelect={handleLoadSample}
                disabled={isPending || isLoadingSample}
              />

              <ProductForm
                productName={productName}
                setProductName={setProductName}
                productImage={productImage}
                setProductImage={setProductImage}
                description={description}
                setDescription={setDescription}
              />

              <GenerateOptions
                tone={tone}
                setTone={setTone}
                theme={theme}
                setTheme={setTheme}
                brandColor={brandColor}
                setBrandColor={setBrandColor}
              />

              <div className="mt-6 space-y-4 rounded-lg border border-white/10 bg-slate-800/30 p-4">
                <p className="text-sm font-semibold text-slate-200">
                  Info Toko <span className="font-normal text-slate-500">(opsional, tampil di slide)</span>
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="storeName" className="mb-2 block text-slate-200">Nama Toko</Label>
                    <Input
                      id="storeName"
                      type="text"
                      maxLength={40}
                      placeholder='Contoh: "Kopi Senja"'
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                      className="border-white/10 bg-slate-800/50 text-white placeholder:text-slate-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location" className="mb-2 block text-slate-200">Lokasi</Label>
                    <Input
                      id="location"
                      type="text"
                      maxLength={40}
                      placeholder='Contoh: "Bandung, Jawa Barat"'
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="border-white/10 bg-slate-800/50 text-white placeholder:text-slate-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="priceText" className="mb-2 block text-slate-200">Harga / Label Promo</Label>
                    <Input
                      id="priceText"
                      type="text"
                      maxLength={30}
                      placeholder='Contoh: "Rp 25.000"'
                      value={priceText}
                      onChange={(e) => setPriceText(e.target.value)}
                      className="border-white/10 bg-slate-800/50 text-white placeholder:text-slate-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactInfo" className="mb-2 block text-slate-200">Kontak IG & WA</Label>
                    <Input
                      id="contactInfo"
                      type="text"
                      maxLength={80}
                      placeholder='Contoh: "@kopisenja • WA 0812xxx"'
                      value={contactInfo}
                      onChange={(e) => setContactInfo(e.target.value)}
                      className="border-white/10 bg-slate-800/50 text-white placeholder:text-slate-500"
                    />
                  </div>
                </div>
              </div>

              {error && (
                <div className="mt-4 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400">
                  {error}
                </div>
              )}

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

          <div className="space-y-6">
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-sm">
              <div className="mb-4 flex items-center justify-between gap-2">
                <h2 className="text-xl font-semibold text-white">Preview Carousel</h2>
                {result && (
                  <DownloadButton
                    slideRefs={slideRefs}
                    productName={productName}
                    currentSlide={currentSlide}
                  />
                )}
              </div>

              <CarouselPreview
                content={result}
                theme={theme}
                brandColor={brandColor}
                productName={productName}
                productImage={productImage}
                brandInfo={brandInfo}
                slideRefs={slideRefs}
                isLoading={isPending}
                currentSlide={currentSlide}
                onSlideChange={setCurrentSlide}
              />
            </div>

            {result && (
              <SlideTextEditor
                index={currentSlide}
                slide={result.slides[currentSlide]}
                onChange={(next) => updateSlide(currentSlide, next)}
              />
            )}

            {result && (
              <CaptionDisplay caption={result.caption} onChange={updateCaption} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { generateContent } from "@/app/actions/generate-content";
import type {
  Tone,
  Theme,
  BrandInfo,
  CampaignType,
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
import { createSampleImage, extractDominantColors } from "@/lib/utils";
import {
  HISTORY_LIMIT,
  loadHistory,
  loadProfile,
  saveHistory,
  saveProfile,
  type HistoryItem,
} from "@/lib/storage";
import { ProductForm } from "@/components/generate/ProductForm";
import { GenerateOptions } from "@/components/generate/GenerateOptions";
import { CarouselPreview } from "@/components/carousel/CarouselPreview";
import { DownloadButton } from "@/components/generate/DownloadButton";
import { CaptionDisplay } from "@/components/generate/CaptionDisplay";
import { SampleProductButtons } from "@/components/generate/SampleProductButtons";
import { SlideTextEditor } from "@/components/generate/SlideTextEditor";
import { HistoryPanel } from "@/components/generate/HistoryPanel";
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
  const [campaignType, setCampaignType] = useState<CampaignType>("launch");
  const [storeName, setStoreName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [priceText, setPriceText] = useState<string>("");
  const [contactInfo, setContactInfo] = useState<string>("");
  const [palette, setPalette] = useState<{ source: string; colors: string[] }>({ source: "", colors: [] });
  const [result, setResult] = useState<GeneratedContent | null>(null);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [hydrated, setHydrated] = useState<boolean>(false);
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
  const registerSlide = (index: number, el: HTMLDivElement | null) => {
    slideRefs.current[index] = el;
  };

  // Muat profil toko & riwayat dari localStorage setelah render pertama (aman untuk SSR).
  // Hidrasi sekali setelah mount: sumbernya di luar React, jadi setState di sini disengaja.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const profile = loadProfile();
    if (profile) {
      if (profile.storeName) setStoreName(profile.storeName);
      if (profile.contactInfo) setContactInfo(profile.contactInfo);
      if (profile.location) setLocation(profile.location);
      if (profile.brandColor) setBrandColor(profile.brandColor);
      if (profile.tone) setTone(profile.tone);
      if (profile.theme) setTheme(profile.theme);
    }
    const items = loadHistory();
    setHistory(items);
    if (items[0]) {
      setResult(items[0].result);
      setCurrentId(items[0].id);
    }
    setHydrated(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Simpan profil toko setiap kali berubah
  useEffect(() => {
    if (!hydrated) return;
    saveProfile({
      storeName: storeName.trim() || undefined,
      contactInfo: contactInfo.trim() || undefined,
      location: location.trim() || undefined,
      brandColor,
      tone,
      theme,
    });
  }, [hydrated, storeName, contactInfo, location, brandColor, tone, theme]);

  // Simpan riwayat setiap kali berubah
  useEffect(() => {
    if (hydrated) saveHistory(history);
  }, [hydrated, history]);

  // Palet warna dari foto produk (Tahap 3.2). Hanya berlaku untuk foto yang sedang dipakai.
  const suggestedColors = productImage && palette.source === productImage ? palette.colors : [];
  useEffect(() => {
    if (!productImage) return;
    let cancelled = false;
    extractDominantColors(productImage)
      .then((colors) => {
        if (!cancelled) setPalette({ source: productImage, colors });
      })
      .catch(() => {
        if (!cancelled) setPalette({ source: productImage, colors: [] });
      });
    return () => {
      cancelled = true;
    };
  }, [productImage]);

  // Setiap hasil yang diedit (slide/caption/WA) ikut tersimpan di riwayat, tanpa foto.
  const applyResultEdit = (next: GeneratedContent) => {
    setResult(next);
    if (currentId) {
      setHistory((prev) => prev.map((item) => (item.id === currentId ? { ...item, result: next } : item)));
    }
  };

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
      campaignType,
      brandInfo,
    };

    startTransition(async () => {
      const response = await generateContent(input);

      if (response.success && response.data) {
        const id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
        const item: HistoryItem = {
          id,
          timestamp: Date.now(),
          productName: productName || undefined,
          tone,
          theme,
          brandColor,
          brandInfo,
          result: response.data,
        };
        setHistory((prev) => [item, ...prev].slice(0, HISTORY_LIMIT));
        setCurrentId(id);
        setResult(response.data);
        setCurrentSlide(0);
      } else {
        setError(response.error || "Terjadi kesalahan");
      }
    });
  };

  // Muat hasil lama dari riwayat (foto tidak disimpan, jadi foto yang sekarang dipertahankan)
  const handleLoadHistory = (item: HistoryItem) => {
    setError("");
    setResult(item.result);
    setCurrentId(item.id);
    setCurrentSlide(0);
    setProductName(item.productName ?? "");
    setTone(item.tone);
    setTheme(item.theme);
    setBrandColor(item.brandColor ?? DEFAULT_BRAND_COLOR);
    setStoreName(item.brandInfo?.storeName ?? "");
    setPriceText(item.brandInfo?.priceText ?? "");
    setContactInfo(item.brandInfo?.contactInfo ?? "");
    setLocation(item.brandInfo?.location ?? "");
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
    if (!result) return;
    const slides = [...result.slides] as GeneratedContent["slides"];
    slides[index] = next as GeneratedContent["slides"][number];
    applyResultEdit({ ...result, slides });
  };

  const updateCaption = (caption: string) => {
    if (result) applyResultEdit({ ...result, caption });
  };

  const updateWhatsapp = (whatsappTemplate: string) => {
    if (result) applyResultEdit({ ...result, whatsappTemplate });
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
          <HistoryPanel items={history} onLoad={handleLoadHistory} />
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
                suggestedColors={suggestedColors}
                campaignType={campaignType}
                setCampaignType={setCampaignType}
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
                      placeholder='Contoh: "Rp 25.000" atau "Diskon 20%"'
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
                registerSlide={registerSlide}
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
              <CaptionDisplay
                caption={result.caption}
                onChange={updateCaption}
                hashtags={result.hashtags}
                whatsappTemplate={result.whatsappTemplate}
                onWhatsappChange={updateWhatsapp}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

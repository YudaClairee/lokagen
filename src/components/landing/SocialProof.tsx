"use client";

import { useEffect, useState } from "react";
import { getThemeComponents } from "@/components/carousel/themes";
import { ScaledSlide } from "@/components/carousel/ScaledSlide";
import { SAMPLE_PRODUCTS } from "@/lib/constants";
import { createSampleImage } from "@/lib/utils";
import type { SlideIntro, Theme } from "@/lib/types";

// Satu foto & satu judul yang sama, dirender dengan 4 tema visual.
const THEMES: Theme[] = [
  "Colorful Gen Z",
  "Minimal Clean Modern",
  "Dark Modern/Futuristic",
  "Bold Typography",
];

const sample = SAMPLE_PRODUCTS[0];

const demoIntro: SlideIntro = {
  type: "intro",
  title: "Ngopi Santai Tiap Sore",
  subtitle: "Kopi gula aren khas Bandung, manis legit dan wangi karamel",
};

export function SocialProof() {
  const [photo, setPhoto] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    createSampleImage(sample.imageColor, sample.label)
      .then((image) => {
        if (!cancelled) setPhoto(image);
      })
      .catch(() => {
        // Tanpa foto, slide tetap tampil dengan placeholder
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="showcase" className="relative py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-5xl">
            Dari <span className="text-primary">1 foto</span>, jadi 4 gaya
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Teks dan warna mengikuti tema yang kamu pilih. Foto produkmu tetap jadi pusat perhatian.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          <figure className="space-y-2">
            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50">
              {photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photo} alt="Foto produk contoh" className="aspect-square w-full object-cover" />
              ) : (
                <div className="aspect-square w-full bg-slate-800" />
              )}
            </div>
            <figcaption className="text-center text-sm font-semibold text-slate-300">Foto asli</figcaption>
          </figure>

          {THEMES.map((theme) => {
            const { SlideIntro: Intro } = getThemeComponents(theme);
            return (
              <figure key={theme} className="space-y-2">
                <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50">
                  <ScaledSlide>
                    <Intro
                      data={demoIntro}
                      productName={sample.productName}
                      brandColor={sample.brandColor}
                      productImage={photo || undefined}
                      brandInfo={sample.brandInfo}
                      isPlaceholder={false}
                    />
                  </ScaledSlide>
                </div>
                <figcaption className="text-center text-sm font-semibold text-slate-300">{theme}</figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}

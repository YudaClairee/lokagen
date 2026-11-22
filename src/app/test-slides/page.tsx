"use client";

import { useEffect, useMemo, useState } from "react";
import { getThemeComponents } from "@/components/carousel/themes";
import { ScaledSlide } from "@/components/carousel/ScaledSlide";
import { createSampleImage } from "@/lib/utils";
import { normalizeHex } from "@/lib/color";
import { SAMPLE_PRODUCTS } from "@/lib/constants";
import type { Theme } from "@/lib/types";
import { FIXTURES, FIXTURE_NAMES, type FixtureName } from "./fixtures";

// Uji visual: 4 tema x 7 fixture. Fixture "max" & "overflow" tidak boleh keluar kotak.
const THEMES: { value: Theme; label: string }[] = [
  { value: "Bold Typography", label: "Bold Typography" },
  { value: "Colorful Gen Z", label: "Colorful Gen-Z" },
  { value: "Dark Modern/Futuristic", label: "Dark Futuristic" },
  { value: "Minimal Clean Modern", label: "Minimal Clean" },
];

const SLIDE_LABELS = ["Intro", "Features", "Benefits", "Promo", "CTA"] as const;

// Warna brand uji: masing-masing menguji kasus kontras tertentu (lihat template_design_plan.md, Tahap G).
const BRAND_COLORS: { label: string; value: string }[] = [
  { label: "Default", value: "#3b82f6" },
  { label: "Kuning", value: "#FDE047" },
  { label: "Krem", value: "#F5F0E1" },
  { label: "Navy", value: "#1E3A8A" },
  { label: "Hitam", value: "#000000" },
  { label: "Putih", value: "#FFFFFF" },
  { label: "Pink", value: "#FF69B4" },
];
const sample = SAMPLE_PRODUCTS[0];

const buttonClass = (active: boolean) =>
  `rounded px-3 py-1.5 text-sm ${active ? "bg-blue-600 text-white" : "bg-white text-gray-800"}`;

export default function TestSlidesPage() {
  const [theme, setTheme] = useState<Theme>("Bold Typography");
  const [fixture, setFixture] = useState<FixtureName>("short");
  const [photo, setPhoto] = useState<string>("");
  const [brandColor, setBrandColor] = useState<string>(BRAND_COLORS[0].value);
  const [withPhoto, setWithPhoto] = useState(true);
  const [withBrandInfo, setWithBrandInfo] = useState(true);

  useEffect(() => {
    let cancelled = false;
    createSampleImage(sample.imageColor, sample.label).then((image) => {
      if (!cancelled) setPhoto(image);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const components = useMemo(() => getThemeComponents(theme), [theme]);
  const slides = FIXTURES[fixture];
  const common = {
    productName: sample.productName,
    brandColor: normalizeHex(brandColor),
    productImage: withPhoto ? photo || undefined : undefined,
    brandInfo: withBrandInfo ? sample.brandInfo : undefined,
    isPlaceholder: false,
  };

  const renderers = [
    <components.SlideIntro key="intro" data={slides[0]} {...common} />,
    <components.SlideFeatures key="features" data={slides[1]} {...common} />,
    <components.SlideBenefits key="benefits" data={slides[2]} {...common} />,
    <components.SlidePromo key="promo" data={slides[3]} {...common} />,
    <components.SlideCTA key="cta" data={slides[4]} {...common} />,
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="mb-6 text-2xl font-bold">Slide Theme Tester</h1>

      <div className="mb-4 flex flex-wrap gap-2">
        {THEMES.map((t) => (
          <button key={t.value} type="button" onClick={() => setTheme(t.value)} className={buttonClass(theme === t.value)}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        {BRAND_COLORS.map((c) => (
          <button key={c.value} type="button" onClick={() => setBrandColor(c.value)} className={buttonClass(brandColor === c.value)}>
            <span className="mr-2 inline-block h-3 w-3 rounded-full border border-gray-400 align-middle" style={{ backgroundColor: c.value }} />
            {c.label}
          </button>
        ))}
        <button type="button" onClick={() => setWithPhoto((v) => !v)} className={buttonClass(withPhoto)}>
          Foto: {withPhoto ? "ada" : "tidak ada"}
        </button>
        <button type="button" onClick={() => setWithBrandInfo((v) => !v)} className={buttonClass(withBrandInfo)}>
          Info toko: {withBrandInfo ? "lengkap" : "kosong"}
        </button>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {FIXTURE_NAMES.map((name) => (
          <button key={name} type="button" onClick={() => setFixture(name)} className={buttonClass(fixture === name)}>
            {name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {renderers.map((slide, i) => (
          <div key={SLIDE_LABELS[i]} className="flex flex-col gap-2">
            <h2 className="text-sm font-semibold text-gray-500">{SLIDE_LABELS[i]}</h2>
            <div className="w-full sm:w-[320px]">
              <ScaledSlide>{slide}</ScaledSlide>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

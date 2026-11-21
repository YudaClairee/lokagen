import { COPY_LIMITS as L } from "@/lib/constants";
import type { SlideBenefits, SlideCTA, SlideFeatures, SlideIntro, SlidePromo } from "@/lib/types";

export type SlideSet = [SlideIntro, SlideFeatures, SlideBenefits, SlidePromo, SlideCTA];

export const FIXTURE_NAMES = [
  "short",
  "max",
  "overflow",
  "long-word",
  "value-mode",
  "promo-mode",
  "two-bullets",
] as const;
export type FixtureName = (typeof FIXTURE_NAMES)[number];

/** Teks dengan panjang tepat `n` karakter (dipotong di spasi bila perlu). */
const fill = (n: number) =>
  "Kopi Senja enak banget untuk santai sore hari bareng teman ".repeat(8).slice(0, n).trimEnd();

const bulletsOf = (n: number, count: number = L.bulletCount) => Array.from({ length: count }, () => fill(n));

/** Fixture untuk uji visual slide (dilewatkan tanpa normalizeContent kecuali disebut). */
export const FIXTURES: Record<FixtureName, SlideSet> = {
  short: [
    { type: "intro", title: "Kopi Senja", subtitle: "Kopi gula aren khas Bandung" },
    { type: "features", title: "Isi", bullets: ["Gula aren asli", "Biji arabika", "Botol 250ml"] },
    { type: "benefits", title: "Untuk Kamu", bullets: ["Teman ngopi santai", "Rasa manis legit", "Praktis dibawa"] },
    { type: "promo", mode: "value", title: "Wajib Coba", promoText: "Rasa konsisten tiap hari", highlightBadge: "FAVORIT" },
    { type: "cta", title: "Yuk Pesan", ctaText: "Chat kami sekarang juga" },
  ],
  max: [
    { type: "intro", title: fill(L.title.maxChars), subtitle: fill(L.subtitle.maxChars) },
    { type: "features", title: fill(L.title.maxChars), bullets: bulletsOf(L.bullet.maxChars) },
    { type: "benefits", title: fill(L.title.maxChars), bullets: bulletsOf(L.bullet.maxChars) },
    { type: "promo", mode: "value", title: fill(L.title.maxChars), promoText: fill(L.promoText.maxChars), highlightBadge: fill(L.highlightBadge.maxChars) },
    { type: "cta", title: fill(L.title.maxChars), ctaText: fill(L.ctaText.maxChars) },
  ],
  overflow: [
    { type: "intro", title: fill(L.title.maxChars * 2), subtitle: fill(L.subtitle.maxChars * 2) },
    { type: "features", title: fill(L.title.maxChars * 2), bullets: bulletsOf(L.bullet.maxChars * 2) },
    { type: "benefits", title: fill(L.title.maxChars * 2), bullets: bulletsOf(L.bullet.maxChars * 2) },
    { type: "promo", mode: "value", title: fill(L.title.maxChars * 2), promoText: fill(L.promoText.maxChars * 2), highlightBadge: fill(L.highlightBadge.maxChars * 2) },
    { type: "cta", title: fill(L.title.maxChars * 2), ctaText: fill(L.ctaText.maxChars * 2) },
  ],
  "long-word": [
    { type: "intro", title: "AntiMainstreamKopiGulaArenBanget", subtitle: "Judul satu kata sangat panjang" },
    { type: "features", title: "Fitur", bullets: ["Supercalifragilisticexpialidocious", "Biji arabika", "Botol 250ml"] },
    { type: "benefits", title: "Manfaat", bullets: ["Teman ngopi santai", "Rasa manis legit", "Praktis dibawa"] },
    { type: "promo", mode: "value", title: "Wajib Coba", promoText: "Rasa konsisten tiap hari", highlightBadge: "FAVORIT" },
    { type: "cta", title: "PesanSekarangJuga", ctaText: "Chat kami sekarang juga" },
  ],
  "value-mode": [
    { type: "intro", title: "Kopi Senja", subtitle: "Kopi gula aren khas Bandung" },
    { type: "features", title: "Isi", bullets: ["Gula aren asli", "Biji arabika", "Botol 250ml"] },
    { type: "benefits", title: "Untuk Kamu", bullets: ["Teman ngopi santai", "Rasa manis legit", "Praktis dibawa"] },
    { type: "promo", mode: "value", title: "Wajib Coba!", promoText: "Dibuat fresh setiap hari, rasa konsisten", highlightBadge: "FAVORIT" },
    { type: "cta", title: "Yuk Pesan", ctaText: "Chat kami sekarang juga" },
  ],
  "promo-mode": [
    { type: "intro", title: "Kopi Senja", subtitle: "Kopi gula aren khas Bandung" },
    { type: "features", title: "Isi", bullets: ["Gula aren asli", "Biji arabika", "Botol 250ml"] },
    { type: "benefits", title: "Untuk Kamu", bullets: ["Teman ngopi santai", "Rasa manis legit", "Praktis dibawa"] },
    { type: "promo", mode: "promo", title: "Diskon 20%", promoText: "Diskon 20% s/d 30 November untuk semua varian", highlightBadge: "DISKON 20%" },
    { type: "cta", title: "Yuk Pesan", ctaText: "Chat kami sekarang juga" },
  ],
  "two-bullets": [
    { type: "intro", title: "Kopi Senja", subtitle: "Kopi gula aren khas Bandung" },
    { type: "features", title: "Isi", bullets: ["Gula aren asli", "Botol 250ml"] },
    { type: "benefits", title: "Untuk Kamu", bullets: ["Teman ngopi santai", "Rasa manis legit"] },
    { type: "promo", mode: "value", title: "Wajib Coba", promoText: "Rasa konsisten tiap hari", highlightBadge: "FAVORIT" },
    { type: "cta", title: "Yuk Pesan", ctaText: "Chat kami sekarang juga" },
  ],
};

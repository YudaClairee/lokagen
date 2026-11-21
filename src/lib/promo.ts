import type { GenerateContentInput, PromoMode } from "./types";

// Pola angka/promo yang dianggap "info promo nyata" bila ditulis user di deskripsi.
export const PROMO_PATTERN =
  /(diskon|disc|potongan|promo|gratis|free|cashback|beli\s*\d+\s*(gratis|dapat)|buy\s*\d+|\d+\s*%|rp\.?\s*\d|\d+\s*(rb|ribu|k)\b|harga\s+(spesial|khusus|coret))/i;

// Untuk kolom "Harga / Label Promo": harga biasa (mis. "Mulai 18K") BUKAN promo.
// Hanya kata/angka promo yang memicu mode promo.
export const PROMO_WORD_PATTERN =
  /(diskon|disc|potongan|promo|gratis|free|cashback|coret|\d+\s*%|beli\s*\d+|buy\s*\d+)/i;

export function resolvePromoMode(input: GenerateContentInput): PromoMode {
  const hasPromoInDescription = PROMO_PATTERN.test(input.description ?? "");
  const hasPromoInPrice = PROMO_WORD_PATTERN.test(input.brandInfo?.priceText ?? "");
  // campaignType "promo" saja TIDAK cukup: harus ada detail promo nyata dari user
  return hasPromoInDescription || hasPromoInPrice ? "promo" : "value";
}

/** Info promo mentah yang boleh dikutip AI (tidak boleh ditambah-tambahi). */
export function extractPromoFacts(input: GenerateContentInput): string {
  return [input.brandInfo?.promoBadge, input.brandInfo?.priceText]
    .filter(Boolean)
    .join(" • ");
}

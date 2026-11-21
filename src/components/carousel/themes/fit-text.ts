/**
 * Pilih class ukuran font berdasarkan panjang teks.
 * steps: [[maxChars, className], ...] urut dari teks terpendek; fallback dipakai jika lebih panjang.
 */
export function fitText(
  text: string,
  steps: [number, string][],
  fallback: string
): string {
  const len = text.trim().length;
  for (const [max, cls] of steps) if (len <= max) return cls;
  return fallback;
}

// Label kontekstual slide promo (Tahap 5.5): "promo" = ada info promo dari user,
// "value" = slide alasan wajib coba, tanpa klaim diskon.
export const PROMO_LABELS = {
  promo: { header: "PROMO", badge: "SPESIAL!", kicker: "Penawaran Spesial", order: "ORDER" },
  value: { header: "WAJIB COBA", badge: "FAVORIT", kicker: "Kenapa Harus Ini?", order: "COBA" },
} as const;

/** Judul dipecah per kata hanya jika pendek dan tiap kata tidak terlalu panjang. */
export function shouldSplitWords(text: string): boolean {
  const words = text.trim().split(/\s+/);
  return words.length <= 3 && words.every((w) => w.length <= 8);
}

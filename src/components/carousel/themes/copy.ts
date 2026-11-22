// Sumber tunggal teks bawaan di dalam slide (label, tombol, judul bagian).
// Tema boleh mengubah gaya penulisan (UPPERCASE, snake_case), tapi katanya diambil dari sini.

// Label kontekstual slide promo: "promo" = ada info promo dari user,
// "value" = slide alasan wajib coba, tanpa klaim diskon.
export const PROMO_LABELS = {
  promo: { header: "PROMO", badge: "SPESIAL!", kicker: "Penawaran Spesial", order: "ORDER" },
  value: { header: "WAJIB COBA", badge: "FAVORIT", kicker: "Kenapa Harus Ini?", order: "COBA" },
} as const;

/** Teks tombol di slide CTA. */
export const CTA_LABEL = "Pesan Sekarang";

/** Judul bagian untuk slide Features dan Benefits. */
export const SECTION_LABELS = {
  features: "Keunggulan",
  benefits: "Manfaat",
} as const;

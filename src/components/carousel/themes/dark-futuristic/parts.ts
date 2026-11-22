import { ensureContrast } from "@/lib/color";

// Latar semua slide Dark Futuristic.
export const DARK_BG = "#0a0a0f";

// Efek scanline CRT di atas foto produk Dark Futuristic.
export const SCANLINE_CLASS =
  "pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]";

/**
 * Turunan warna brand yang dijamin terbaca di atas latar gelap:
 * - shape: garis, border, bar (kontras ≥ 3:1)
 * - text: teks kecil berwarna (kontras ≥ 4.5:1)
 * Glow, tint foto, dan gradien latar boleh tetap memakai brandColor asli (dekoratif).
 */
export function getDarkAccents(brandColor: string) {
  return {
    shape: ensureContrast(brandColor, DARK_BG, 3),
    text: ensureContrast(brandColor, DARK_BG, 4.5),
  };
}

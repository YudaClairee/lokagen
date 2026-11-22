import { ensureContrast } from "@/lib/color";

// Latar semua slide Dark Futuristic.
export const DARK_BG = "#0a0a0f";

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

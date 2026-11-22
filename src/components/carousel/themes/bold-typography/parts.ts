import { ensureContrast } from "@/lib/color";

/**
 * Turunan warna brand yang terbaca di atas latar putih (Intro, Features, Promo, CTA)
 * dan latar hitam (Benefits).
 * - shape: bar, garis, blok (kontras ≥ 3:1)
 * - text: teks kecil berwarna (kontras ≥ 4.5:1, hanya untuk latar putih)
 * Elemen yang diberi border hitam tebal dan watermark transparan boleh tetap memakai brandColor asli.
 */
export function getBoldAccents(brandColor: string) {
  return {
    onLight: {
      shape: ensureContrast(brandColor, "#ffffff", 3),
      text: ensureContrast(brandColor, "#ffffff", 4.5),
    },
    onDark: ensureContrast(brandColor, "#000000", 3),
  };
}

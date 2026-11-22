import { colorDistance } from "@/lib/color";

// Warna "pop" tetap milik tema Gen Z, urut dari yang paling dipilih (pink = tampilan asli).
const POP_COLORS = ["#FF69B4", "#00FF94", "#FFD700", "#0088FF"] as const;

// Jarak minimal (RGB, 0..~442) supaya footer/badge tidak menyatu dengan kartu berwarna brand.
const MIN_DISTANCE = 140;

/**
 * Warna footer dan badge. Tetap pink kalau cukup berbeda dari warna brand;
 * kalau terlalu mirip (mis. brand pink), pakai pop berikutnya yang cukup jauh,
 * atau yang paling jauh bila tidak ada yang memenuhi.
 */
export function pickContrastingPop(brandColor: string): string {
  const enough = POP_COLORS.find((c) => colorDistance(c, brandColor) >= MIN_DISTANCE);
  if (enough) return enough;
  return POP_COLORS.reduce((best, c) => (colorDistance(c, brandColor) > colorDistance(best, brandColor) ? c : best));
}

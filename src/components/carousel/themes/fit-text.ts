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

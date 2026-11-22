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

/** Judul dipecah per kata hanya jika pendek dan tiap kata tidak terlalu panjang. */
export function shouldSplitWords(text: string): boolean {
  const words = text.trim().split(/\s+/);
  return words.length <= 3 && words.every((w) => w.length <= 8);
}

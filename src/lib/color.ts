import { DEFAULT_BRAND_COLOR } from "./constants";

// Utilitas warna untuk template carousel. Semua fungsi menerima hex "#rrggbb"
// (gunakan normalizeHex di hulu agar input user yang aneh tidak sampai ke sini).

const HEX_FULL = /^#?([0-9a-f]{6})$/i;
const HEX_SHORT = /^#?([0-9a-f]{3})$/i;

const INK = "#111111";
const PAPER = "#ffffff";

type Rgb = [number, number, number];

/** "#abc", "abc", "#AABBCC", " #aabbcc " → "#aabbcc". Input tidak valid → fallback. */
export function normalizeHex(input: string | undefined | null, fallback: string = DEFAULT_BRAND_COLOR): string {
  const value = (input ?? "").trim();
  const full = HEX_FULL.exec(value);
  if (full) return `#${full[1].toLowerCase()}`;
  const short = HEX_SHORT.exec(value);
  if (short) {
    const [r, g, b] = short[1].toLowerCase();
    return `#${r}${r}${g}${g}${b}${b}`;
  }
  return fallback;
}

function toRgb(hex: string): Rgb {
  const n = parseInt(normalizeHex(hex, "#000000").slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function toHex([r, g, b]: Rgb): string {
  return `#${[r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("")}`;
}

/** Relative luminance WCAG 2.x (0..1). */
export function luminance(hex: string): number {
  const [r, g, b] = toRgb(hex).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Rasio kontras WCAG (1..21). */
export function contrastRatio(a: string, b: string): number {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

/** "#111111" atau "#ffffff", mana yang kontrasnya lebih tinggi terhadap bg. Bg tidak valid → putih. */
export function readableTextColor(bg: string): string {
  if (!HEX_FULL.test(bg.trim()) && !HEX_SHORT.test(bg.trim())) return PAPER;
  return contrastRatio(bg, INK) >= contrastRatio(bg, PAPER) ? INK : PAPER;
}

function rgbToHsl([r, g, b]: Rgb): [number, number, number] {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  const d = max - min;
  if (d === 0) return [0, 0, l];
  const s = d / (1 - Math.abs(2 * l - 1));
  let h: number;
  if (max === rn) h = ((gn - bn) / d) % 6;
  else if (max === gn) h = (bn - rn) / d + 2;
  else h = (rn - gn) / d + 4;
  return [(h * 60 + 360) % 360, s, l];
}

function hslToRgb(h: number, s: number, l: number): Rgb {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  const [r, g, b] =
    h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  return [(r + m) * 255, (g + m) * 255, (b + m) * 255];
}

/** Geser kecerahan fg ke arah `dir` (+1 terang, -1 gelap) sampai kontras terhadap bg ≥ minRatio. */
function shiftLightness(fg: string, bg: string, minRatio: number, dir: 1 | -1): string | null {
  const [h, s, l] = rgbToHsl(toRgb(fg));
  for (let step = 1; step <= 100; step++) {
    const nl = l + dir * (step / 100);
    if (nl < 0 || nl > 1) break;
    const candidate = toHex(hslToRgb(h, s, nl));
    if (contrastRatio(candidate, bg) >= minRatio) return candidate;
  }
  return null;
}

/**
 * Pastikan fg terbaca di atas bg (kontras ≥ minRatio). Hue dan saturasi dipertahankan agar
 * tetap terasa sebagai warna brand; yang digeser hanya kecerahan. Jika tidak ada arah yang
 * berhasil, jatuh ke hitam/putih (readableTextColor).
 *
 * minRatio: 4.5 untuk teks isi, 3 untuk teks besar (≥24px bold) dan aksen non-teks.
 */
export function ensureContrast(fg: string, bg: string, minRatio = 3): string {
  const color = normalizeHex(fg);
  if (contrastRatio(color, bg) >= minRatio) return color;
  const preferred = luminance(bg) > 0.5 ? -1 : 1;
  return (
    shiftLightness(color, bg, minRatio, preferred) ??
    shiftLightness(color, bg, minRatio, preferred === 1 ? -1 : 1) ??
    readableTextColor(bg)
  );
}

/** Jarak warna sederhana (RGB euclidean, 0..~442). Dipakai untuk memilih warna yang tidak mirip. */
export function colorDistance(a: string, b: string): number {
  const [r1, g1, b1] = toRgb(a);
  const [r2, g2, b2] = toRgb(b);
  return Math.hypot(r1 - r2, g1 - g2, b1 - b2);
}

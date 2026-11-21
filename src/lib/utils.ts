import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Kompres gambar di sisi klien (maks `maxDimension` px, JPEG) agar payload
 * ke Server Action kecil (~150–250KB) dan AI Vision lebih cepat.
 */
export async function compressImageFile(
  file: File,
  maxDimension = 1080,
  quality = 0.82
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        const scale = Math.min(1, maxDimension / Math.max(img.width, img.height));
        const width = Math.round(img.width * scale);
        const height = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Canvas context unavailable"));
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Buat gambar contoh JPEG sederhana di canvas (latar gradasi + label produk).
 * Dipakai tombol "Coba Contoh" agar user tidak perlu mengunggah foto.
 */
export async function createSampleImage(
  color: string,
  label: string,
  size = 800
): Promise<string> {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context unavailable");

  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, "#1e293b");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  ctx.fillStyle = "rgba(255,255,255,0.15)";
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size * 0.34, 0, Math.PI * 2);
  ctx.fill();

  // Bungkus label ke beberapa baris
  const fontSize = Math.round(size * 0.064);
  ctx.font = `bold ${fontSize}px sans-serif`;
  const maxWidth = size * 0.6;
  const words = label.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);

  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const lineHeight = fontSize * 1.25;
  const startY = size / 2 - ((lines.length - 1) * lineHeight) / 2;
  lines.forEach((line, i) => ctx.fillText(line, size / 2, startY + i * lineHeight));

  return canvas.toDataURL("image/jpeg", 0.85);
}

type Rgb = { r: number; g: number; b: number };

const toHex = ({ r, g, b }: Rgb) =>
  "#" + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");

const colorDistance = (a: Rgb, b: Rgb) =>
  Math.sqrt((a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2);

// Putar hue sebuah warna (untuk melengkapi palet bila foto hanya punya sedikit warna)
function shiftHue({ r, g, b }: Rgb, degrees: number): Rgb {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  const d = max - min;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  let h = 0;
  if (d !== 0) {
    if (max === rn) h = ((gn - bn) / d) % 6;
    else if (max === gn) h = (bn - rn) / d + 2;
    else h = (rn - gn) / d + 4;
    h = (h * 60 + 360) % 360;
  }
  const nh = (h + degrees + 360) % 360;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((nh / 60) % 2) - 1));
  const m = l - c / 2;
  const [r1, g1, b1] =
    nh < 60 ? [c, x, 0] : nh < 120 ? [x, c, 0] : nh < 180 ? [0, c, x]
    : nh < 240 ? [0, x, c] : nh < 300 ? [x, 0, c] : [c, 0, x];
  return { r: (r1 + m) * 255, g: (g1 + m) * 255, b: (b1 + m) * 255 };
}

/**
 * Ambil warna dominan & menonjol dari foto (sampling canvas 32x32).
 * Mengembalikan hex `#rrggbb`. Diisi dengan variasi hue bila warna foto sedikit.
 */
export async function extractDominantColors(dataUrl: string, count = 5): Promise<string[]> {
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const el = new window.Image();
    el.onload = () => resolve(el);
    el.onerror = reject;
    el.src = dataUrl;
  });

  const size = 32;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return [];
  ctx.drawImage(img, 0, 0, size, size);
  const { data } = ctx.getImageData(0, 0, size, size);

  // Kelompokkan piksel ke bucket 4-bit per kanal
  const buckets = new Map<number, { r: number; g: number; b: number; n: number; sat: number }>();
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 128) continue; // transparan
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const light = (max + min) / 2 / 255;
    if (light < 0.12 || light > 0.92) continue; // terlalu gelap / hampir putih
    const sat = max === min ? 0 : (max - min) / (255 - Math.abs(max + min - 255));
    const key = ((r >> 4) << 8) | ((g >> 4) << 4) | (b >> 4);
    const cur = buckets.get(key) ?? { r: 0, g: 0, b: 0, n: 0, sat: 0 };
    cur.r += r; cur.g += g; cur.b += b; cur.n += 1; cur.sat += sat;
    buckets.set(key, cur);
  }

  // Skor = frekuensi x saturasi, supaya warna yang cerah dan menonjol didahulukan
  const ranked = [...buckets.values()]
    .map((c) => ({
      rgb: { r: c.r / c.n, g: c.g / c.n, b: c.b / c.n },
      score: c.n * (0.4 + c.sat / c.n),
    }))
    .sort((a, b) => b.score - a.score);

  const picked: Rgb[] = [];
  for (const { rgb } of ranked) {
    if (picked.every((p) => colorDistance(p, rgb) > 70)) picked.push(rgb);
    if (picked.length >= count) break;
  }

  // Lengkapi bila foto hanya punya sedikit warna berbeda
  const seed = picked[0] ?? { r: 59, g: 130, b: 246 };
  const degrees = [120, 240, 60, 180, 300];
  for (const d of degrees) {
    if (picked.length >= count) break;
    const variant = shiftHue(seed, d);
    if (picked.every((p) => colorDistance(p, variant) > 40)) picked.push(variant);
  }

  return picked.slice(0, count).map(toHex);
}

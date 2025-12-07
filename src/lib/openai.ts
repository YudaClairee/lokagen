import OpenAI from "openai";
import type { Tone, Theme } from "@/lib/types";

export const openai = new OpenAI({
  apiKey: process.env.KOLOSAL_API_KEY,
  baseURL: "https://api.kolosal.ai/v1",
});

export const SYSTEM_PROMPT = `Kamu adalah AI content creator profesional yang spesialis membuat konten Instagram carousel untuk UMKM lokal Indonesia.

Tugasmu adalah membuat:
1. Caption Instagram yang engaging dan sesuai tone yang diminta
2. Konten untuk 5 slide carousel dengan struktur:
   - Slide 1: Hook/Intro (title + subtitle yang menarik perhatian)
   - Slide 2: Features/Keunggulan produk (title + 3-4 bullet points)
   - Slide 3: Benefits/Manfaat (title + 3-4 bullet points)
   - Slide 4: Promo/Penawaran spesial (title + promo text)
   - Slide 5: CTA/Call to Action (title + CTA text)

Rules:
- Gunakan Bahasa Indonesia yang natural dan sesuai tone
- Buat konten yang relatable untuk target market lokal
- Caption harus include hashtag yang relevan (5-10 hashtag)
- Setiap slide harus singkat, padat, dan mudah dibaca
- Title maksimal 5 kata
- Subtitle/promo text maksimal 15 kata
- Bullet points maksimal 8 kata per point

Output harus dalam format JSON yang valid.`;

const toneDescriptions: Record<Tone, string> = {
  playful: "fun, santai, pakai bahasa gaul yang friendly",
  formal: "profesional, sopan, dan terpercaya",
  elegan: "mewah, eksklusif, dan premium",
  lokal: "akrab, pakai bahasa daerah/slang lokal, seperti ngobrol sama teman",
};

const themeDescriptions: Record<Theme, string> = {
  "Colorful Gen Z": "warna-warni, vibrant, eye-catching, cocok untuk anak muda",
  "Minimal Clean Modern": "bersih, simpel, modern, elegan",
  "Dark Modern/Futuristic": "gelap, futuristik, bold, premium",
  "Bold Typography": "typography dominan, impactful, statement",
};

export function generateUserPrompt(
  productName: string | undefined,
  description: string | undefined,
  tone: Tone,
  theme: Theme,
  brandColor: string | undefined,
  hasImage: boolean
): string {
  const toneDesc = toneDescriptions[tone] || toneDescriptions.playful;
  const themeDesc = themeDescriptions[theme] || themeDescriptions["Colorful Gen Z"];

  let prompt = `Buatkan konten Instagram carousel untuk produk UMKM dengan detail berikut:

Tone: ${tone} (${toneDesc})
Tema Visual: ${theme} (${themeDesc})`;

  if (brandColor) {
    prompt += `\nWarna Brand: ${brandColor}`;
  }

  if (productName) {
    prompt += `\n\nNama Produk: ${productName}`;
  }

  if (description) {
    prompt += `\nDeskripsi produk: ${description}`;
  }

  if (hasImage) {
    prompt += `\n\nAnalisa juga gambar produk yang diberikan untuk memahami produk lebih baik dan sesuaikan konten dengan visual produk.`;
  }

  prompt += `

Pastikan konten sesuai dengan tone "${tone}" dan cocok untuk tema visual "${theme}".

Berikan output dalam format JSON berikut:
{
  "caption": "caption Instagram dengan hashtag",
  "slides": [
    { "type": "intro", "title": "...", "subtitle": "..." },
    { "type": "features", "title": "...", "bullets": ["...", "...", "..."] },
    { "type": "benefits", "title": "...", "bullets": ["...", "...", "..."] },
    { "type": "promo", "title": "...", "promoText": "..." },
    { "type": "cta", "title": "...", "ctaText": "..." }
  ]
}`;

  return prompt;
}

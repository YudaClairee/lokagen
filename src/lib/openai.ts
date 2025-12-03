import OpenAI from "openai";

// Initialize OpenAI client
export const openai = new OpenAI({
  apiKey: process.env.API_KEY_AI,
  baseURL: "https://api.kolosal.ai/v1",
});

// System prompt for generating Instagram carousel content
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

// Generate user prompt based on input
export function generateUserPrompt(
  description: string | undefined,
  tone: string,
  hasImage: boolean
): string {
  const toneDescriptions: Record<string, string> = {
    playful: "fun, santai, pakai bahasa gaul yang friendly",
    formal: "profesional, sopan, dan terpercaya",
    elegan: "mewah, eksklusif, dan premium",
    lokal: "akrab, pakai bahasa daerah/slang lokal, seperti ngobrol sama teman",
  };

  const toneDesc = toneDescriptions[tone] || toneDescriptions.playful;

  let prompt = `Buatkan konten Instagram carousel untuk produk UMKM dengan detail berikut:

Tone: ${tone} (${toneDesc})
`;

  if (description) {
    prompt += `\nDeskripsi produk: ${description}`;
  }

  if (hasImage) {
    prompt += `\n\nAnalisa juga gambar produk yang diberikan untuk memahami produk lebih baik.`;
  }

  prompt += `

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

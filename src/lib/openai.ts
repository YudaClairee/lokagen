import OpenAI from "openai";
import type { CampaignType, GenerateContentInput, PromoMode, Theme, Tone } from "@/lib/types";
import { COPY_LIMITS as L, CATEGORY_OPTIONS } from "@/lib/constants";

export const AI_MODEL =
  process.env.AI_MODEL || "deepseek/deepseek-v4.1-flash-1017";

export const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export const SYSTEM_PROMPT = `Kamu adalah social media copywriter senior untuk UMKM Indonesia. Tugasmu menulis isi 5 slide carousel Instagram + caption, yang akan dimasukkan ke template desain dengan ruang teks TERBATAS.

STRUKTUR SLIDE (urutan wajib):
1. "intro" — Hook. "title" berupa pernyataan/pertanyaan yang bikin berhenti scroll; "subtitle" menjelaskan produknya apa.
2. "features" — FAKTA PRODUK yang bisa dicek: bahan baku, ukuran/isi, varian, proses pembuatan, asal, kemasan. Tanpa kata sifat kosong ("enak", "berkualitas") kecuali didukung fakta.
3. "benefits" — DAMPAK KE PEMBELI: perasaan, solusi masalah, momen pemakaian, hemat waktu/biaya. DILARANG mengulang fakta dari slide 2; setiap poin harus menjawab "terus apa untungnya buat saya?".
4. "promo" — Ikuti instruksi MODE SLIDE 4 di pesan user.
5. "cta" — Ajakan bertindak yang spesifik (cara order), sesuai tone.

ATURAN ANTI-KARANG (WAJIB):
- JANGAN PERNAH menulis angka diskon, persentase, harga, "beli X gratis Y", cashback, batas waktu, atau stok terbatas yang TIDAK ada di input user.
- JANGAN mengklaim sertifikasi (halal, BPOM, SNI), penghargaan, jumlah terjual, rating, atau testimoni yang tidak disebut user atau tidak terlihat jelas di foto.
- Jika informasi kurang, tulis hal yang umum tapi jujur, bukan fakta palsu.

BATAS PANJANG (teks akan TERPOTONG jika lebih):
- title (semua slide): ${L.title.minWords}–${L.title.maxWords} kata, maks ${L.title.maxChars} karakter
- subtitle: ${L.subtitle.minWords}–${L.subtitle.maxWords} kata, maks ${L.subtitle.maxChars} karakter
- bullets: TEPAT ${L.bulletCount} poin, masing-masing ${L.bullet.minWords}–${L.bullet.maxWords} kata, maks ${L.bullet.maxChars} karakter, tanpa emoji, tanpa titik di akhir
- promoText: ${L.promoText.minWords}–${L.promoText.maxWords} kata, maks ${L.promoText.maxChars} karakter
- highlightBadge: ${L.highlightBadge.minWords}–${L.highlightBadge.maxWords} kata, maks ${L.highlightBadge.maxChars} karakter
- ctaText: ${L.ctaText.minWords}–${L.ctaText.maxWords} kata, maks ${L.ctaText.maxChars} karakter

FORMAT CAPTION (gunakan \\n\\n antar blok):
1. Hook 1 baris (maks 12 kata) yang memancing tap "more".
2. 1–2 kalimat cerita/nilai produk.
3. 3 poin, masing-masing diawali emoji relevan, dipisah \\n.
4. CTA jelas (cara order) sesuai tone.
5. Baris terakhir: ${L.hashtagCount.min}–${L.hashtagCount.max} hashtag dipisah spasi (campuran hashtag produk + lokal, mis. #UMKMLokal).

OUTPUT: HANYA JSON valid sesuai skema di pesan user. Tanpa markdown, tanpa penjelasan.`;

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

// Sudut pandang konten per tujuan (Tahap 3.1 poin 5)
const campaignDescriptions: Record<CampaignType, string> = {
  promo: "fokus pada penawaran; ikuti aturan MODE SLIDE 4",
  launch: "fokus pada kehadiran produk baru (mis. 'baru hadir', 'kenalan dengan'), bukan pada promo",
  education: "fokus pada edukasi: tips, cara pakai/pilih, atau solusi masalah pembeli; bukan jualan keras",
  bestseller: "fokus pada kualitas unggulan produk; jangan klaim jumlah terjual atau rating",
};

export interface UserPromptParams {
  input: GenerateContentInput;
  hasImage: boolean;
  promoMode: PromoMode;
  promoFacts: string;
}

export function generateUserPrompt({ input, hasImage, promoMode, promoFacts }: UserPromptParams): string {
  const { productName, description, tone, theme, brandColor, category, campaignType, brandInfo } = input;
  const toneDesc = toneDescriptions[tone] || toneDescriptions.playful;
  const themeDesc = themeDescriptions[theme] || themeDescriptions["Colorful Gen Z"];
  const categoryOption = CATEGORY_OPTIONS.find((c) => c.value === category);

  let prompt = `Buatkan konten Instagram carousel untuk produk UMKM dengan detail berikut:

Tone: ${tone} (${toneDesc})
Tema Visual: ${theme} (${themeDesc})`;

  if (categoryOption) {
    prompt += `\nJenis Usaha: ${categoryOption.label} (${categoryOption.promptHint})`;
  }

  if (campaignType) {
    prompt += `\nTujuan Konten: ${campaignType} (${campaignDescriptions[campaignType]})`;
  }

  if (brandColor) {
    prompt += `\nWarna Brand: ${brandColor}`;
  }

  if (productName) {
    prompt += `\n\nNama Produk: ${productName}`;
  }

  if (description) {
    prompt += `\nDeskripsi produk: ${description}`;
  }

  const storeLines = [
    brandInfo?.storeName && `Nama toko: ${brandInfo.storeName}`,
    brandInfo?.location && `Lokasi: ${brandInfo.location}`,
    brandInfo?.contactInfo && `Kontak: ${brandInfo.contactInfo}`,
  ].filter(Boolean);
  if (storeLines.length) {
    prompt += `\n\nInfo toko (boleh dipakai di caption/whatsapp):\n${storeLines.join("\n")}`;
  }

  if (hasImage) {
    prompt += `\n\nAnalisa juga gambar produk yang diberikan untuk memahami produk lebih baik dan sesuaikan konten dengan visual produk.`;
  }

  const slide4 =
    promoMode === "promo"
      ? `MODE SLIDE 4: PROMO. Gunakan HANYA info promo dari user berikut, tanpa menambah angka/syarat baru: "${promoFacts || description || ""}". "highlightBadge" = inti promonya (mis. "DISKON 20%").`
      : `MODE SLIDE 4: VALUE (user TIDAK sedang promo). Isi dengan alasan kuat kenapa wajib coba sekarang: jaminan kualitas, keunikan, atau momen yang pas. DILARANG menyebut diskon/harga/gratis/batas waktu. "highlightBadge" berupa label nilai, mis. "FAVORIT", "FRESH", "HANDMADE".`;

  // Tujuan Edukasi memakai susunan sendiri: masalah → tips → tips lanjutan → produk sebagai solusi → CTA.
  // Tipe slide tetap sama (features/benefits) agar semua tema tetap bisa menampilkannya.
  const slideStructure =
    campaignType === "education"
      ? `STRUKTUR EDUKASI (menggantikan definisi slide 2 dan 3 di instruksi sistem; slide 1, 4, dan 5 tetap sesuai peran masing-masing):
1. "intro": masalah atau pertanyaan yang sering dialami pembeli; "subtitle" menjanjikan tips yang akan dibagikan.
2. "features": judul seperti "Tips Dasar"; 3 bullet berisi langkah/tips praktis yang bisa langsung dicoba.
3. "benefits": 3 bullet berisi tips lanjutan ATAU kesalahan umum yang perlu dihindari; isinya HARUS berbeda dari slide 2.
4. "promo": produk sebagai solusi dari masalah di slide 1, jelaskan singkat kenapa produk ini membantu. Tetap ikuti MODE SLIDE 4 di atas.
5. "cta": ajakan spesifik untuk mencoba/memesan produk.
Tips harus umum, aman, dan masuk akal. DILARANG klaim medis, janji hasil pasti, statistik, atau angka yang tidak ada di input user.
Caption: hook berupa masalah, 3 tips ringkas berawalan emoji, lalu 1 kalimat yang menyebut produk sebagai bantuan.`
      : `Slide 2 (features) dan slide 3 (benefits) harus berbeda isi: fakta vs dampak.`;

  prompt += `

${slide4}

Pastikan konten sesuai dengan tone "${tone}", tujuan "${campaignType ?? "umum"}", dan cocok untuk tema visual "${theme}".
${slideStructure}

Berikan output dalam format JSON berikut:
{
  "caption": "caption Instagram dengan hashtag di baris terakhir",
  "hashtags": ["#...", "#..."],
  "whatsappTemplate": "balasan admin WA ketika pembeli bertanya/memesan produk ini, ramah sesuai tone, maks ${L.whatsapp.maxChars} karakter",
  "slides": [
    { "type": "intro", "title": "...", "subtitle": "..." },
    { "type": "features", "title": "...", "bullets": ["...", "...", "..."] },
    { "type": "benefits", "title": "...", "bullets": ["...", "...", "..."] },
    { "type": "promo", "title": "...", "promoText": "...", "highlightBadge": "..." },
    { "type": "cta", "title": "...", "ctaText": "..." }
  ]
}`;

  return prompt;
}

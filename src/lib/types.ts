// Tone options for content generation
export type Tone = "playful" | "formal" | "elegan" | "lokal";

// Visual theme options
export type Theme = "Minimal Clean Modern" | "Dark Modern/Futuristic" | "Colorful Gen Z" | "Bold Typography";

// Format output: "square" = feed Instagram 1:1, "story" = Status WA & Story 9:16
export type SlideFormat = "square" | "story";

// Jenis usaha: menentukan tema default (lihat CATEGORY_OPTIONS di constants.ts)
export type ProductCategory = "kuliner" | "fashion" | "kecantikan" | "gadget" | "umum";

export type CampaignType = "promo" | "launch" | "education" | "bestseller";

// Mode Slide 4: "promo" = user memang menulis info promo, "value" = alasan wajib coba.
// Ditentukan oleh server (lib/promo.ts), bukan oleh AI.
export type PromoMode = "promo" | "value";

// Identitas toko/produk yang ditampilkan di slide (opsional, diisi user)
export interface BrandInfo {
  storeName?: string;   // Contoh: "Kopi Senja"
  priceText?: string;   // Contoh: "Mulai 18K" atau "Rp 25.000"
  promoBadge?: string;  // Contoh: "DISKON 20%" atau "PROMO"
  contactInfo?: string; // Contoh: "@kopisenja.id • WA 0812-3456-7890"
  location?: string;    // Contoh: "Bandung, Jawa Barat"
}

// Slide types
export interface SlideIntro {
  type: "intro";
  title: string;
  subtitle: string;
}

export interface SlideFeatures {
  type: "features";
  title: string;
  bullets: string[];
}

export interface SlideBenefits {
  type: "benefits";
  title: string;
  bullets: string[];
}

export interface SlidePromo {
  type: "promo";
  mode: PromoMode;         // Diisi server, bukan AI
  title: string;
  promoText: string;
  highlightBadge?: string; // Label stiker, mis. "FAVORIT" atau inti promo dari user
}

export interface SlideCTA {
  type: "cta";
  title: string;
  ctaText: string;
}

export type SlideContent =
  | SlideIntro
  | SlideFeatures
  | SlideBenefits
  | SlidePromo
  | SlideCTA;

// Generated content from AI
export interface GeneratedContent {
  caption: string;                 // Sudah berisi baris hashtag di akhir
  hashtags?: string[];             // Daftar hashtag terpisah (tab Hashtag)
  whatsappTemplate?: string;       // Balasan admin WA saat pembeli memesan
  slides: [SlideIntro, SlideFeatures, SlideBenefits, SlidePromo, SlideCTA];
}

// Server action response
export interface GenerateContentResponse {
  success: boolean;
  data?: GeneratedContent;
  error?: string;
}

// Form input for generate content
export interface GenerateContentInput {
  productName?: string;
  productImage: string; // base64 string
  description?: string;
  tone: Tone;
  theme: Theme;
  brandColor?: string; // hex color
  category?: ProductCategory;
  campaignType?: CampaignType;
  brandInfo?: BrandInfo;
}

// Preset produk contoh untuk tombol "Coba Contoh" (Tahap 2.1)
export interface SampleProduct {
  id: string;
  label: string;        // Nama singkat di tombol, mis. "Kopi Senja"
  productName: string;
  description: string;
  tone: Tone;
  category: ProductCategory;
  theme: Theme;
  brandColor: string;
  brandInfo: BrandInfo;
  imageColor: string;   // Warna latar gambar contoh yang dibuat di canvas
}

// Tone options for content generation
export type Tone = "playful" | "formal" | "elegan" | "lokal";

// Visual theme options
export type Theme = "Minimal Clean Modern" | "Dark Modern/Futuristic" | "Colorful Gen Z" | "Bold Typography";

export type CampaignType = "promo" | "launch" | "education" | "bestseller";

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
  caption: string;
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
  theme: Theme;
  brandColor: string;
  brandInfo: BrandInfo;
  imageColor: string;   // Warna latar gambar contoh yang dibuat di canvas
}

import type { GeneratedContent } from "./types";

// Carousel configuration
export const TOTAL_SLIDES = 5;
export const CAROUSEL_SLIDE_TYPES = [
  "intro",
  "features",
  "benefits",
  "promo",
  "cta",
] as const;

// Placeholder content for carousel preview
export const PLACEHOLDER_CONTENT: GeneratedContent = {
  caption: "",
  slides: [
    {
      type: "intro",
      title: "Judul Produk",
      subtitle: "Deskripsi singkat produk kamu di sini",
    },
    {
      type: "features",
      title: "Keunggulan",
      bullets: ["Fitur 1", "Fitur 2", "Fitur 3"],
    },
    {
      type: "benefits",
      title: "Manfaat",
      bullets: ["Manfaat 1", "Manfaat 2", "Manfaat 3"],
    },
    {
      type: "promo",
      title: "Promo Spesial",
      promoText: "Diskon khusus untuk kamu!",
    },
    {
      type: "cta",
      title: "Yuk Order!",
      ctaText: "Klik link di bio sekarang",
    },
  ],
};

// Default values for form
export const DEFAULT_BRAND_COLOR = "#3b82f6";
export const DEFAULT_TONE = "playful" as const;
export const DEFAULT_THEME = "Colorful Gen Z" as const;

// Validation constraints
export const VALIDATION = {
  MIN_IMAGE_SIZE: 100, // minimum base64 string length
  MAX_PRODUCT_NAME_LENGTH: 100,
  MAX_DESCRIPTION_LENGTH: 500,
  MIN_DESCRIPTION_LENGTH: 10,
} as const;

// Error messages
export const ERROR_MESSAGES = {
  NO_INPUT: "Minimal upload gambar atau isi deskripsi produk ya!",
  NO_RESPONSE: "Tidak ada response dari AI. Silahkan coba lagi.",
  INVALID_FORMAT: "Format response AI tidak valid. Silahkan coba lagi.",
  PARSE_ERROR: "Gagal parsing response AI. Silakan coba lagi.",
  INVALID_API_KEY: "API key tidak valid. Hubungi admin.",
  RATE_LIMIT: "Terlalu banyak request. Coba lagi dalam beberapa saat.",
  GENERIC_ERROR: "Terjadi kesalahan. Silakan coba lagi.",
  PRODUCT_NAME_TOO_LONG: "Nama produk terlalu panjang (max 100 karakter)",
  DESCRIPTION_TOO_LONG: "Deskripsi terlalu panjang (max 500 karakter)",
  DESCRIPTION_TOO_SHORT: "Deskripsi terlalu pendek (min 10 karakter)",
} as const;

// Loading messages
export const LOADING_MESSAGES = {
  GENERATING: "Generating...",
  LOADING_PREVIEW: "Loading preview...",
} as const;

// OpenAI/API configuration



import type { GeneratedContent, SampleProduct } from "./types";

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



// Produk contoh untuk tombol "Coba Contoh" di halaman generate.
// Deskripsi sengaja tanpa info promo agar mode Slide 4 = value.
export const SAMPLE_PRODUCTS: SampleProduct[] = [
  {
    id: "kopi-senja",
    label: "Kopi Senja",
    productName: "Kopi Gula Aren Senja",
    description:
      "Kopi gula aren khas Bandung, dibuat dari gula aren asli dan biji arabika pilihan. Rasanya manis legit dengan aroma karamel, cocok untuk teman ngopi santai. Tersedia dalam botol 250ml.",
    tone: "playful",
    theme: "Colorful Gen Z",
    brandColor: "#F59E0B",
    brandInfo: {
      storeName: "Kopi Senja",
      priceText: "Mulai 18K",
      contactInfo: "@kopisenja.id • WA 0812-3456-7890",
      location: "Bandung, Jawa Barat",
    },
    imageColor: "#7C4A2D",
  },
  {
    id: "dimsum-mentai",
    label: "Dimsum Mentai",
    productName: "Dimsum Mentai Ayam",
    description:
      "Dimsum ayam isi keju dengan saus mentai creamy yang gurih. Dikukus fresh setiap pesanan, cocok untuk camilan atau lauk makan siang. Isi 4 pcs per porsi.",
    tone: "lokal",
    theme: "Bold Typography",
    brandColor: "#EF4444",
    brandInfo: {
      storeName: "Dimsum Kak Lia",
      priceText: "Rp 15.000",
      contactInfo: "@dimsumkaklia • WA 0813-2222-3333",
      location: "Yogyakarta",
    },
    imageColor: "#F97316",
  },
  {
    id: "kaos-lokal",
    label: "Kaos Lokal",
    productName: "Kaos Nusantara Motif Batik",
    description:
      "Kaos katun combed 30s dengan sablon plastisol yang tahan lama. Desain motif batik modern, nyaman dipakai harian. Tersedia ukuran S sampai XXL.",
    tone: "lokal",
    theme: "Dark Modern/Futuristic",
    brandColor: "#22C55E",
    brandInfo: {
      storeName: "Kaos Nusantara",
      priceText: "Mulai 75K",
      contactInfo: "@kaosnusantara.id",
      location: "Bandung, Jawa Barat",
    },
    imageColor: "#166534",
  },
  {
    id: "skincare-alami",
    label: "Skincare Alami",
    productName: "Serum Lidah Buaya Niacinamide",
    description:
      "Serum wajah dengan ekstrak lidah buaya dan niacinamide, ringan untuk kulit berminyak. Tanpa paraben dan tanpa pewangi sintetis. Ukuran 30ml.",
    tone: "elegan",
    theme: "Minimal Clean Modern",
    brandColor: "#8FB8A0",
    brandInfo: {
      storeName: "Alami Skin",
      priceText: "Rp 89.000",
      contactInfo: "@alamiskin.id • WA 0815-4444-5555",
      location: "Jakarta Selatan",
    },
    imageColor: "#5B7F66",
  },
];

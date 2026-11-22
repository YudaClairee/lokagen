import type { CampaignType, GeneratedContent, ProductCategory, SampleProduct, SlideFormat, Theme } from "./types";

// Ukuran logis slide per format. Dikali pixelRatio 2 saat export:
// square → 1080x1080px, story → 1080x1920px.
export const SLIDE_FORMATS: Record<
  SlideFormat,
  { label: string; description: string; width: number; height: number }
> = {
  square: { label: "Feed 1:1", description: "Instagram feed", width: 540, height: 540 },
  story: { label: "Status & Story 9:16", description: "WA Status, Instagram Story", width: 540, height: 960 },
};

// Carousel configuration
export const TOTAL_SLIDES = 5;
export const CAROUSEL_SLIDE_TYPES = [
  "intro",
  "features",
  "benefits",
  "promo",
  "cta",
] as const;

// Batas teks: SATU-SATUNYA sumber untuk prompt AI, normalizeContent, dan fixture uji.
export const COPY_LIMITS = {
  title:          { minWords: 2, maxWords: 4,  maxChars: 25 },
  subtitle:       { minWords: 6, maxWords: 12, maxChars: 75 },
  bullet:         { minWords: 3, maxWords: 7,  maxChars: 48 },
  bulletCount:    3,
  promoText:      { minWords: 5, maxWords: 10, maxChars: 65 },
  highlightBadge: { minWords: 1, maxWords: 2,  maxChars: 12 },
  ctaText:        { minWords: 4, maxWords: 8,  maxChars: 50 },
  whatsapp:       { maxChars: 500 },
  hashtagCount:   { min: 8, max: 10 },
} as const;

// Tujuan konten (Tahap 3.1 poin 5)
export const CAMPAIGN_OPTIONS: { value: CampaignType; label: string; description: string }[] = [
  { value: "promo", label: "Promo / Diskon", description: "Penawaran spesial (isi detail promo di Harga / Label Promo)" },
  { value: "launch", label: "Launching Produk", description: "Produk baru hadir di toko" },
  { value: "education", label: "Edukasi / Tips", description: "Masalah → tips → produk sebagai solusi" },
  { value: "bestseller", label: "Terlaris / Unggulan", description: "Kualitas unggulan produk" },
];

// Jenis usaha (Tahap 6): memilih tema default otomatis. Pengguna tetap bisa mengganti tema.
// promptHint dipakai untuk menyesuaikan gaya teks AI.
export const CATEGORY_OPTIONS: {
  value: ProductCategory;
  label: string;
  description: string;
  defaultTheme: Theme;
  promptHint: string;
}[] = [
  {
    value: "kuliner",
    label: "Kuliner",
    description: "Makanan & minuman",
    defaultTheme: "Colorful Gen Z",
    promptHint: "makanan/minuman: tonjolkan rasa, aroma, tekstur, dan momen menikmatinya",
  },
  {
    value: "fashion",
    label: "Fashion & Kerajinan",
    description: "Pakaian, batik, tas, kerajinan tangan",
    defaultTheme: "Bold Typography",
    promptHint: "fashion/kerajinan: tonjolkan bahan, motif, detail pengerjaan, dan gaya pemakaian",
  },
  {
    value: "kecantikan",
    label: "Kecantikan & Perawatan",
    description: "Skincare, herbal, perawatan diri",
    defaultTheme: "Minimal Clean Modern",
    promptHint: "kecantikan/perawatan: tonjolkan kandungan, manfaat untuk kulit/tubuh, dan cara pakai",
  },
  {
    value: "gadget",
    label: "Gadget & Streetwear",
    description: "Aksesoris, gadget, produk bergaya",
    defaultTheme: "Dark Modern/Futuristic",
    promptHint: "gadget/streetwear: tonjolkan spesifikasi, gaya, dan kesan premium",
  },
  {
    value: "umum",
    label: "Umum / Lainnya",
    description: "Jasa atau produk lain",
    defaultTheme: "Colorful Gen Z",
    promptHint: "umum: fokus pada manfaat praktis bagi pembeli",
  },
];

export const DEFAULT_CATEGORY: ProductCategory = "umum";

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
      mode: "value",
      title: "Wajib Coba!",
      promoText: "Dibuat fresh setiap hari, rasa konsisten",
      highlightBadge: "FAVORIT",
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
  UNAUTHORIZED: "Sesi login habis. Silakan login ulang.",
  NOT_CONFIGURED: "Server belum dikonfigurasi (AUTH_PASSWORD kosong). Hubungi admin.",
} as const;

// Loading messages
export const LOADING_MESSAGES = {
  GENERATING: "Generating...",
  LOADING_PREVIEW: "Loading preview...",
} as const;

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
    category: "kuliner",
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
    category: "kuliner",
    theme: "Colorful Gen Z",
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
    category: "fashion",
    theme: "Bold Typography",
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
    category: "kecantikan",
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

# LokaGen — Engineering Implementation Plan

Dokumen ini adalah pedoman teknis (*engineering blueprint*) untuk mengembangkan **LokaGen** dari MVP Hackathon menjadi produk siap pakai untuk UMKM. Setiap tahap dilengkapi dengan lokasi file, nomor baris, kontrak tipe data TypeScript, spesifikasi teknis, dan kriteria selesai (*Definition of Done*).

---

## 0. Peta Masalah & Temuan Audit Kode (Exact File & Line Mapping)

| ID | File | Baris | Masalah Aktual di Kode | Dampak ke User |
| :--- | :--- | :--- | :--- | :--- |
| **BUG-01** | `src/components/carousel/CarouselPreview.tsx` | L101–103 | Hanya merender `{slideComponents[currentSlide]}`. Slide lain tidak ada di DOM (`slideRefs.current` berisi `null` untuk 4 slide lainnya). | Tombol **Download Slide** hanya mengunduh 1 slide yang sedang aktif. |
| **BUG-02** | `src/components/generate/DownloadButton.tsx` | L33 | Nama file hasil unduhan statis `link.download = "lokagen-slide.png"`. | File saling menimpa atau namanya tidak berurutan (`slide-1` s/d `5`). |
| **BUG-03** | `src/components/carousel/CarouselPreview.tsx` | L58–85 | Prop `productImage` hanya dikirim ke `SlideIntro`, tidak dikirim ke `SlideFeatures`, `SlideBenefits`, `SlidePromo`, dan `SlideCTA`. | Di `minimal-clean/SlidePromo.tsx` (L39–54) muncul kotak kosong bertuliskan `"PRODUCT"` walau user sudah upload foto. |
| **BUG-04** | `src/components/carousel/themes/minimal-clean/SlideIntro.tsx` | L34 | Merender `{productName \|\| "NEW PRODUCT"}` sebagai judul utama, sedangkan `data.title` dari AI diabaikan. | Judul *hook* hasil AI pada Slide 1 tema *Minimal Clean* tidak pernah tampil. |
| **BUG-05** | `src/components/carousel/themes/minimal-clean/SlidePromo.tsx` | L57–60 | Badge hardcoded bertuliskan `DISKON` `30%`. | Berbahaya bagi UMKM jika promo mereka bukan diskon 30%. |
| **BUG-06** | `src/components/carousel/themes/colorful-genz/SlideIntro.tsx` | L75, L81–85, L92 | Hardcoded `MAKAN PAGI, SIANG, MALAM HEMATNYA DI SINI`, `HARGA MULAI 12K`, dan `MENERIMA PESANAN ONLINE`. | Tidak relevan untuk produk non-makanan atau harga selain 12K. |
| **BUG-07** | `src/components/carousel/themes/colorful-genz/SlidePromo.tsx` | L75–76 | Footer hardcoded `TAWANG, KOTA TASIKMALAYA`. | Konten tidak bisa dipakai oleh UMKM di luar lokasi tersebut. |
| **BUG-08** | `src/components/carousel/themes/colorful-genz/{SlideFeatures,SlideBenefits,SlideCTA}.tsx` | L74–78 | Footer kanan hardcoded `LOKAGEN APP`. | Terlihat seperti watermark aplikasi demo, bukan identitas toko UMKM. |
| **BUG-09** | `src/components/carousel/themes/minimal-clean/{SlideIntro,SlideBenefits}.tsx` | L67, L93 | Footer hardcoded `WWW.LOKAGEN.COM`. | Membawa nama domain aplikasi, bukan akun IG/kontak toko UMKM. |
| **BUG-10** | `src/components/generate/ProductForm.tsx` | L38–48 | Gambar hingga 5MB langsung diubah ke Base64 tanpa kompresi dan dikirim ke Server Action. | Melewati batas default body size Server Action Next.js (1MB) & memperlambat AI Vision. |
| **BUG-11** | `src/lib/openai.ts` | L14–18 | Prompt memaksa Slide 4 selalu menjadi "Promo/Penawaran spesial" dan belum membedakan fokus Slide 2 (*Features*) vs Slide 3 (*Benefits*). | AI sering mengarang angka diskon palsu padahal penjual tidak sedang promo, dan isi Slide 2 & 3 terasa berulang. |
| **BUG-12** | `src/components/carousel/themes/bold-typography/SlideIntro.tsx` & `colorful-genz/SlidePromo.tsx` | L26–30, L68 | `bold-typography/SlideIntro` memecah setiap kata menjadi baris baru berukuran `text-[60px]`; `colorful-genz/SlidePromo` merender `promoText` (maks 15 kata) dengan `text-4xl`. | Judul 4–5 kata menabrak elemen di bawahnya dan teks promo meluber keluar kotak (*text overflow*). |
| **BUG-13** | `src/lib/openai.ts` & `src/app/actions/generate-content.ts` | L23, L51 | Prompt caption tidak mengatur struktur paragraf (`\n\n`), dan Vision menggunakan `detail: "low"`. | Caption menjadi 1 paragraf rapat yang sulit dibaca di IG, dan teks kecil pada kemasan produk di foto kurang terbaca AI. |
| **BUG-14** | `src/components/carousel/themes/bold-typography/SlideCTA.tsx` | L35–45 | Sama seperti BUG-12 tetapi lebih parah: `data.title.split(" ")` per kata dengan `text-7xl`. | Judul CTA 3+ kata langsung mendorong tombol "ORDER NOW" dan footer keluar dari slide. |
| **BUG-15** | `bold-typography/{SlideFeatures,SlideBenefits}.tsx`, `dark-futuristic/SlideBenefits.tsx` | Features L26–28 & L50; Benefits L33–37 & L60; Dark Benefits L42–45 | Heading utama hardcoded (`FEATURES`, `WHY CHOOSE US?`, `Analysis Report`). `data.title` hanya muncul kecil di marquee/tag, atau **tidak dirender sama sekali** (dark-futuristic Benefits). | Judul Slide 2/3 hasil AI hilang, dan heading berbahasa Inggris tidak cocok dengan tone lokal. |
| **BUG-16** | `colorful-genz/SlidePromo.tsx` L39–47, `bold-typography/SlidePromo.tsx` L44–48, `dark-futuristic/SlidePromo.tsx` L43–49, `minimal-clean/SlidePromo.tsx` L62–65 | — | Label promo/urgensi hardcoded: `PROMO`, `Limited Offer`, `Time_Limited_Event`, `ORDER NOW`. | Walaupun prompt sudah anti-halusinasi, Slide 4 tetap *terlihat* seperti promo palsu ketika user tidak sedang promo. |
| **BUG-17** | `src/components/carousel/themes/dark-futuristic/SlideIntro.tsx` | L65, L74 | Judul memakai `font-mono text-4xl` di kolom `w-[55%]` (≈12 karakter per baris). | Judul 20–25 karakter jadi 3–4 baris dan menekan subtitle ke bawah. |
| **BUG-18** | `src/app/actions/generate-content.ts` | L94–105 | Hasil AI hanya dicek jumlah slide. Tidak ada validasi panjang teks, jumlah bullet, tipe slide, maupun deteksi angka diskon karangan. | Satu respons AI yang "nakal" langsung merusak layout, dan diskon palsu tetap tampil walau prompt sudah melarangnya. |

---

## Tahap 0: Migrasi AI Provider ke OpenRouter (Kerjakan Paling Awal)

> **Keputusan:** Provider AI berpindah dari Kolosal ke **OpenRouter** dengan model **`deepseek/deepseek-v4.1-flash-1017`**. Semua rujukan "Kolosal" di tahap lain dibaca sebagai OpenRouter.
>
> **Hasil verifikasi katalog OpenRouter (`GET https://openrouter.ai/api/v1/models`):** model tersedia, `input_modalities = [text, image]` (Vision didukung), `response_format` didukung, konteks ±1M token, harga ±$0,15 / 1M token input dan ±$0,60 / 1M token output. Slug model dapat berubah, jadi ulangi pengecekan ini jika request mulai gagal dengan error "model not found".

### 0.1. Variabel Environment

| Variabel | Wajib | Contoh / Keterangan |
| :--- | :--- | :--- |
| `OPENROUTER_API_KEY` | Ya | Menggantikan `KOLOSAL_API_KEY`. |
| `AI_MODEL` | Tidak | Default `deepseek/deepseek-v4.1-flash-1017`. Memudahkan ganti model tanpa edit kode (berguna untuk uji 5.6). |
| `AUTH_PASSWORD` | Ya | Hapus fallback hardcoded `"lokagen2024"` di `middleware.ts` L5 dan `login/route.ts` L4 (lihat Tahap 4.3). |

Buat `.env.example` (tanpa nilai asli) dan tambahkan `!.env.example` ke `.gitignore` karena pola `.env*` saat ini ikut mengabaikannya.

### 0.2. Perubahan Kode

- **`src/lib/openai.ts` (L4–7):**
  ```ts
  export const AI_MODEL = process.env.AI_MODEL || "deepseek/deepseek-v4.1-flash-1017";

  export const openai = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
  });
  ```
- **`src/app/actions/generate-content.ts` (L71):** ganti `model: "Claude Sonnet 4.5"` menjadi `model: AI_MODEL`.
- Jangan mengirim data pribadi user pada header opsional `HTTP-Referer` / `X-Title`. Cukup dihilangkan.

### 0.3. Risiko Khusus Model DeepSeek Flash & Mitigasinya

Model ini murah dan cepat, tetapi kepatuhan instruksinya harus dibuktikan lewat uji, bukan diasumsikan.

| Risiko | Mitigasi |
| :--- | :--- |
| Tidak patuh batas karakter (`COPY_LIMITS`) | Sudah ditangani `clampText` di `normalizeContent` (5.4). Pantau jumlah `warnings` saat uji. |
| Mengarang diskon/harga walau dilarang | Lapis kedua di `normalizeContent` (5.4 poin 5) + `resolvePromoMode` (5.2). |
| Output JSON dibungkus markdown atau ada teks tambahan | Pertahankan pembersih fence markdown. Aktifkan `response_format: { type: "json_object" }` (didukung model ini). |
| Bahasa Indonesia terasa kaku pada tone `lokal`/`playful` | Nilai lewat uji manual 5.6. Jika buruk, ganti `AI_MODEL` ke kandidat lain tanpa ubah kode. |
| Kualitas Vision (membaca teks kemasan) belum teruji | Uji dengan foto berlabel pada `detail: "auto"`. Jika gagal, naikkan ke `detail: "high"` atau ganti model. |
| Provider upstream OpenRouter berubah/down | Opsional: set `provider.order` / fallback di body request. Catat `usage` dan `model` dari response untuk audit biaya. |
| Saldo kredit terkuras bila endpoint diserang | Atur *spending limit* di dashboard OpenRouter dan selesaikan Tahap 4.3 (proteksi Server Action). |

#### Kriteria Selesai Tahap 0 (*Definition of Done*):
- [ ] `KOLOSAL_API_KEY` tidak lagi dirujuk di kode (`grep -r KOLOSAL src middleware.ts` kosong).
- [ ] Generate dengan foto + deskripsi berhasil lewat OpenRouter dan menghasilkan 5 slide valid.
- [ ] Nama model dibaca dari `AI_MODEL` dengan default `deepseek/deepseek-v4.1-flash-1017`.
- [ ] `.env.example` ada di repo dan tidak berisi secret.

---

## Tahap 1: Perbaikan Kritis, Kontrak Data Baru & Dinamisasi Slide

### 1.1. Pembaruan Kontrak Tipe Data (`types.ts`)

#### A. Edit `src/lib/types.ts`
Tambahkan tipe `CampaignType`, informasi identitas toko/produk (`BrandInfo`), serta perluas `SlidePromo` dan `GeneratedContent`:

```ts
export type Tone = "playful" | "formal" | "elegan" | "lokal";

export type Theme =
  | "Minimal Clean Modern"
  | "Dark Modern/Futuristic"
  | "Colorful Gen Z"
  | "Bold Typography";

export type CampaignType = "promo" | "launch" | "education" | "bestseller";

export interface BrandInfo {
  storeName?: string;   // Contoh: "Kopi Senja"
  priceText?: string;   // Contoh: "Mulai 18K" atau "Rp 25.000"
  promoBadge?: string;  // Contoh: "DISKON 20%" atau "PROMO"
  contactInfo?: string; // Contoh: "@kopisenja.id • WA 0812-3456-7890"
  location?: string;    // Contoh: "Bandung, Jawa Barat"
}

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
  highlightBadge?: string; // Menggantikan hardcoded "30%" / "LIMITED!"
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

export interface GeneratedContent {
  caption: string;
  hashtags?: string[];
  whatsappTemplate?: string;
  slides: [SlideIntro, SlideFeatures, SlideBenefits, SlidePromo, SlideCTA];
}

export interface GenerateContentInput {
  productName?: string;
  productImage: string;
  description?: string;
  tone: Tone;
  theme: Theme;
  brandColor?: string;
  campaignType?: CampaignType;
  brandInfo?: BrandInfo;
}
```

#### B. Edit `src/components/carousel/themes/types.ts`
Buat `BaseSlideProps` agar seluruh 5 jenis slide menerima `productName`, `brandColor`, `productImage`, `brandInfo`, dan `isPlaceholder` secara konsisten:

```ts
import type {
  SlideIntro,
  SlideFeatures,
  SlideBenefits,
  SlidePromo,
  SlideCTA,
  BrandInfo,
} from "@/lib/types";

export interface BaseSlideProps {
  productName?: string;
  brandColor: string;
  productImage?: string;
  brandInfo?: BrandInfo;
  isPlaceholder?: boolean;
}

export interface SlideIntroProps extends BaseSlideProps {
  data: SlideIntro;
}

export interface SlideFeaturesProps extends BaseSlideProps {
  data: SlideFeatures;
}

export interface SlideBenefitsProps extends BaseSlideProps {
  data: SlideBenefits;
}

export interface SlidePromoProps extends BaseSlideProps {
  data: SlidePromo;
}

export interface SlideCTAProps extends BaseSlideProps {
  data: SlideCTA;
}
```

---

### 1.2. Perbaikan Render 5 Slide & Download Multi-Slide

#### A. Spesifikasi Teknis `src/components/carousel/CarouselPreview.tsx`
- **Jangan gunakan `display: none` (`hidden`)** untuk slide yang tidak aktif karena `html-to-image` (`toPng`) gagal merender elemen dengan dimensi `0x0`.
- **Cara yang benar:**
  1. Render slide yang sedang aktif (`currentSlide`) di area preview utama untuk dilihat user (atau gunakan CSS carousel track).
  2. Render kelima slide sekaligus di dalam container khusus *export* yang selalu berada di DOM dengan ukuran tetap (misal `w-[540px] h-[540px]`), diposisikan menggunakan:
     ```tsx
     <div
       aria-hidden="true"
       className="pointer-events-none fixed -left-[9999px] top-0 z-[-1] opacity-100"
     >
       {slideComponents.map((slide, idx) => (
         <div key={idx} className="w-[540px] h-[540px]">
           {slide}
         </div>
       ))}
     </div>
     ```
     Dengan pendekatan ini:
     - Semua `slideRefs.current[0..4]` selalu terpasang (*mounted*) dengan resolusi konsisten (`540x540` × `pixelRatio: 2` = **`1080x1080px` standar Instagram**), tidak peduli ukuran layar HP/laptop user saat menekan tombol Download!
     - Di area preview utama, komponen slide tidak perlu memegang `ref` duplikat.
  3. Teruskan `productName`, `brandColor`, `productImage`, `brandInfo`, dan `isPlaceholder={false}` ke kelima komponen di dalam container *export*.

#### B. Spesifikasi Teknis `src/components/generate/DownloadButton.tsx`
- Tambahkan prop `productName?: string` dan `currentSlide: number`.
- Buat helper pembuat slug: `const slug = (productName || "lokagen").toLowerCase().replace(/[^a-z0-9]+/g, "-");`
- Sediakan 2 tombol aksi:
  1. **Download Slide Ini** → Hanya memanggil `toPng(slideRefs.current[currentSlide])` dan mengunduh `${slug}-slide-${currentSlide + 1}.png`.
  2. **Download Semua (5 Slide)** → Melakukan iterasi `i = 0..4` pada `slideRefs.current[i]`, memanggil `toPng` dengan `{ quality: 1, pixelRatio: 2, cacheBust: true }`, dan mengunduh `${slug}-slide-${i + 1}.png`.

---

### 1.3. Pembersihan Teks Hardcoded di Seluruh 20 Komponen Slide

Berikut pedoman penggantian di setiap file tema:

1. **`colorful-genz/SlideIntro.tsx`**
   - Baris 75: Ganti `productName || 'MAKAN PAGI, SIANG, MALAM HEMATNYA DI SINI'` menjadi `productName || brandInfo?.storeName || data.subtitle`.
   - Baris 79–86 (Kotak Harga): Jika `brandInfo?.priceText` diisi, tampilkan `HARGA` & `{brandInfo.priceText}`. Jika kosong, tampilkan `brandInfo?.promoBadge || "TERBAIK"` (jangan tampilkan `"12K"`).
   - Baris 91–94 (Footer): Kiri menampilkan `brandInfo?.storeName || productName || "PRODUK LOKAL"`, kanan menampilkan `brandInfo?.contactInfo || brandInfo?.location || ""`.
2. **`colorful-genz/SlideFeatures.tsx`, `SlideBenefits.tsx`, `SlideCTA.tsx`**
   - Baris 72–78 (Footer): Ganti kiri dengan `brandInfo?.storeName || productName || "INFO PRODUK"` dan kanan dengan `brandInfo?.contactInfo || brandInfo?.location || ""` (hapus `"LOKAGEN APP"`).
3. **`colorful-genz/SlidePromo.tsx`**
   - Baris 64: Ganti `"LIMITED!"` dengan `data.highlightBadge || brandInfo?.promoBadge || "SPESIAL!"`.
   - Baris 74–77 (Footer): Ganti `"TAWANG, KOTA TASIKMALAYA"` dengan `brandInfo?.location || brandInfo?.contactInfo || brandInfo?.storeName || ""`.
4. **`minimal-clean/SlideIntro.tsx`**
   - Baris 27–35: Tampilkan `{data.title}` sebagai heading utama (`<h1>`), dan tampilkan `productName || brandInfo?.storeName` sebagai *badge* kecil di atasnya.
   - Baris 66–68: Ganti `"WWW.LOKAGEN.COM"` dengan `brandInfo?.contactInfo || brandInfo?.storeName || productName || ""`.
5. **`minimal-clean/SlideBenefits.tsx`**
   - Baris 93: Ganti `"WWW.LOKAGEN.COM"` dengan `brandInfo?.contactInfo || brandInfo?.storeName || productName || ""`.
6. **`minimal-clean/SlidePromo.tsx`**
   - Baris 57–60: Ganti hardcoded `DISKON` / `30%` menjadi `brandInfo?.priceText || data.highlightBadge || "SPESIAL"`.

---

### 1.4. Kompresi Gambar Client-Side & Validasi Input

#### A. Tambahkan fungsi di `src/lib/utils.ts`
```ts
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
```

#### B. Update `src/components/generate/ProductForm.tsx`
- Panggil `compressImageFile(file)` saat unggah gambar sehingga ukuran Base64 turun dari ~5MB menjadi ~150–250KB.
- Tambahkan input opsional ringkas (dalam *collapsible* atau *grid* 2 kolom):
  - **Harga / Label Promo** (`priceText`, contoh: *"Rp 25.000"* / *"Mulai 15K"*)
  - **Nama Toko / Kontak IG & WA** (`contactInfo`, contoh: *"@kopisenja • WA 0812xxx"*)
- Tambahkan `maxLength={VALIDATION.MAX_PRODUCT_NAME_LENGTH}` dan `maxLength={VALIDATION.MAX_DESCRIPTION_LENGTH}` beserta penghitung karakter (`{description.length}/500`).

---

### 1.5. Anti-Overflow & Tipografi Adaptif pada Komponen Slide

Agar teks hasil generate AI tidak pernah keluar dari kotak atau saling menabrak:

1. **`src/components/carousel/themes/bold-typography/SlideIntro.tsx` (L25–37)**
   - **Masalah:** `data.title.split(" ")` membuat setiap kata menjadi 1 baris vertikal `text-[60px]`. Jika judul terdiri dari 4–5 kata, tingginya mencapai >250px dan menabrak foto produk.
   - **Perbaikan:**
     - Jangan pecah per kata jika jumlah kata > 3, atau gunakan ukuran font dinamis berdasarkan panjang karakter `data.title.length`:
       ```tsx
       const titleSizeClass =
         data.title.length > 22
           ? "text-3xl leading-tight"
           : data.title.length > 14
           ? "text-4xl leading-[0.95]"
           : "text-5xl leading-[0.9]";
       ```
     - Batasi lebar kontainer teks dengan `max-w-[65%]` di bagian bawah agar tidak pernah bertabrakan dengan kotak gambar di kanan bawah (`bottom-10 right-10`).

2. **`src/components/carousel/themes/colorful-genz/SlidePromo.tsx` (L67–71)**
   - **Masalah:** `data.promoText` di-render dengan `text-4xl` statis.
   - **Perbaikan:** Gunakan ukuran adaptif berdasarkan panjang karakter:
     ```tsx
     const promoTextSize =
       data.promoText.length > 45
         ? "text-xl"
         : data.promoText.length > 25
         ? "text-2xl"
         : "text-3xl";
     ```

3. **`src/components/carousel/themes/colorful-genz/SlideIntro.tsx` (L28–37)**
   - **Perbaikan:** Gunakan `text-3xl sm:text-4xl line-clamp-2` jika `data.title.length > 18` agar bagian header atas tidak menekan area foto produk di tengah.

#### Kriteria Selesai Tahap 1 (*Definition of Done*):
- [ ] Klik "Download Semua" mengunduh 5 file PNG berukuran `1080x1080px` dengan nama berurutan.
- [ ] Tidak ada lagi kata `TASIKMALAYA`, `12K`, `30%`, atau `LOKAGEN` di hasil gambar yang diunduh.
- [ ] Gambar produk tampil di semua slide yang mendukung gambar (termasuk `SlidePromo` dan `SlideCTA`).
- [ ] Teks panjang dari AI otomatis menyesuaikan ukuran font dan tidak pernah keluar kotak (*no text overflow*).
- [ ] Upload foto berukuran 4MB otomatis dikompresi <300KB dan tidak memicu error di Server Action.

---

## Tahap 2: Pengalaman Pengguna Siap Pakai (Core UX Upgrade)

### 2.1. Fitur "Coba Contoh Produk (1-Click Sample)"
- **Lokasi File:** `src/lib/constants.ts` & `src/app/generate/page.tsx`
- **Spesifikasi:**
  - Buat array `SAMPLE_PRODUCTS` di `src/lib/constants.ts` berisi 4 preset UMKM (Kopi Gula Aren, Dimsum Mentai, Kaos Lokal, Skincare Alami) lengkap dengan `productName`, `description`, `tone`, `theme`, `brandColor`, dan `brandInfo`.
  - Buat gambar SVG/Canvas data URL ringan atau gunakan aset lokal untuk contoh produk agar user bisa langsung klik tombol **"✨ Coba Contoh: Kopi Senja"** di atas form dan melihat seluruh form + preview langsung terisi.

### 2.2. Inline Editor untuk Teks Slide & Caption
- **Lokasi File:**
  - Buat komponen baru `src/components/generate/SlideTextEditor.tsx`
  - Edit `src/app/generate/page.tsx` dan `src/components/generate/CaptionDisplay.tsx`
- **Spesifikasi:**
  - Di bawah `CarouselPreview`, tambahkan panel ringkas **"Edit Teks Slide #{currentSlide + 1}"** yang hanya muncul ketika `result` sudah ada (atau saat user mengaktifkan mode kustomisasi).
  - Ketika user mengubah `title`, `subtitle`, `bullets[i]`, `promoText`, atau `ctaText` di input tersebut, state `result` di `GeneratePage` langsung diperbarui secara *real-time* dan tercermin pada gambar slide yang akan diunduh.
  - Di `CaptionDisplay.tsx`, ubah tampilan `<p>` statis menjadi `<Textarea>` yang bisa langsung diedit sebelum klik tombol **Salin**.

### 2.3. Mode Tampilan: Single Carousel vs Grid 5 Slide
- **Lokasi File:** `src/components/carousel/CarouselPreview.tsx`
- **Spesifikasi:**
  - Tambahkan tab kecil di pojok atas preview: `[ 📱 Tampilan Slide ]` dan `[ ⊞ Lihat Semua (5) ]`.
  - Pada mode **Lihat Semua (5)**, tampilkan kelima slide dalam grid `grid-cols-2 sm:grid-cols-3 gap-3`. Klik pada salah satu slide akan memilih slide tersebut untuk diedit.

#### Kriteria Selesai Tahap 2 (*Definition of Done*):
- [ ] User baru dapat mencoba aplikasi dalam 1 klik lewat tombol *Sample Product* tanpa harus mengetik manual.
- [ ] Semua teks pada 5 slide dan caption hasil AI dapat diedit manual oleh user dan hasil editnya ikut ter-render saat di-download sebagai PNG.
- [ ] User dapat melihat ke-5 slide sekaligus dalam tampilan Grid.

---

## Tahap 3: Kemampuan AI & Variasi Konten Pemasaran

### 3.1. Upgrade `SYSTEM_PROMPT`, Anti-Halusinasi Promo & Copywriting Framework (`src/lib/openai.ts`)
- **Lokasi File:** `src/lib/openai.ts`, `src/app/actions/generate-content.ts`, `src/components/generate/GenerateOptions.tsx`
- **Spesifikasi Pembaruan Prompt AI (`SYSTEM_PROMPT`):**
  1. **Pemisahan Tegas Slide 2 vs Slide 3 (Agar Tidak Berulang):**
     - **Slide 2 (`features`):** Fokus pada **Fakta & Spesifikasi Produk** (bahan baku, varian, ukuran, keaslian, proses pembuatan, atau kualitas kemasan).
     - **Slide 3 (`benefits`):** Fokus pada **Manfaat & Dampak bagi Pembeli** (solusi masalah, rasa/pengalaman yang didapat, hemat waktu/biaya, cocok untuk momen apa).
  2. **Aturan Anti-Halusinasi Harga & Promo pada Slide 4 (`promo`):**
     - Instruksikan dengan tegas: *"JANGAN PERNAH mengarang angka diskon (seperti Diskon 20%, Beli 1 Gratis 1) atau harga spesifik jika user tidak menuliskannya di input. Jika user tidak menyertakan info promo/diskon, isi Slide 4 dengan Value Proposition / Garansi Kualitas / Alasan Kenapa Wajib Coba Sekarang."*
  3. **Batas Panjang Kata Ketat (Sinkron dengan Layout CSS Slide):**
     - `title` tiap slide: **2–4 kata** (maksimal 25 karakter) agar punchy dan tidak meluber.
     - `subtitle` (Slide 1): **6–12 kata** (maksimal 75 karakter).
     - `bullets` (Slide 2 & 3): tepat **3 poin**, masing-masing **4–7 kata** (maksimal 48 karakter per poin).
     - `promoText` (Slide 4): **5–10 kata** (maksimal 65 karakter).
     - `highlightBadge` (Slide 4): **1–2 kata** (maksimal 12 karakter, misal: `"FAVORIT!"`, `"BEST VALUE"`, atau sesuai promo user).
     - `ctaText` (Slide 5): **4–8 kata** (maksimal 50 karakter).
  4. **Struktur Caption Instagram Profesional (Siap Copy-Paste):**
     - Wajib menggunakan jeda baris (`\n\n`) dengan urutan:
       - **Baris 1 (Hook):** Kalimat pembuka yang memancing rasa penasaran.
       - **Paragraf 2 (Story/Value):** Penjelasan singkat keunggulan produk + 3 poin ber-emoji.
       - **Paragraf 3 (CTA & Info Order):** Ajakan order yang ramah sesuai tone.
  5. **Pilihan Tujuan Konten (`CampaignType`) di `GenerateOptions.tsx`:**
     - `promo`: Promo / Diskon Spesial
     - `launch`: Launching Produk Baru
     - `education`: Edukasi / Tips & Solusi
     - `bestseller`: Produk Terlaris / Kualitas Unggulan
  6. **Peningkatan Kualitas Vision (`src/app/actions/generate-content.ts` L51):**
     - Ubah `detail: "low"` menjadi `detail: "auto"` (karena gambar sudah dikompresi ke maks 1080px di Tahap 1.4, sehingga AI tetap hemat token namun bisa membaca teks pada label/kemasan produk UMKM).
  7. **Output JSON Tambahan:**
     - `hashtags`: array berisi 8–10 hashtag relevan (kombinasi hashtag produk + `#UMKMLokal` dsb.)
     - `whatsappTemplate`: teks template balasan admin WA ketika pembeli menghubungi toko untuk memesan produk tersebut.

### 3.2. Ekstraksi Palet Warna Otomatis dari Foto Produk
- **Lokasi File:** `src/lib/utils.ts`, `src/components/generate/GenerateOptions.tsx`
- **Spesifikasi:**
  - Buat fungsi `extractDominantColors(dataUrl: string, count = 5): Promise<string[]>` di `src/lib/utils.ts` dengan men-sampling piksel gambar pada `<canvas>` berukuran `32x32` dan mengelompokkan warna yang paling kontras/cerah dalam format Hex (`#rrggbb`).
  - Simpan palet warna hasil ekstraksi di state `suggestedColors: string[]` pada `GeneratePage` dan tampilkan sebagai deretan tombol warna bulat di `GenerateOptions.tsx` supaya user tinggal klik salah satu warna yang senada dengan foto produknya.

### 3.3. Tab Copywriting Lengkap (Caption + Hashtag + Balasan Admin WA)
- **Lokasi File:** `src/components/generate/CaptionDisplay.tsx`
- **Spesifikasi:**
  - Kembangkan `CaptionDisplay.tsx` menjadi 3 tab:
    1. **Caption IG** (bisa diedit + tombol *Salin Caption* & *Salin Caption + Hashtag*)
    2. **Hashtag** (daftar *pill* hashtag + tombol *Salin Semua Hashtag*)
    3. **Template Balasan WA** (teks siap pakai untuk admin toko saat pembeli chat ke WhatsApp).

#### Kriteria Selesai Tahap 3 (*Definition of Done*):
- [ ] Mengubah *Campaign Type* menghasilkan gaya bahasa dan sudut pandang konten yang berbeda.
- [ ] Saat foto produk diunggah, muncul minimal 4 rekomendasi warna brand otomatis dari foto.
- [ ] Tersedia tab Caption, Hashtag, dan Template WA dengan tombol *Copy* masing-masing.

---

## Tahap 4: Penyimpanan Lokal (`localStorage`), Landing Page & Keamanan

### 4.1. Simpan Otomatis Profil Toko & Riwayat Konten
- **Lokasi File:** `src/app/generate/page.tsx`
- **Spesifikasi:**
  - Gunakan `localStorage` dengan key:
    - `lokagen_brand_profile`: menyimpan `{ storeName, contactInfo, location, brandColor, tone, theme }` setiap kali berubah.
    - `lokagen_history`: menyimpan maksimal 5 item riwayat terakhir `{ id, timestamp, productName, tone, theme, brandColor, brandInfo, result }` (tanpa menyimpan Base64 gambar berukuran besar agar tidak memenuhi kuota 5MB `localStorage`).
  - Tambahkan drawer/dropdown **"Riwayat Konten"** di header `/generate` untuk memuat kembali hasil *generate* sebelumnya.

### 4.2. Pengaktifan `<SocialProof />` & Demo Interaktif di Landing Page
- **Lokasi File:** `src/app/page.tsx`, `src/components/landing/SocialProof.tsx`
- **Spesifikasi:**
  - Periksa dan perbaiki `src/components/landing/SocialProof.tsx`, lalu aktifkan kembali di `src/app/page.tsx` (baris 31).
  - Tampilkan perbandingan visual bagaimana 1 foto produk sederhana berubah menjadi 4 gaya tema visual (*Colorful Gen Z*, *Minimal Clean*, *Dark Futuristic*, *Bold Typography*).

### 4.3. Keamanan Autentikasi & Proteksi Server Action
- **Lokasi File:** `middleware.ts`, `src/app/api/auth/login/route.ts`, `src/app/actions/generate-content.ts`
- **Spesifikasi:**
  - Buat fungsi utilitas pembentuk token sesi berbasis Web Crypto API (`crypto.subtle.digest("SHA-256", ...)` dari `AUTH_PASSWORD` + salt) agar kompatibel dengan Edge Middleware Next.js.
  - Di dalam `generateContent()` (`src/app/actions/generate-content.ts`), verifikasi `cookies().get("lokagen_auth")` sebelum memanggil API OpenRouter agar endpoint Server Action tidak bisa ditembak tanpa autentikasi.
  - Hapus salah satu lockfile duplikat di root proyek.

#### Kriteria Selesai Tahap 4 (*Definition of Done*):
- [ ] Refresh halaman `/generate` tidak menghilangkan profil toko maupun hasil generate terakhir.
- [ ] Seksi `<SocialProof />` tampil rapi di halaman utama `/`.
- [ ] Server Action menolak request tanpa cookie sesi yang valid, dan `next build` berjalan sukses tanpa error TypeScript/ESLint.

---

## Tahap 5: Upgrade Kualitas Generate Konten (Prompt AI + Validasi Output + Anti-Overflow Semua Tema)

> **Konteks:** Tahap 1.5 dan 3.1 sudah mencatat *ide* perbaikannya. Tahap ini adalah **spesifikasi eksekusi** lengkapnya: teks prompt final, logika deteksi promo, validasi server-side (BUG-18), dan audit overflow untuk **keempat** tema (termasuk `bold-typography` & `dark-futuristic` yang belum diaudit, BUG-14 s/d BUG-17).
>
> **Urutan pengerjaan:** Kerjakan Tahap 5 **setelah** Tahap 1.1 (kontrak tipe), lalu **sebelum** Tahap 3. Tahap 3.1 poin 1–4 & 6 otomatis selesai lewat Tahap 5. Poin 5 & 7 (`CampaignType`, `hashtags`, `whatsappTemplate`) tetap dikerjakan di Tahap 3 dengan memperluas prompt dari Tahap 5.

### 5.1. Single Source of Truth untuk Batas Teks

Batas panjang teks dipakai di **3 tempat** (prompt, validator, komponen slide), jadi harus didefinisikan sekali saja.

#### A. Tambahkan di `src/lib/constants.ts`
```ts
export const COPY_LIMITS = {
  title:          { minWords: 2, maxWords: 4,  maxChars: 25 },
  subtitle:       { minWords: 6, maxWords: 12, maxChars: 75 },
  bullet:         { minWords: 3, maxWords: 7,  maxChars: 48 },
  bulletCount:    3,
  promoText:      { minWords: 5, maxWords: 10, maxChars: 65 },
  highlightBadge: { minWords: 1, maxWords: 2,  maxChars: 12 },
  ctaText:        { minWords: 4, maxWords: 8,  maxChars: 50 },
} as const;
```

#### B. Perluas `SlidePromo` di `src/lib/types.ts` (melengkapi Tahap 1.1)
```ts
export type PromoMode = "promo" | "value";

export interface SlidePromo {
  type: "promo";
  mode: PromoMode;          // "promo" = ada info diskon/harga dari user, "value" = alasan wajib coba
  title: string;
  promoText: string;
  highlightBadge?: string;
}
```
`mode` **ditentukan oleh server (5.2), bukan oleh AI**, lalu dipakai oleh komponen slide (5.5) untuk mengganti label seperti `PROMO` / `Limited Offer`.

Update juga `PLACEHOLDER_CONTENT.slides[3]` di `src/lib/constants.ts` agar memiliki `mode: "value"` dan `promoText` yang **tidak** menyebut diskon (contoh: `"Dibuat fresh setiap hari, rasa konsisten"`).

---

### 5.2. Deteksi Info Promo (Server-Side, Sebelum Memanggil AI)

#### Buat file baru `src/lib/promo.ts`
```ts
import type { GenerateContentInput, PromoMode } from "./types";

// Pola angka/promo yang dianggap "info promo nyata" bila ditulis user
export const PROMO_PATTERN =
  /(diskon|disc|potongan|promo|gratis|free|cashback|beli\s*\d+\s*(gratis|dapat)|buy\s*\d+|\d+\s*%|rp\.?\s*\d|\d+\s*(rb|ribu|k)\b|harga\s+(spesial|khusus|coret))/i;

export function resolvePromoMode(input: GenerateContentInput): PromoMode {
  const sources = [
    input.description,
    input.brandInfo?.promoBadge,
    input.brandInfo?.priceText,
  ].filter(Boolean).join(" ");

  // campaignType "promo" saja TIDAK cukup: harus ada detail promo nyata dari user
  return PROMO_PATTERN.test(sources) ? "promo" : "value";
}

/** Info promo mentah yang boleh dikutip AI (tidak boleh ditambah-tambahi). */
export function extractPromoFacts(input: GenerateContentInput): string {
  return [input.brandInfo?.promoBadge, input.brandInfo?.priceText]
    .filter(Boolean)
    .join(" • ");
}
```

> **Catatan:** Kalau `campaignType === "promo"` tetapi user **tidak** menulis angka/syarat promo, mode tetap `"value"`. Tambahkan hint kecil di form (Tahap 3, `GenerateOptions.tsx`): *"Tulis detail promo (mis. 'Diskon 20% s/d 30 Nov') agar muncul di slide."*

---

### 5.3. `SYSTEM_PROMPT` & `generateUserPrompt` Final (`src/lib/openai.ts`)

#### A. Ganti `SYSTEM_PROMPT` (L9–29) dengan:
```ts
import { COPY_LIMITS as L } from "@/lib/constants";

export const SYSTEM_PROMPT = `Kamu adalah social media copywriter senior untuk UMKM Indonesia. Tugasmu menulis isi 5 slide carousel Instagram + caption, yang akan dimasukkan ke template desain dengan ruang teks TERBATAS.

STRUKTUR SLIDE (urutan wajib):
1. "intro" — Hook. "title" berupa pernyataan/pertanyaan yang bikin berhenti scroll; "subtitle" menjelaskan produknya apa.
2. "features" — FAKTA PRODUK yang bisa dicek: bahan baku, ukuran/isi, varian, proses pembuatan, asal, kemasan. Tanpa kata sifat kosong ("enak", "berkualitas") kecuali didukung fakta.
3. "benefits" — DAMPAK KE PEMBELI: perasaan, solusi masalah, momen pemakaian, hemat waktu/biaya. DILARANG mengulang fakta dari slide 2; setiap poin harus menjawab "terus apa untungnya buat saya?".
4. "promo" — Ikuti instruksi MODE SLIDE 4 di pesan user.
5. "cta" — Ajakan bertindak yang spesifik (cara order), sesuai tone.

ATURAN ANTI-KARANG (WAJIB):
- JANGAN PERNAH menulis angka diskon, persentase, harga, "beli X gratis Y", cashback, batas waktu, atau stok terbatas yang TIDAK ada di input user.
- JANGAN mengklaim sertifikasi (halal, BPOM, SNI), penghargaan, atau testimoni yang tidak disebut user atau tidak terlihat jelas di foto.
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
5. Baris terakhir: 5–10 hashtag dipisah spasi (campuran hashtag produk + lokal, mis. #UMKMLokal).

OUTPUT: HANYA JSON valid sesuai skema di pesan user. Tanpa markdown, tanpa penjelasan.`;
```

#### B. Ubah signature `generateUserPrompt` (L45–94)
Ganti 6 parameter posisional menjadi 1 objek supaya mudah ditambah field baru:
```ts
export function generateUserPrompt(params: {
  input: GenerateContentInput;
  hasImage: boolean;
  promoMode: PromoMode;
  promoFacts: string;
}): string
```
Tambahkan blok berikut sebelum skema JSON:
```ts
const slide4 =
  params.promoMode === "promo"
    ? `MODE SLIDE 4: PROMO. Gunakan HANYA info promo dari user berikut, tanpa menambah angka/syarat baru: "${params.promoFacts || params.input.description}". "highlightBadge" = inti promonya (mis. "DISKON 20%").`
    : `MODE SLIDE 4: VALUE (user TIDAK sedang promo). Isi dengan alasan kuat kenapa wajib coba sekarang: jaminan kualitas, keunikan, atau momen yang pas. DILARANG menyebut diskon/harga/gratis/batas waktu. "highlightBadge" berupa label nilai, mis. "FAVORIT", "FRESH", "HANDMADE".`;
```
Dan perbarui skema JSON di prompt menjadi:
```json
{
  "caption": "...",
  "slides": [
    { "type": "intro", "title": "...", "subtitle": "..." },
    { "type": "features", "title": "...", "bullets": ["...", "...", "..."] },
    { "type": "benefits", "title": "...", "bullets": ["...", "...", "..."] },
    { "type": "promo", "title": "...", "promoText": "...", "highlightBadge": "..." },
    { "type": "cta", "title": "...", "ctaText": "..." }
  ]
}
```
> `mode` **tidak** diminta ke AI. Server yang menyisipkannya (5.4).

#### C. Penyesuaian di `src/app/actions/generate-content.ts`
- Hitung `const promoMode = resolvePromoMode(input)` dan `const promoFacts = extractPromoFacts(input)` di awal `generateContent()`.
- L51: `detail: "low"` → `detail: "auto"` (aman karena gambar sudah dikompresi di Tahap 1.4).
- Tambahkan `temperature: 0.7` pada `openai.chat.completions.create` (cukup variatif, tapi tetap patuh aturan). Coba juga `response_format: { type: "json_object" }`. Katalog OpenRouter menandai `deepseek/deepseek-v4.1-flash-1017` mendukung parameter ini (lihat Tahap 0); tetap uji sekali, dan jika error, hapus lalu andalkan pembersihan markdown + validator 5.4.

---

### 5.4. Validasi & Normalisasi Output AI (BUG-18)

#### Buat file baru `src/lib/normalize-content.ts`
Tanggung jawab: memastikan **apa pun** yang dikembalikan AI aman untuk layout, dan diskon karangan tidak pernah sampai ke slide.

```ts
import { COPY_LIMITS as L, TOTAL_SLIDES } from "./constants";
import { PROMO_PATTERN } from "./promo";
import type { GeneratedContent, PromoMode } from "./types";

const EXPECTED_TYPES = ["intro", "features", "benefits", "promo", "cta"] as const;

/** Potong di batas kata terakhir yang muat, tanpa memotong di tengah kata. */
export function clampText(text: unknown, maxChars: number): string {
  const s = String(text ?? "").replace(/\s+/g, " ").trim();
  if (s.length <= maxChars) return s;
  const cut = s.slice(0, maxChars + 1);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > maxChars * 0.5 ? cut.slice(0, lastSpace) : s.slice(0, maxChars)).replace(/[,.;:\-–]+$/, "");
}

export interface NormalizeResult {
  content: GeneratedContent;
  warnings: string[]; // untuk console.warn / telemetry, tidak ditampilkan ke user
}

export function normalizeContent(
  raw: unknown,
  promoMode: PromoMode,
  userText: string // gabungan description + brandInfo, untuk cek "angka ini ada di input user?"
): NormalizeResult | null
```

**Aturan yang harus diimplementasikan di `normalizeContent`:**
1. **Struktur:** `slides` harus array berisi 5 item dengan `type` sesuai `EXPECTED_TYPES` (urutan diperbaiki jika AI menukar urutan; return `null` jika ada tipe yang hilang → action mengembalikan `ERROR_MESSAGES.INVALID_FORMAT`).
2. **Panjang:** Setiap field di-`clampText` sesuai `COPY_LIMITS`. Catat ke `warnings` jika ada yang terpotong.
3. **Bullets:** Ambil maksimal `L.bulletCount` poin. Jika kurang dari 3, pertahankan yang ada (komponen harus aman untuk 1–3 bullet). Hapus emoji dan titik di akhir.
4. **Duplikasi Slide 2 vs 3:** Jika sebuah bullet benefits identik (case-insensitive, setelah trim) dengan bullet features, catat ke `warnings` (cukup log dulu, belum perlu regenerasi).
5. **Anti-halusinasi promo (lapis kedua):**
   - Sisipkan `slides[3].mode = promoMode`.
   - Jika `promoMode === "value"` dan `PROMO_PATTERN` cocok pada `title`, `promoText`, atau `highlightBadge` slide 4 (atau pada `ctaText`), **ganti** field tersebut dengan fallback aman:
     - `highlightBadge` → `"FAVORIT"`
     - `promoText` → `subtitle` slide 1 yang di-clamp ke `L.promoText.maxChars`
     - `title` → `"Wajib Coba!"`
   - Jika `promoMode === "promo"`, setiap angka (`\d+%`, `Rp…`, `…k`) di slide 4 yang **tidak** muncul di `userText` diperlakukan sama (diganti fallback dengan `highlightBadge` = `brandInfo.promoBadge || "PROMO"`).
6. **Caption:** Jika caption tidak mengandung `\n\n`, pecah otomatis: kalimat pertama → hook, sisa kalimat → paragraf, hashtag (`/#\w+/g`) dipindah ke baris terakhir. Buang angka diskon karangan dengan aturan yang sama seperti poin 5.

#### Integrasi di `src/app/actions/generate-content.ts` (ganti L94–105)
```ts
const parsed = JSON.parse(cleanedContent.trim());
const normalized = normalizeContent(parsed, promoMode, userText);
if (!normalized) {
  return { success: false, error: ERROR_MESSAGES.INVALID_FORMAT };
}
if (normalized.warnings.length) console.warn("[generate] normalize:", normalized.warnings);
return { success: true, data: normalized.content };
```

> **Opsional (setelah MVP):** jika `normalizeContent` mengembalikan `null`, lakukan **1x retry** ke AI dengan pesan tambahan *"Output sebelumnya tidak valid: {alasan}. Kembalikan JSON sesuai skema."* sebelum menyerah.

---

### 5.5. Anti-Overflow & Label Kontekstual di Keempat Tema

#### A. Helper bersama: buat `src/components/carousel/themes/fit-text.ts`
Daripada menulis `length > 22 ? ... : ...` berbeda-beda di 20 file (seperti contoh di Tahap 1.5), gunakan 1 helper:
```ts
/**
 * Pilih class ukuran font berdasarkan panjang teks.
 * steps: [[maxChars, className], ...] urut dari teks terpendek; elemen terakhir = fallback.
 */
export function fitText(text: string, steps: [number, string][], fallback: string): string {
  const len = text.trim().length;
  for (const [max, cls] of steps) if (len <= max) return cls;
  return fallback;
}

export const PROMO_LABELS = {
  promo: { header: "PROMO", badge: "SPESIAL!", kicker: "Penawaran Spesial", order: "ORDER" },
  value: { header: "WAJIB COBA", badge: "FAVORIT", kicker: "Kenapa Harus Ini?", order: "COBA" },
} as const;
```
Semua kontainer teks AI juga wajib diberi **`break-words`** (dan `hyphens-auto` dengan `lang="id"` pada root slide) sebagai pengaman terakhir untuk kata panjang tanpa spasi.

#### B. Tabel perubahan per komponen

| Tema / File | Baris | Perubahan |
| :--- | :--- | :--- |
| `bold-typography/SlideIntro.tsx` | L26–32 | Hanya pecah per kata jika `≤ 3` kata **dan** setiap kata `≤ 8` karakter; selain itu render sebagai satu blok. Ukuran: `fitText(title, [[10,"text-[60px]"],[16,"text-5xl"],[22,"text-4xl"]], "text-3xl")`. Tambahkan `max-w-[65%]` (lihat Tahap 1.5). |
| `bold-typography/SlideCTA.tsx` | L35–45 (BUG-14) | Logika split sama seperti Intro, ukuran: `fitText(title, [[8,"text-7xl"],[14,"text-6xl"],[20,"text-5xl"]], "text-4xl")`. Ganti `ORDER NOW` → `ORDER SEKARANG`, `LINK IN BIO` → `brandInfo?.contactInfo \|\| "LINK DI BIO"`, `FINAL SLIDE` → `brandInfo?.storeName \|\| productName \|\| ""`. `ctaText`: ganti `max-w-[200px]` jadi `max-w-[280px]`. |
| `bold-typography/SlideFeatures.tsx` | L26–28, L50 (BUG-15) | Heading `FEATURES` → `{data.title}` dengan `fitText(title, [[14,"text-4xl"]], "text-3xl")`. Marquee L50 → `{productName \|\| brandInfo?.storeName} • {data.title}` dengan `truncate`. Bullet: `line-clamp-2`. |
| `bold-typography/SlideBenefits.tsx` | L33–37, L60 (BUG-15) | Heading `WHY CHOOSE US?` → `{data.title}` (italic uppercase dipertahankan, `fitText(title, [[12,"text-5xl"],[18,"text-4xl"]], "text-3xl")`). Tag kanan bawah L60 → `productName \|\| brandInfo?.storeName`. |
| `bold-typography/SlidePromo.tsx` | L44–56 (BUG-16) | `Limited Offer` → `PROMO_LABELS[data.mode].kicker`. Title: `fitText(title, [[12,"text-4xl"],[18,"text-3xl"]], "text-2xl")`. promoText: `fitText(promoText, [[30,"text-xl"],[50,"text-lg"]], "text-base")`. Tampilkan `data.highlightBadge` sebagai stiker kecil di pojok kartu. |
| `dark-futuristic/SlideIntro.tsx` | L65–77 (BUG-17) | `Initialising...` → `productName \|\| "NEW_DROP"`. Title: `fitText(title, [[12,"text-4xl"],[18,"text-3xl"]], "text-2xl")` + `break-words`. |
| `dark-futuristic/SlideFeatures.tsx` | L46–49, L55 | Title: `fitText(title, [[16,"text-3xl"]], "text-2xl")`. Bullet: `line-clamp-2`. |
| `dark-futuristic/SlideBenefits.tsx` | L42–45, L64–65 (BUG-15) | Heading `Analysis Report` → `{data.title}` (font-mono uppercase, `fitText(title, [[14,"text-3xl"]], "text-2xl")`). `SCAN COMPLETE` → `brandInfo?.storeName \|\| productName \|\| "LOKAL_PRODUCT"`. |
| `dark-futuristic/SlidePromo.tsx` | L43–49, L63 (BUG-16) | `Time_Limited_Event` → `data.mode === "promo" ? (data.highlightBadge \|\| "Special_Offer") : "Why_This"`. promoText: `fitText(promoText, [[35,"text-lg"]], "text-base")`. |
| `dark-futuristic/SlideCTA.tsx` | L43–49 | Title: `fitText(title, [[14,"text-4xl"],[20,"text-3xl"]], "text-2xl")`. `Initialize_Order` → `Order_Now` (atau `brandInfo?.contactInfo`). |
| `colorful-genz/SlideIntro.tsx` | L29–36 | `fitText(title, [[12,"text-5xl"],[18,"text-4xl"]], "text-3xl")` + `line-clamp-2` (menggantikan aturan di Tahap 1.5 poin 3). |
| `colorful-genz/SlideFeatures.tsx`, `SlideBenefits.tsx`, `SlideCTA.tsx` | L39, L73–77 | Heading besar: `fitText` serupa. Footer kiri `MENERIMA PESANAN ONLINE` → `brandInfo?.storeName \|\| productName \|\| ""` (Tahap 1.3 baru menangani footer kanan). CTA L71 `KLIK LINK DI BIO!` → `brandInfo?.contactInfo \|\| "KLIK LINK DI BIO!"`. |
| `colorful-genz/SlidePromo.tsx` | L39–47, L64, L68 (BUG-16) | Header `PROMO` → `PROMO_LABELS[data.mode].header` (`text-6xl` → `text-5xl` jika `WAJIB COBA`). Badge L64 sesuai Tahap 1.3. promoText sesuai Tahap 1.5 poin 2. |
| `minimal-clean/SlideIntro.tsx` | L27–35 | Setelah perbaikan BUG-04, `data.title`: `fitText(title, [[12,"text-5xl"],[18,"text-4xl"]], "text-3xl")`. |
| `minimal-clean/SlidePromo.tsx` | L27–32, L57–65 (BUG-16) | Title outline `text-5xl` → `fitText(title, [[10,"text-5xl"],[16,"text-4xl"]], "text-3xl")` (teks outline 1px sulit dibaca di ukuran kecil, jadi pakai `WebkitTextStroke: "1.5px"` untuk ukuran ≤ 4xl). Badge kiri: lihat Tahap 1.3. Badge kanan `ORDER/NOW` → `PROMO_LABELS[data.mode].order` / `"SEKARANG"`. |
| `minimal-clean/SlideCTA.tsx`, `SlideFeatures.tsx`, `SlideBenefits.tsx` | L32, L22, L46 | `fitText` untuk title. Bullet: `line-clamp-2`. |

---

### 5.6. Pengujian Stres Visual (`src/app/test-slides/page.tsx`)

Halaman `test-slides` sudah merender keempat tema. Tambahkan **switcher fixture** di bagian atas halaman:

| Fixture | Tujuan |
| :--- | :--- |
| `short` | Teks minimum (title 2 kata pendek, bullet 3 kata) → cek layout tidak terlihat kosong. |
| `max` | Setiap field tepat di `COPY_LIMITS.maxChars` → **tidak boleh ada overflow** di 20 komponen. |
| `overflow` | Setiap field 2× batas (simulasi AI tidak patuh, dilewatkan **tanpa** `normalizeContent`) → teks boleh mengecil/terpotong rapi, tapi tidak boleh keluar dari slide atau menabrak elemen lain. |
| `long-word` | Satu kata 30 karakter tanpa spasi (mis. nama produk) → cek `break-words`. |
| `value-mode` vs `promo-mode` | Slide 4 dengan `mode` berbeda → cek label `PROMO`/`Limited Offer` sudah berganti. |
| `two-bullets` | Hanya 2 bullet → cek tidak ada slot kosong yang aneh. |

Simpan fixture di `src/app/test-slides/fixtures.ts` agar bisa dipakai ulang untuk unit test `normalizeContent`.

**Uji prompt manual (minimal 8 kombinasi, catat hasilnya di PR, model: nilai `AI_MODEL`, default `deepseek/deepseek-v4.1-flash-1017`; catat juga latensi dan biaya dari `usage` response):**
- 4 produk sampel (Tahap 2.1) × {deskripsi **tanpa** info promo, deskripsi **dengan** "Diskon 15% sampai Minggu"}.
- Ceklis per hasil: (1) tidak ada angka diskon/harga karangan, (2) bullet slide 2 ≠ slide 3, (3) caption punya hook + `\n\n` + hashtag di baris terakhir, (4) `warnings` dari `normalizeContent` kosong atau minim.

---

#### Kriteria Selesai Tahap 5 (*Definition of Done*):
- [ ] `COPY_LIMITS` menjadi satu-satunya sumber batas teks dan dipakai oleh prompt, `normalizeContent`, dan fixture uji.
- [ ] Generate **tanpa** info promo: Slide 4 di keempat tema tidak menampilkan kata `PROMO`, `DISKON`, `Limited`, `%`, atau harga apa pun (dicek di 8 uji manual).
- [ ] Generate **dengan** info promo: angka yang tampil di Slide 4 hanya angka yang ditulis user.
- [ ] Judul Slide 2 & 3 hasil AI tampil di keempat tema (termasuk `bold-typography` & `dark-futuristic`).
- [ ] Fixture `max` dan `overflow` di `/test-slides` tidak menghasilkan teks yang keluar dari slide atau saling tumpang tindih di 20 komponen (cek visual + hasil `toPng`).
- [ ] Caption yang ditampilkan selalu memiliki minimal 3 blok yang dipisah baris kosong dan hashtag di baris terakhir.
- [ ] Respons AI dengan struktur rusak (tipe slide hilang/JSON tidak valid) menampilkan pesan error yang ramah, bukan crash.
- [ ] `next build` lulus tanpa error TypeScript/ESLint setelah perubahan tipe `SlidePromo.mode`.

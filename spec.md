# LokaGen — AI Content Assistant untuk UMKM Lokal

## 1. Context

Saya ikut hackathon dengan tema "Inovasi AI: Mendorong Usaha Lokal dengan AI Inklusif".
Target utama aplikasi ini: membantu UMKM lokal membuat konten Instagram (carousel + caption) dengan cepat dan mudah tanpa perlu skill desain.

## 2. Target User

- Pelaku UMKM lokal (makanan, minuman, fashion, dll.)
- Gaptek desain, tapi butuh konten marketing.
- Punya foto produk seadanya dan bingung bikin caption/struktur konten.

## 3. Goal Produk (MVP)

User bisa:

1. Upload 1 foto produk.
2. Isi deskripsi singkat produk (opsional).
3. Pilih:
   - tone (playful, formal, elegan, lokal)
   - tema visual (Colorful Gen Z, Minimal Clean Modern, Dark Modern/Futuristic, Bold Typography)
   - warna brand optional (hex) sebagai accent color.
4. Klik "Generate".
5. Aplikasi:
   - panggil AI untuk generate:
     - caption Instagram
     - teks untuk 5 slide carousel (judul, subjudul, bullet, CTA)
   - render 5 slide carousel dengan template visual (React + Tailwind).
   - allow user download masing-masing slide sebagai PNG/JPG.

## 4. Non-Goals (penting buat batasi scope)

- Tidak perlu authentication / login.
- Tidak perlu database / history konten.
- Tidak perlu WYSIWYG editor ala Canva.
- Tidak perlu S3 atau object storage untuk MVP.
- Tidak perlu multi-language (cukup Bahasa Indonesia dulu).

## 5. Tech Stack (wajib)

- Framework: Next.js (App Router).
- Bahasa: TypeScript (boleh JS kalau kepepet, tapi prefer TS).
- Styling: Tailwind CSS.
- AI Provider: OpenAI API (text + vision optional).
- Image export: html-to-image / html2canvas (di client).
- Deploy: Vercel.

## 6. Fitur Utama MVP

- Halaman utama dengan flow:
  - form upload gambar
  - input deskripsi produk (optional)
  - dropdown tone
  - dropdown tema visual
  - optional color picker (brand color)
  - tombol "Generate"
- Call Server Actions:
  - input: description + tone + bahasa
  - output: JSON untuk:
    - caption utama
    - slide1: title, subtitle
    - slide2: title, bullets
    - slide3: title, bullets
    - slide4: title, promo text
    - slide5: title, CTA
- Komponen React untuk render 5 slide berdasarkan:
  - tema visual (dark/light/colorful)
  - brand color (accent)
  - teks dari AI
- Tombol "Download semua slide" → generate PNG dari tiap slide.

## 7. UX Sederhana

- Tidak perlu banyak halaman:
  - `/` → landing page.
  - `/generate` → halaman utama.
- Fokus ke:
  - flow sekali jalan
  - UI clean
  - hasil konten terlihat “siap upload ke IG”.

## 8. Future Ideas (bukan untuk MVP)

- Login & brand profile.
- History konten dan re-generate.
- Multi-bahasa.
- S3 / storage permanen untuk assets.

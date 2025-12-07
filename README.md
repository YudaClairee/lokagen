# LokaGen — AI Content Assistant for Local MSMEs

**LokaGen** is an AI-powered inclusivity innovation designed to help local MSMEs (UMKM) create high-quality Instagram content (carousels + captions) quickly and easily, without requiring design skills.

Built for the "AI Innovation: Empowering Local Businesses" Hackathon.

## 🚀 Features

- **Instant Content Generation**: Upload a product photo and get AI-generated captions and slide content.
- **Visual Themes**: Choose from multiple pre-designed aesthetics:
  - ✨ **Minimal Clean Modern** (Soft, elegant, beige tones)
  - 🎨 **Colorful Gen-Z** (Vibrant, playful, gradient-heavy)
  - 🌑 **Dark Modern/Futuristic** (Sleek, neon accents)
  - 🅰️ **Bold Typography** (High impact, text-driven)
- **Brand Customization**: Dynamic accent color support to match your brand identity.
- **One-Click Export**: Download generated carousel slides as high-quality images ready for Instagram.
- **User-Friendly Flow**: No login required, streamlined process from upload to download.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **AI**: [Kolosal AI](https://kolosal.ai/) (Claude Sonnet 4.5)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Image Generation**: `html-to-image` (Client-side rendering)

## 📦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, pnpm, or bun
- A Kolosal AI API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YudaClairee/lokagen.git
   cd lokagen
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory (copy from `.env.example` if available) and add your Kolosal AI API key:
   ```env
   KOLOSAL_API_KEY=sk-your-api-key-here
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📖 Usage

1. Go to the **Generate** page.
2. **Upload** a photo of your product.
3. (Optional) precise a short description or key selling points.
4. Select a **Visual Theme** and **Tone** for the caption.
5. Pick your **Brand Color**.
6. Click **Generate Magic**!
7. Preview the results and download your slides.

---

Made with ❤️ by the Anak Mamah Team for Local MSMEs.

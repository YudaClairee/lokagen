import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.URL ||
  "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "LokaGen - Asisten Konten AI untuk UMKM",
  description:
    "LokaGen membantu UMKM membuat konten Instagram carousel, Story, dan caption menarik secara otomatis.",
  openGraph: {
    title: "LokaGen - Asisten Konten AI untuk UMKM",
    description:
      "Dari 1 foto produk jadi 5 slide carousel Instagram, Story 9:16, caption, dan template WA siap posting.",
    type: "website",
    locale: "id_ID",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "Preview LokaGen - Asisten Konten AI untuk UMKM",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LokaGen - Asisten Konten AI untuk UMKM",
    description:
      "Buat konten Instagram carousel & caption untuk UMKM dalam hitungan detik.",
    images: ["/preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${outfit.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}

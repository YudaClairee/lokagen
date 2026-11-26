import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BackgroundImageProps {
  src?: string;
  /** Opasitas foto 0..1. Default 0.1 (sangat samar, hanya tekstur). */
  opacity?: number;
  grayscale?: boolean;
  /** Pakai mix-blend-multiply pada foto (tema terang). */
  multiply?: boolean;
  /** Warna yang dicampur ke foto (mix-blend-overlay, opasitas 50%). Dipakai tema gelap. */
  tint?: string;
  /** Kelas untuk lapisan penutup di atas foto, mis. "bg-white/90" agar foto makin samar. */
  overlayClassName?: string;
  /** Lapisan tambahan di atas foto, mis. efek scanline. */
  children?: ReactNode;
}

// Foto produk sebagai latar slide. Tidak merender apa pun jika foto belum ada.
// Memakai <img> eager agar container ekspor off-screen (html-to-image) selalu merender latar di Safari/mobile.
export function BackgroundImage({
  src,
  opacity = 0.1,
  grayscale,
  multiply,
  tint,
  overlayClassName,
  children,
}: BackgroundImageProps) {
  if (!src) return null;
  return (
    <div className="absolute inset-0 z-0">
      {tint && <div className="absolute inset-0 z-10 opacity-50 mix-blend-overlay" style={{ backgroundColor: tint }} />}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        loading="eager"
        decoding="sync"
        className={cn("absolute inset-0 h-full w-full object-cover", grayscale && "grayscale", multiply && "mix-blend-multiply")}
        style={{ opacity }}
      />
      {overlayClassName && <div className={cn("absolute inset-0", overlayClassName)} />}
      {children}
    </div>
  );
}

"use client";

import { forwardRef, type ReactNode } from "react";
import type { BrandInfo, SlideFormat } from "@/lib/types";
import { SLIDE_FORMATS } from "@/lib/constants";
import { normalizeHex, readableTextColor } from "@/lib/color";

const BAND_FALLBACK = "#111111";

interface SlideCanvasProps {
  format: SlideFormat;
  brandColor: string;
  productName?: string;
  brandInfo?: BrandInfo;
  children: ReactNode;
}

// Kanvas tempat satu slide ditampilkan dan diekspor.
// - square: slide mengisi seluruh kanvas (1:1).
// - story: slide persegi di tengah, dengan pita brand di atas (nama toko & lokasi)
//   dan di bawah (kontak). Ruang kosong 9:16 jadi terisi, dan info toko ikut terlihat.
export const SlideCanvas = forwardRef<HTMLDivElement, SlideCanvasProps>(function SlideCanvas(
  { format, brandColor, productName, brandInfo, children },
  ref
) {
  const { width, height } = SLIDE_FORMATS[format];

  if (format === "square") {
    return (
      <div ref={ref} className="relative overflow-hidden" style={{ width, height }}>
        {children}
      </div>
    );
  }

  const band = normalizeHex(brandColor, BAND_FALLBACK);
  const bandHeight = (height - width) / 2;
  const bandTextColor = readableTextColor(band);

  // Warna latar ditaruh di lapisan anak, bukan di root: saat ekspor, html-to-image
  // menimpa latar root dengan opsi backgroundColor, sehingga warna brand hilang.
  return (
    <div ref={ref} className="relative overflow-hidden" style={{ width, height, color: bandTextColor }}>
      <div className="absolute inset-0" style={{ backgroundColor: band }} />

      <div
        className="absolute inset-x-0 top-0 flex flex-col items-center justify-center px-10 text-center"
        style={{ height: bandHeight }}
      >
        <p className="w-full truncate text-3xl font-black uppercase tracking-tight">
          {brandInfo?.storeName || productName || ""}
        </p>
        {brandInfo?.location && (
          <p className="mt-2 w-full truncate text-lg font-semibold opacity-80">{brandInfo.location}</p>
        )}
      </div>

      <div className="absolute left-0 overflow-hidden" style={{ top: bandHeight, width, height: width }}>
        {children}
      </div>

      <div
        className="absolute inset-x-0 bottom-0 flex items-center justify-center px-10 text-center"
        style={{ height: bandHeight }}
      >
        <p className="line-clamp-3 w-full break-words text-2xl font-bold leading-snug">
          {brandInfo?.contactInfo || "Link di bio"}
        </p>
      </div>
    </div>
  );
});

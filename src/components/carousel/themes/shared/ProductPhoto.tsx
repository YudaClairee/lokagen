import { cn } from "@/lib/utils";
import { readableTextColor } from "@/lib/color";

interface ProductPhotoProps {
  src?: string;
  /** Warna brand (sudah dinormalisasi "#rrggbb"). Dipakai untuk fallback saat foto belum ada. */
  brandColor: string;
  /** Nama produk/toko; huruf pertamanya jadi inisial pada fallback. */
  name?: string;
  /** Ukuran, radius, border, dan shadow wadah. Wadah selalu `relative overflow-hidden`. */
  className?: string;
  imageClassName?: string;
  initialClassName?: string;
}

// Foto produk, atau blok warna brand berisi inisial jika user tidak mengunggah foto.
// Memakai <img> dengan loading="eager" agar container ekspor off-screen (html-to-image)
// selalu merender foto di Safari/mobile tanpa tertahan lazy-loading next/image.
export function ProductPhoto({ src, brandColor, name, className, imageClassName, initialClassName }: ProductPhotoProps) {
  const initial = name?.trim().match(/[\p{L}\p{N}]/u)?.[0]?.toUpperCase() ?? "★";
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          loading="eager"
          decoding="sync"
          className={cn("absolute inset-0 h-full w-full object-cover", imageClassName)}
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center"
          style={{ backgroundColor: brandColor, color: readableTextColor(brandColor) }}
        >
          <span className={cn("select-none text-7xl font-black leading-none opacity-90", initialClassName)}>{initial}</span>
        </div>
      )}
    </div>
  );
}

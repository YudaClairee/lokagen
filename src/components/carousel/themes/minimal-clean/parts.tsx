import type { ReactNode } from "react";
import type { BrandInfo } from "@/lib/types";
import { ensureContrast } from "@/lib/color";
import { getBrandLine } from "../shared";

// Bahasa desain Minimal Clean (lihat template_design_plan.md §3 B.1).
// Latar krem hangat, kartu putih, teks arang. Warna brand hanya jadi aksen tipis;
// satu-satunya slide berlatar warna brand penuh adalah CTA.
export const MINIMAL = {
  cream: "#FAF7F2",
  surface: "#FFFFFF",
  border: "#E7E1D8",
  ink: "#1C1917",
  muted: "#78716C",
} as const;

/**
 * Dua turunan warna brand yang dijamin terbaca di atas latar krem:
 * - shape: garis, border, chip, lingkaran (kontras ≥ 3:1)
 * - text: teks kecil berwarna (kontras ≥ 4.5:1)
 */
export function getAccents(brandColor: string) {
  return {
    shape: ensureContrast(brandColor, MINIMAL.cream, 3),
    text: ensureContrast(brandColor, MINIMAL.cream, 4.5),
  };
}

/** Nama toko selalu ada (fallback nama produk); kontak hanya jika user mengisinya. */
export function getBrandLines(brandInfo: BrandInfo | undefined, productName: string | undefined) {
  return {
    identity: getBrandLine(brandInfo, productName, "identity"),
    contact: brandInfo?.contactInfo?.trim() ?? "",
  };
}

interface LabelProps {
  children: ReactNode;
  /** Warna garis kecil di kiri label. */
  accent: string;
  color?: string;
}

/** Label kecil kapital dengan garis aksen di kiri, mis. "— KEUNGGULAN". */
export function MinimalLabel({ children, accent, color = MINIMAL.muted }: LabelProps) {
  return (
    <p
      className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.25em]"
      style={{ color }}
    >
      <span className="h-px w-6 shrink-0" style={{ backgroundColor: accent }} />
      <span className="truncate">{children}</span>
    </p>
  );
}

interface FooterProps {
  left?: string;
  right?: string;
  color?: string;
  borderColor?: string;
}

/** Baris info toko di dasar slide. Tidak merender apa pun jika kedua sisinya kosong. */
export function MinimalFooter({ left, right, color = MINIMAL.muted, borderColor = MINIMAL.border }: FooterProps) {
  const l = left?.trim();
  const r = right?.trim() && right.trim() !== l ? right.trim() : undefined;
  if (!l && !r) return null;
  return (
    <div
      className="mt-6 flex shrink-0 items-center justify-between gap-6 border-t pt-3 text-[10px] font-semibold uppercase tracking-[0.2em]"
      style={{ color, borderColor }}
    >
      <span className="min-w-0 truncate">{l}</span>
      {r && <span className="min-w-0 truncate text-right">{r}</span>}
    </div>
  );
}

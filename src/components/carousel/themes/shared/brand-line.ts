import type { BrandInfo } from "@/lib/types";

/**
 * Satu aturan fallback untuk teks identitas toko di slide, supaya tidak ditulis ulang
 * dengan urutan berbeda di tiap file.
 *
 * - "identity": nama toko → nama produk → ""
 * - "contact":  kontak → nama toko → "Link di bio"
 */
export function getBrandLine(
  brandInfo: BrandInfo | undefined,
  productName: string | undefined,
  kind: "identity" | "contact"
): string {
  const store = brandInfo?.storeName?.trim();
  if (kind === "identity") return store || productName?.trim() || "";
  return brandInfo?.contactInfo?.trim() || store || "Link di bio";
}

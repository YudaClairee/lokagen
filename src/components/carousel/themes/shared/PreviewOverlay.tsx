export type PreviewVariant = "minimal" | "dark" | "genz" | "bold" | "boldDark";

const VARIANTS: Record<PreviewVariant, { wrapper: string; label: string; text: string }> = {
  minimal: {
    wrapper: "bg-white/80",
    label: "rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-500 shadow-sm",
    text: "Preview Mode",
  },
  dark: {
    wrapper: "bg-black/80",
    label: "border border-white/50 bg-black/50 px-3 py-1 font-mono text-xs text-white backdrop-blur-md",
    text: "PREVIEW_MODE",
  },
  genz: {
    wrapper: "z-50 bg-white/50 backdrop-blur-sm",
    label: "rounded-full bg-black px-4 py-2 text-sm font-bold text-white",
    text: "PREVIEW",
  },
  bold: {
    wrapper: "bg-black/5",
    label: "bg-black px-2 py-1 font-mono text-xs text-white",
    text: "PREVIEW ONLY",
  },
  // Bold di atas latar hitam: label dibalik jadi putih.
  boldDark: {
    wrapper: "bg-white/10",
    label: "bg-white px-2 py-1 font-mono text-xs text-black",
    text: "PREVIEW ONLY",
  },
};

interface PreviewOverlayProps {
  /** Tampilkan overlay (biasanya nilai `isPlaceholder`). */
  active?: boolean;
  variant: PreviewVariant;
}

// Penanda "belum ada konten asli" di atas slide contoh. Tidak boleh tampil di hasil export.
export function PreviewOverlay({ active, variant }: PreviewOverlayProps) {
  if (!active) return null;
  const { wrapper, label, text } = VARIANTS[variant];
  return (
    <div className={`absolute inset-0 flex items-center justify-center ${wrapper}`}>
      <span className={label}>{text}</span>
    </div>
  );
}

import { colorDistance, readableTextColor } from "@/lib/color";
import { cn } from "@/lib/utils";

// Warna "pop" tetap milik tema Gen Z, urut dari yang paling dipilih (pink = tampilan asli).
const POP_COLORS = ["#FF69B4", "#00FF94", "#FFD700", "#0088FF"] as const;

// Jarak minimal (RGB, 0..~442) supaya footer/badge tidak menyatu dengan kartu berwarna brand.
const MIN_DISTANCE = 140;

/**
 * Warna footer dan badge. Tetap pink kalau cukup berbeda dari warna brand;
 * kalau terlalu mirip (mis. brand pink), pakai pop berikutnya yang cukup jauh,
 * atau yang paling jauh bila tidak ada yang memenuhi.
 */
export function pickContrastingPop(brandColor: string): string {
  const enough = POP_COLORS.find((c) => colorDistance(c, brandColor) >= MIN_DISTANCE);
  if (enough) return enough;
  return POP_COLORS.reduce((best, c) => (colorDistance(c, brandColor) > colorDistance(best, brandColor) ? c : best));
}

function CheckerCorner({ side }: { side: "left" | "right" }) {
  return (
    <div className={cn("absolute top-6 grid grid-cols-2 gap-1", side === "left" ? "left-4" : "right-4")}>
      <div className="h-3 w-3 bg-black" />
      <div className="h-3 w-3 border border-black bg-white" />
      <div className="h-3 w-3 border border-black bg-white" />
      <div className="h-3 w-3 bg-black" />
    </div>
  );
}

interface GenZHeaderProps {
  title: string;
  subtitle: string;
  /** Warna teks judul utama (mis. "#00FF94", "#0088FF", "#FF69B4"). */
  color: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

/** Header khas Colorful Gen Z: kotak catur kiri-kanan + judul stroke + subjudul kuning. */
export function GenZHeader({ title, subtitle, color, titleClassName, subtitleClassName }: GenZHeaderProps) {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center px-12 pb-2 pt-6">
      <CheckerCorner side="left" />
      <CheckerCorner side="right" />

      <h1
        className={cn("text-center font-black uppercase leading-none tracking-tighter break-words", titleClassName ?? "text-4xl")}
        style={{
          color,
          WebkitTextStroke: "2px black",
          textShadow: "4px 4px 0px #000",
        }}
      >
        {title}
      </h1>

      <h2
        className={cn(
          "mt-1 line-clamp-2 break-words text-center font-black uppercase tracking-widest text-[#FFD700]",
          subtitleClassName ?? "text-lg"
        )}
        style={{
          WebkitTextStroke: "1px black",
          textShadow: "2px 2px 0px #000",
        }}
      >
        {subtitle}
      </h2>
    </div>
  );
}

interface GenZFooterProps {
  left?: string;
  right?: string;
  bg: string;
}

/** Footer neo-brutalist Colorful Gen Z dengan kontras teks otomatis di atas `bg`. */
export function GenZFooter({ left, right, bg }: GenZFooterProps) {
  return (
    <div
      className="relative z-10 flex h-12 w-full shrink-0 items-center justify-between border-t-4 border-black px-4"
      style={{ backgroundColor: bg, color: readableTextColor(bg) }}
    >
      <span className="max-w-[50%] break-words text-[10px] font-black uppercase leading-tight">{left}</span>
      <span className="max-w-[50%] break-words text-right text-[10px] font-black uppercase leading-tight">{right}</span>
    </div>
  );
}

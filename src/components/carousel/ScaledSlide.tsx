"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { SlideFormat } from "@/lib/types";
import { SLIDE_FORMATS } from "@/lib/constants";

// Membesarkan/mengecilkan slide (ukuran logis sesuai format) agar pas dengan lebar kontainernya.
// Slide di dalam sudah mengisi kotaknya (h-full), jadi tinggi ditentukan oleh format.
export function ScaledSlide({
  children,
  format = "square",
}: {
  children: ReactNode;
  format?: SlideFormat;
}) {
  const { width, height } = SLIDE_FORMATS[format];
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.3);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(() => setScale(el.clientWidth / width));
    observer.observe(el);
    return () => observer.disconnect();
  }, [width]);

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <div
        className="pointer-events-none absolute left-0 top-0"
        style={{
          width,
          height,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
}

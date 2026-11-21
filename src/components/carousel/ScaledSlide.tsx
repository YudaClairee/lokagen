"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Ukuran logis satu slide. Dikali pixelRatio 2 saat export → 1080x1080px.
export const EXPORT_SIZE = 540;

// Membesarkan/mengecilkan slide 540px agar pas dengan lebar kontainernya.
export function ScaledSlide({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.3);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(() => setScale(el.clientWidth / EXPORT_SIZE));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative aspect-square w-full overflow-hidden">
      <div
        className="pointer-events-none absolute left-0 top-0"
        style={{
          width: EXPORT_SIZE,
          height: EXPORT_SIZE,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
}

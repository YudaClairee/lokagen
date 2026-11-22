"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { History } from "lucide-react";
import type { HistoryItem } from "@/lib/storage";

interface HistoryPanelProps {
  items: HistoryItem[];
  onLoad: (item: HistoryItem) => void;
}

export function HistoryPanel({ items, onLoad }: HistoryPanelProps) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Tutup panel saat klik di luar
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div className="relative" ref={panelRef}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="gap-2 border-border bg-card text-foreground hover:bg-muted"
      >
        <History className="h-4 w-4" />
        Riwayat ({items.length})
      </Button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-72 rounded-xl border border-border bg-card p-2 shadow-xl">
          {items.length === 0 ? (
            <p className="p-3 text-sm text-muted-foreground">Belum ada riwayat. Generate konten dulu ya.</p>
          ) : (
            <ul className="max-h-80 space-y-1 overflow-y-auto">
              {items.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onLoad(item);
                      setOpen(false);
                    }}
                    className="w-full rounded-lg p-3 text-left transition-colors hover:bg-muted"
                  >
                    <span className="block truncate text-sm font-medium text-foreground">
                      {item.productName || item.result.slides[0].title || "Tanpa nama"}
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      {new Date(item.timestamp).toLocaleString("id-ID", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      · {item.theme}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
          <p className="px-3 pb-1 pt-2 text-[11px] text-muted-foreground">
            Foto produk tidak disimpan. Unggah ulang jika ingin mengganti foto.
          </p>
        </div>
      )}
    </div>
  );
}

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
        aria-label={`Riwayat (${items.length})`}
        title={`Riwayat (${items.length})`}
        className="h-8 gap-1.5 border-border bg-card px-2 text-xs text-foreground hover:bg-muted sm:px-2.5"
      >
        <History className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        <span className="hidden sm:inline">Riwayat</span>
        <span>({items.length})</span>
      </Button>

      {open && (
        <div className="fixed inset-x-3 top-14 z-50 rounded-xl border border-border bg-card p-2 shadow-xl sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-2 sm:w-72">
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

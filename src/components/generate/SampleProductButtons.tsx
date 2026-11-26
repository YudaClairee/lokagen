"use client";

import { Button } from "@/components/ui/button";
import type { SampleProduct } from "@/lib/types";

interface SampleProductButtonsProps {
  samples: SampleProduct[];
  onSelect: (sample: SampleProduct) => void;
  disabled?: boolean;
}

export function SampleProductButtons({ samples, onSelect, disabled }: SampleProductButtonsProps) {
  return (
    <div className="mb-5 rounded-lg border border-dashed border-primary/40 bg-primary/5 p-3.5 sm:mb-6 sm:p-4">
      <p className="mb-2.5 text-xs font-semibold text-foreground/80 sm:mb-3 sm:text-sm">
        ✨ Belum punya produk? Coba contoh dalam 1 klik:
      </p>
      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
        {samples.map((sample) => (
          <Button
            key={sample.id}
            type="button"
            variant="outline"
            size="sm"
            disabled={disabled}
            onClick={() => onSelect(sample)}
            className="h-auto min-h-8 w-full justify-center border-border bg-card px-2.5 py-1.5 text-xs text-foreground hover:bg-muted sm:w-auto sm:px-3 sm:text-sm"
          >
            <span className="hidden sm:inline">Coba Contoh:&nbsp;</span>
            <span className="truncate">{sample.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}

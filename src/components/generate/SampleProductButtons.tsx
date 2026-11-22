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
    <div className="mb-6 rounded-lg border border-dashed border-primary/40 bg-primary/5 p-4">
      <p className="mb-3 text-sm font-semibold text-foreground/80">
        ✨ Belum punya produk? Coba contoh dalam 1 klik:
      </p>
      <div className="flex flex-wrap gap-2">
        {samples.map((sample) => (
          <Button
            key={sample.id}
            type="button"
            variant="outline"
            size="sm"
            disabled={disabled}
            onClick={() => onSelect(sample)}
            className="border-border bg-card text-foreground hover:bg-muted"
          >
            Coba Contoh: {sample.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

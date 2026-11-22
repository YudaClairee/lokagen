"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { SlideContent } from "@/lib/types";

interface SlideTextEditorProps {
  index: number;
  slide: SlideContent;
  onChange: (next: SlideContent) => void;
}

const inputClass = "border-border bg-card text-foreground placeholder:text-muted-foreground";

export function SlideTextEditor({ index, slide, onChange }: SlideTextEditorProps) {
  const textField = (
    id: string,
    label: string,
    value: string,
    onValue: (v: string) => void,
    multiline = false
  ) => (
    <div key={id}>
      <Label htmlFor={id} className="mb-1 block text-xs text-foreground/80">
        {label}
      </Label>
      {multiline ? (
        <Textarea
          id={id}
          rows={2}
          value={value}
          onChange={(e) => onValue(e.target.value)}
          className={`resize-none ${inputClass}`}
        />
      ) : (
        <Input
          id={id}
          type="text"
          value={value}
          onChange={(e) => onValue(e.target.value)}
          className={inputClass}
        />
      )}
    </div>
  );

  let fields: React.ReactNode;

  switch (slide.type) {
    case "intro": {
      const s = slide;
      fields = (
        <>
          {textField("title", "Judul", s.title, (v) => onChange({ ...s, title: v }))}
          {textField("subtitle", "Subjudul", s.subtitle, (v) => onChange({ ...s, subtitle: v }), true)}
        </>
      );
      break;
    }
    case "features":
    case "benefits": {
      const s = slide;
      fields = (
        <>
          {textField("title", "Judul", s.title, (v) => onChange({ ...s, title: v }))}
          {s.bullets.map((bullet, i) =>
            textField(`bullet-${i}`, `Poin ${i + 1}`, bullet, (v) => {
              const bullets = [...s.bullets];
              bullets[i] = v;
              onChange({ ...s, bullets });
            })
          )}
        </>
      );
      break;
    }
    case "promo": {
      const s = slide;
      fields = (
        <>
          {textField("title", "Judul", s.title, (v) => onChange({ ...s, title: v }))}
          {textField("promoText", "Teks Promo", s.promoText, (v) => onChange({ ...s, promoText: v }), true)}
          {textField("highlightBadge", "Label Stiker", s.highlightBadge ?? "", (v) =>
            onChange({ ...s, highlightBadge: v })
          )}
        </>
      );
      break;
    }
    case "cta": {
      const s = slide;
      fields = (
        <>
          {textField("title", "Judul", s.title, (v) => onChange({ ...s, title: v }))}
          {textField("ctaText", "Teks CTA", s.ctaText, (v) => onChange({ ...s, ctaText: v }), true)}
        </>
      );
      break;
    }
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6 backdrop-blur-sm">
      <h3 className="mb-4 text-base font-semibold text-foreground">Edit Teks Slide #{index + 1}</h3>
      <div className="space-y-3">{fields}</div>
      <p className="mt-3 text-xs text-muted-foreground">Perubahan langsung tampil di preview dan ikut terunduh.</p>
    </div>
  );
}

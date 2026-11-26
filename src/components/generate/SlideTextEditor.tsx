"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { COPY_LIMITS } from "@/lib/constants";
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
    maxRecommended: number,
    multiline = false
  ) => {
    const isOver = value.length > maxRecommended;
    return (
      <div key={id}>
        <div className="mb-1 flex items-center justify-between gap-2">
          <Label htmlFor={id} className="block text-xs text-foreground/80">
            {label}
          </Label>
          <span className={`text-[11px] ${isOver ? "font-medium text-amber-700" : "text-muted-foreground"}`}>
            {value.length}/{maxRecommended}{isOver ? " (agak panjang)" : ""}
          </span>
        </div>
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
  };

  let fields: React.ReactNode;

  switch (slide.type) {
    case "intro": {
      const s = slide;
      fields = (
        <>
          {textField("title", "Judul", s.title, (v) => onChange({ ...s, title: v }), COPY_LIMITS.title.maxChars)}
          {textField("subtitle", "Subjudul", s.subtitle, (v) => onChange({ ...s, subtitle: v }), COPY_LIMITS.subtitle.maxChars, true)}
        </>
      );
      break;
    }
    case "features":
    case "benefits": {
      const s = slide;
      fields = (
        <>
          {textField("title", "Judul", s.title, (v) => onChange({ ...s, title: v }), COPY_LIMITS.title.maxChars)}
          {s.bullets.map((bullet, i) =>
            textField(
              `bullet-${i}`,
              `Poin ${i + 1}`,
              bullet,
              (v) => {
                const bullets = [...s.bullets];
                bullets[i] = v;
                onChange({ ...s, bullets });
              },
              COPY_LIMITS.bullet.maxChars
            )
          )}
        </>
      );
      break;
    }
    case "promo": {
      const s = slide;
      fields = (
        <>
          {textField("title", "Judul", s.title, (v) => onChange({ ...s, title: v }), COPY_LIMITS.title.maxChars)}
          {textField("promoText", "Teks Promo", s.promoText, (v) => onChange({ ...s, promoText: v }), COPY_LIMITS.promoText.maxChars, true)}
          {textField(
            "highlightBadge",
            "Label Stiker",
            s.highlightBadge ?? "",
            (v) => onChange({ ...s, highlightBadge: v }),
            COPY_LIMITS.highlightBadge.maxChars
          )}
        </>
      );
      break;
    }
    case "cta": {
      const s = slide;
      fields = (
        <>
          {textField("title", "Judul", s.title, (v) => onChange({ ...s, title: v }), COPY_LIMITS.title.maxChars)}
          {textField("ctaText", "Teks CTA", s.ctaText, (v) => onChange({ ...s, ctaText: v }), COPY_LIMITS.ctaText.maxChars, true)}
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

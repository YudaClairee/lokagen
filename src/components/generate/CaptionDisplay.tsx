"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CaptionDisplayProps {
  caption: string;
  onChange: (caption: string) => void;
  hashtags?: string[];
  whatsappTemplate?: string;
  onWhatsappChange: (text: string) => void;
}

type CaptionTab = "caption" | "hashtag" | "whatsapp";

const TABS: { value: CaptionTab; label: string }[] = [
  { value: "caption", label: "Caption IG" },
  { value: "hashtag", label: "Hashtag" },
  { value: "whatsapp", label: "Template WA" },
];

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(textarea);
    return ok;
  }
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!text.trim()) return;
    if (await copyText(text)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCopy}
      disabled={!text.trim()}
      className="gap-2 border-border bg-card text-foreground hover:bg-muted"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" />
          Disalin!
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          {label}
        </>
      )}
    </Button>
  );
}

export function CaptionDisplay({
  caption,
  onChange,
  hashtags = [],
  whatsappTemplate = "",
  onWhatsappChange,
}: CaptionDisplayProps) {
  const [tab, setTab] = useState<CaptionTab>("caption");

  return (
    <div className="rounded-xl border border-border bg-card p-6 backdrop-blur-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-foreground">Copywriting</h2>
        <div role="tablist" aria-label="Jenis copywriting" className="inline-flex gap-1 rounded-lg border border-border bg-card p-1">
          {TABS.map((t) => (
            <button
              key={t.value}
              type="button"
              role="tab"
              aria-selected={tab === t.value}
              onClick={() => setTab(t.value)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                tab === t.value ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {tab === "caption" && (
        <div className="space-y-3">
          <div className="flex justify-end">
            <CopyButton text={caption} label="Salin Caption" />
          </div>
          <Textarea
            value={caption}
            onChange={(e) => onChange(e.target.value)}
            rows={10}
            aria-label="Caption Instagram"
            className="resize-y border-border bg-card text-sm leading-relaxed text-foreground/80"
          />
          <p className="text-xs text-muted-foreground">
            Bisa diedit sebelum disalin. Hashtag sudah ada di baris terakhir caption.
          </p>
        </div>
      )}

      {tab === "hashtag" && (
        <div className="space-y-4">
          {hashtags.length > 0 ? (
            <>
              <div className="flex flex-wrap gap-2">
                {hashtags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-card px-3 py-1 text-sm text-foreground/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex justify-end">
                <CopyButton text={hashtags.join(" ")} label="Salin Semua Hashtag" />
              </div>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">Belum ada hashtag. Generate ulang untuk mendapatkannya.</p>
          )}
        </div>
      )}

      {tab === "whatsapp" && (
        <div className="space-y-3">
          <div className="flex justify-end">
            <CopyButton text={whatsappTemplate} label="Salin Template" />
          </div>
          <Textarea
            value={whatsappTemplate}
            onChange={(e) => onWhatsappChange(e.target.value)}
            rows={6}
            placeholder="Template balasan admin WA akan muncul di sini setelah generate."
            aria-label="Template balasan WhatsApp"
            className="resize-y border-border bg-card text-sm leading-relaxed text-foreground/80"
          />
          <p className="text-xs text-muted-foreground">Teks siap pakai untuk admin toko saat pembeli chat via WhatsApp.</p>
        </div>
      )}
    </div>
  );
}

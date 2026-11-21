"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check } from "lucide-react";

interface CaptionDisplayProps {
  caption: string;
  onChange: (caption: string) => void;
}

export function CaptionDisplay({ caption, onChange }: CaptionDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(caption);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = caption;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Caption Instagram</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="gap-2 border-white/10 bg-white/5 text-white hover:bg-white/10"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Disalin!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Salin
            </>
          )}
        </Button>
      </div>
      <Textarea
        value={caption}
        onChange={(e) => onChange(e.target.value)}
        rows={10}
        aria-label="Caption Instagram"
        className="resize-y border-white/5 bg-slate-800/50 text-sm leading-relaxed text-slate-300"
      />
      <p className="mt-2 text-xs text-slate-500">Bisa diedit sebelum disalin.</p>
    </div>
  );
}

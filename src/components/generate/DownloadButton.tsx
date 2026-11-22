"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { toPng } from "html-to-image";
import { TOTAL_SLIDES } from "@/lib/constants";

interface DownloadButtonProps {
  slideRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  productName?: string;
  currentSlide: number;
}

const makeSlug = (productName?: string) =>
  (productName || "lokagen").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "lokagen";

function triggerDownload(dataUrl: string, filename: string) {
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  link.click();
}

export function DownloadButton({ slideRefs, productName, currentSlide }: DownloadButtonProps) {
  const [downloading, setDownloading] = useState<"one" | "all" | null>(null);

  const slug = makeSlug(productName);

  const renderSlide = async (index: number) => {
    const node = slideRefs.current[index];
    if (!node) throw new Error(`Slide ${index + 1} belum siap`);
    // Pastikan font tema sudah termuat; kalau belum, PNG bisa memakai font cadangan.
    await document.fonts.ready;
    return toPng(node, {
      quality: 1,
      pixelRatio: 2, // ukuran logis x 2: 1080x1080 (feed) atau 1080x1920 (story)
      cacheBust: true,
      backgroundColor: "#000",
    });
  };

  const handleDownloadOne = async () => {
    setDownloading("one");
    try {
      const dataUrl = await renderSlide(currentSlide);
      triggerDownload(dataUrl, `${slug}-slide-${currentSlide + 1}.png`);
    } catch (error) {
      console.error("Error downloading slide:", error);
      alert("Gagal download slide. Coba lagi ya!");
    } finally {
      setDownloading(null);
    }
  };

  const handleDownloadAll = async () => {
    setDownloading("all");
    try {
      for (let i = 0; i < TOTAL_SLIDES; i++) {
        const dataUrl = await renderSlide(i);
        triggerDownload(dataUrl, `${slug}-slide-${i + 1}.png`);
        // Jeda kecil agar browser tidak memblokir unduhan beruntun
        await new Promise((resolve) => setTimeout(resolve, 300));
      }
    } catch (error) {
      console.error("Error downloading slides:", error);
      alert("Gagal download slides. Coba lagi ya!");
    } finally {
      setDownloading(null);
    }
  };

  const busy = downloading !== null;

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleDownloadOne}
        disabled={busy}
        className="gap-2 border-border bg-card text-foreground hover:bg-muted"
      >
        {downloading === "one" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Downloading...
          </>
        ) : (
          <>
            <Download className="h-4 w-4" />
            Download Slide Ini
          </>
        )}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleDownloadAll}
        disabled={busy}
        className="gap-2 border-border bg-card text-foreground hover:bg-muted"
      >
        {downloading === "all" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Downloading...
          </>
        ) : (
          <>
            <Download className="h-4 w-4" />
            Download Semua (5)
          </>
        )}
      </Button>
    </div>
  );
}

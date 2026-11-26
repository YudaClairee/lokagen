"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { toPng } from "html-to-image";
import { TOTAL_SLIDES } from "@/lib/constants";
import type { SlideFormat } from "@/lib/types";

interface DownloadButtonProps {
  slideRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  productName?: string;
  currentSlide: number;
  format: SlideFormat;
}

const makeSlug = (productName?: string) =>
  (productName || "lokagen").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "lokagen";

function triggerDownload(dataUrl: string, filename: string) {
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

async function waitForImages(node: HTMLElement) {
  const imgs = Array.from(node.querySelectorAll("img"));
  await Promise.all(
    imgs.map((img) => {
      if (img.complete && img.naturalWidth > 0) return img.decode?.().catch(() => {});
      return new Promise<void>((resolve) => {
        img.addEventListener("load", () => resolve(), { once: true });
        img.addEventListener("error", () => resolve(), { once: true });
      });
    })
  );
}

export function DownloadButton({ slideRefs, productName, currentSlide, format }: DownloadButtonProps) {
  const [downloading, setDownloading] = useState<"one" | "all" | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [downloadError, setDownloadError] = useState<string>("");

  const slug = makeSlug(productName);
  const formatTag = format === "story" ? "story" : "feed";

  const renderSlide = async (index: number) => {
    const node = slideRefs.current[index];
    if (!node) throw new Error(`Slide ${index + 1} belum siap`);
    // Pastikan font tema dan seluruh <img> di dalam slide selesai dimuat sebelum ekspor.
    await document.fonts.ready;
    await waitForImages(node);
    const options = {
      quality: 1,
      pixelRatio: 2, // ukuran logis x 2: 1080x1080 (feed) atau 1080x1920 (story)
      cacheBust: true,
      backgroundColor: "#000",
    };
    return toPng(node, options);
  };

  const handleDownloadOne = async () => {
    setDownloadError("");
    setDownloading("one");
    try {
      const dataUrl = await renderSlide(currentSlide);
      triggerDownload(dataUrl, `${slug}-${formatTag}-slide-${currentSlide + 1}.png`);
    } catch (error) {
      console.error("Error downloading slide:", error);
      setDownloadError("Gagal mengunduh slide. Coba lagi atau buka di Chrome/Safari ya!");
    } finally {
      setDownloading(null);
    }
  };

  const handleDownloadAll = async () => {
    setDownloadError("");
    setDownloading("all");
    setProgress(0);
    try {
      for (let i = 0; i < TOTAL_SLIDES; i++) {
        setProgress(i + 1);
        const dataUrl = await renderSlide(i);
        triggerDownload(dataUrl, `${slug}-${formatTag}-slide-${i + 1}.png`);
        // Jeda kecil agar browser tidak memblokir unduhan beruntun
        await new Promise((resolve) => setTimeout(resolve, 400));
      }
    } catch (error) {
      console.error("Error downloading slides:", error);
      setDownloadError("Gagal mengunduh semua slide. Coba unduh satu per satu lewat 'Download Slide Ini' ya!");
    } finally {
      setDownloading(null);
      setProgress(0);
    }
  };

  const busy = downloading !== null;

  return (
    <div className="flex flex-col items-end gap-1.5">
      <div className="flex flex-wrap justify-end gap-2">
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
              Mengunduh...
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
              Mengunduh {progress}/{TOTAL_SLIDES}...
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Download Semua ({TOTAL_SLIDES})
            </>
          )}
        </Button>
      </div>
      {downloadError && (
        <p role="alert" className="text-right text-xs text-red-700">
          {downloadError}
        </p>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2, Share2 } from "lucide-react";
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

function dataUrlToFile(dataUrl: string, filename: string): File {
  const [header, base64] = dataUrl.split(",");
  const mime = /data:(.*?);/.exec(header)?.[1] || "image/png";
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new File([bytes], filename, { type: mime });
}

function isTouchDevice(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
}

function canShareFiles(files: File[]): boolean {
  return (
    typeof navigator !== "undefined" &&
    typeof navigator.share === "function" &&
    typeof navigator.canShare === "function" &&
    navigator.canShare({ files })
  );
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
  // Menyimpan 5 file hasil render bila iOS Safari butuh tap ulang agar user-gesture segar untuk navigator.share
  const [pendingShare, setPendingShare] = useState<{ key: string; files: File[] } | null>(null);

  const slug = makeSlug(productName);
  const formatTag = format === "story" ? "story" : "feed";
  const shareKey = `${slug}:${formatTag}`;
  const readyShareFiles = pendingShare?.key === shareKey ? pendingShare.files : null;

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
    setPendingShare(null);
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

  const handleShareReadyFiles = async () => {
    if (!readyShareFiles) return;
    setDownloadError("");
    try {
      await navigator.share({
        files: readyShareFiles,
        title: productName || "Carousel LokaGen",
      });
      setPendingShare(null);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
      console.error("Error sharing slides:", error);
      setDownloadError("Gagal membuka menu bagikan. Coba unduh satu per satu lewat 'Download Slide Ini' ya!");
      setPendingShare(null);
    }
  };

  const handleDownloadAll = async () => {
    setDownloadError("");
    setPendingShare(null);
    setDownloading("all");
    setProgress(0);
    try {
      const rendered: { dataUrl: string; filename: string }[] = [];
      for (let i = 0; i < TOTAL_SLIDES; i++) {
        setProgress(i + 1);
        const dataUrl = await renderSlide(i);
        const filename = `${slug}-${formatTag}-slide-${i + 1}.png`;
        rendered.push({ dataUrl, filename });
      }

      // Di HP (iOS Safari / Chrome Android), gunakan Web Share API agar 5 slide bisa langsung disimpan ke Galeri.
      if (isTouchDevice()) {
        const files = rendered.map(({ dataUrl, filename }) => dataUrlToFile(dataUrl, filename));
        if (canShareFiles(files)) {
          try {
            await navigator.share({
              files,
              title: productName || "Carousel LokaGen",
            });
            return;
          } catch (error) {
            if (error instanceof DOMException && error.name === "AbortError") {
              return;
            }
            if (error instanceof DOMException && error.name === "NotAllowedError") {
              // Safari kadang menganggap jeda render >1 detik sudah keluar dari user gesture;
              // tampilkan tombol 1-tap instan agar langsung membuka share sheet.
              setPendingShare({ key: shareKey, files });
              return;
            }
            // Error lain: fallback ke download biasa
            console.warn("Web Share gagal, fallback ke download:", error);
          }
        }
      }

      for (const { dataUrl, filename } of rendered) {
        triggerDownload(dataUrl, filename);
        // Jeda kecil agar browser desktop tidak memblokir unduhan beruntun
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
    <div className="flex w-full flex-col items-stretch gap-1.5 sm:w-auto sm:items-end">
      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownloadOne}
          disabled={busy}
          className="w-full gap-1.5 border-border bg-card px-2.5 text-xs text-foreground hover:bg-muted sm:w-auto sm:gap-2 sm:px-3 sm:text-sm"
        >
          {downloading === "one" ? (
            <>
              <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin sm:h-4 sm:w-4" />
              <span className="truncate">Mengunduh...</span>
            </>
          ) : (
            <>
              <Download className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
              <span className="truncate">Download Slide Ini</span>
            </>
          )}
        </Button>
        {readyShareFiles ? (
          <Button
            size="sm"
            onClick={handleShareReadyFiles}
            className="w-full gap-1.5 bg-primary px-2.5 text-xs text-primary-foreground hover:bg-primary/90 sm:w-auto sm:gap-2 sm:px-3 sm:text-sm"
          >
            <Share2 className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
            <span className="truncate">Simpan / Bagikan ({TOTAL_SLIDES})</span>
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadAll}
            disabled={busy}
            className="w-full gap-1.5 border-border bg-card px-2.5 text-xs text-foreground hover:bg-muted sm:w-auto sm:gap-2 sm:px-3 sm:text-sm"
          >
            {downloading === "all" ? (
              <>
                <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin sm:h-4 sm:w-4" />
                <span className="truncate">Menyiapkan {progress}/{TOTAL_SLIDES}...</span>
              </>
            ) : (
              <>
                <Download className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
                <span className="truncate">Download Semua ({TOTAL_SLIDES})</span>
              </>
            )}
          </Button>
        )}
      </div>
      {readyShareFiles && (
        <p className="text-left text-xs text-muted-foreground sm:text-right">
          5 slide siap! Tap tombol di atas untuk simpan ke Galeri atau kirim ke IG/WA.
        </p>
      )}
      {downloadError && (
        <p role="alert" className="text-left text-xs text-red-700 sm:text-right">
          {downloadError}
        </p>
      )}
    </div>
  );
}

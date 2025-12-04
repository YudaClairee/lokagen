"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { toPng } from "html-to-image";

interface DownloadButtonProps {
  slideRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

export function DownloadButton({ slideRefs }: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);

    try {
      const slides = slideRefs.current.filter(Boolean);

      for (let i = 0; i < slides.length; i++) {
        const slide = slides[i];
        if (!slide) continue;

        const dataUrl = await toPng(slide, {
          quality: 1,
          pixelRatio: 2,
          backgroundColor: "#000",
        });

        // Create download link
        const link = document.createElement("a");
        link.download = `lokagen-slide.png`;
        link.href = dataUrl;
        link.click();

        // Small delay between downloads
        await new Promise((resolve) => setTimeout(resolve, 300));
      }
    } catch (error) {
      console.error("Error downloading slides:", error);
      alert("Gagal download slides. Coba lagi ya!");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleDownload}
      disabled={isDownloading}
      className="gap-2 border-white/10 bg-white/5 text-white hover:bg-white/10"
    >
      {isDownloading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Downloading...
        </>
      ) : (
        <>
          <Download className="h-4 w-4" />
          Download Slide
        </>
      )}
    </Button>
  );
}


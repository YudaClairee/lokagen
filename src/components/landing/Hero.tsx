"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, PlayCircle } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden pt-24 pb-12 sm:pt-32 md:min-h-screen md:pt-40 md:pb-16">
      {/* Background removed to show global grid */}

      <div className="container relative z-10 mx-auto px-4 text-center md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-primary backdrop-blur-sm sm:mb-6 sm:px-4 sm:text-sm"
        >
          <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          <span>Asisten Konten AI untuk UMKM</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mb-5 max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:mb-6 sm:text-5xl md:text-7xl lg:text-8xl"
        >
          Buat Konten IG <br />
          <span className="text-primary">Profesional</span> Instan
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mb-7 max-w-2xl text-base text-muted-foreground sm:mb-8 sm:text-lg md:text-xl"
        >
          LokaGen membantu UMKM membuat konten Instagram dan caption menarik
          secara otomatis. Tanpa perlu skill desain, siap posting dalam hitungan
          detik.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-auto flex w-full max-w-xs flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center sm:gap-4"
        >
          <Link
            href="/generate"
            className="group flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-white transition-all hover:bg-primary/90 sm:px-8 sm:text-base"
          >
            Coba Sekarang Gratis
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="#how-it-works"
            className="flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-card px-6 text-sm font-medium text-foreground backdrop-blur-sm transition-colors hover:bg-muted sm:px-8 sm:text-base"
          >
            <PlayCircle className="h-4 w-4" />
            Lihat Cara Kerja
          </Link>
        </motion.div>

        {/* Clean Preview Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative mx-auto mt-12 w-full max-w-5xl rounded-xl border border-border bg-card p-1.5 shadow-2xl backdrop-blur-md sm:mt-16 sm:p-2 md:mt-20"
        >
          <div className="flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border border-border bg-muted p-1 sm:p-2">
            <Image src="/preview.png" alt="Preview" width={1000} height={1000} className="w-full h-full object-cover rounded" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, PlayCircle } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-40">
      {/* Background removed to show global grid */}

      <div className="container relative z-10 mx-auto px-4 text-center md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm"
        >
          <Sparkles className="h-4 w-4" />
          <span>Asisten Konten AI untuk UMKM</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mb-6 max-w-4xl text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl"
        >
          Buat Konten IG <br />
          <span className="text-primary">Profesional</span> Instan
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl"
        >
          LokaGen membantu UMKM membuat konten Instagram dan caption menarik
          secara otomatis. Tanpa perlu skill desain, siap posting dalam hitungan
          detik.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/generate"
            className="group flex h-12 items-center gap-2 rounded-full bg-primary px-8 text-base font-medium text-white transition-all hover:bg-primary/90"
          >
            Coba Sekarang Gratis
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="#how-it-works"
            className="flex h-12 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 text-base font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10"
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
          className="relative mx-auto mt-20 w-full max-w-5xl rounded-xl border border-white/10 bg-zinc-900/50 p-2 shadow-2xl backdrop-blur-md"
        >
          <div className="aspect-video w-full rounded-lg bg-zinc-950/50 flex items-center justify-center border border-white/5">
            <p className="text-muted-foreground text-sm">
              Preview Dashboard / Hasil Generator
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

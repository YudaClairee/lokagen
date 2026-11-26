"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="absolute inset-0 bg-primary/5 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]" />

      <div className="container relative z-10 mx-auto px-4 text-center md:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.15 }}
          className="mx-auto max-w-4xl rounded-2xl border border-border bg-card p-6 backdrop-blur-md sm:rounded-3xl sm:p-10 md:p-12"
        >
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-foreground sm:mb-6 sm:text-3xl md:text-5xl">
            Siap Mengubah Tampilan <br />
            <span className="text-primary">Sosial Media Anda?</span>
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-base text-muted-foreground sm:mb-8 sm:text-lg">
            Bergabunglah menjadi UMKM yang menggunakan LokaGen untuk
            membuat konten profesional dalam hitungan detik.
          </p>

          <Link
            href="/generate"
            className="group inline-flex h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-primary px-6 text-sm font-medium text-white transition-all hover:bg-primary/90 hover:scale-105 sm:w-auto sm:px-8 sm:text-base"
          >
            Mulai Buat Konten Gratis
            <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="relative py-24">
      <div className="absolute inset-0 bg-primary/5 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]" />

      <div className="container relative z-10 mx-auto px-4 text-center md:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl rounded-3xl border border-slate-800 bg-slate-900/50 p-12 backdrop-blur-md"
        >
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-white md:text-5xl">
            Siap Mengubah Tampilan <br />
            <span className="text-primary">Sosial Media Anda?</span>
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Bergabunglah dengan ribuan UMKM yang menggunakan LokaGen untuk
            membuat konten profesional dalam hitungan detik.
          </p>

          <Link
            href="/generate"
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-primary px-8 text-base font-medium text-white transition-all hover:bg-primary/90 hover:scale-105"
          >
            Mulai Buat Konten Gratis
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

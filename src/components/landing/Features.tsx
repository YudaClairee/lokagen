"use client";

import { motion } from "framer-motion";
import {
  Wand2,
  LayoutTemplate,
  Palette,
  Zap,
  Download,
  Share2,
} from "lucide-react";

const features = [
  {
    icon: Wand2,
    title: "Penulisan AI Otomatis",
    description:
      "Buat caption dan headline menarik yang disesuaikan dengan tone brand Anda secara instan.",
  },
  {
    icon: LayoutTemplate,
    title: "Template Cerdas",
    description:
      "Pilih dari berbagai template visual profesional yang dioptimalkan untuk engagement sosial media.",
  },
  {
    icon: Palette,
    title: "Kustomisasi Brand",
    description:
      "Terapkan warna dan gaya brand Anda dengan satu klik untuk menjaga konsistensi.",
  },
  {
    icon: Zap,
    title: "Super Cepat",
    description:
      "Dari foto produk hingga konten siap posting hanya dalam waktu kurang dari 30 detik.",
  },
  {
    icon: Download,
    title: "Ekspor Instan",
    description:
      "Unduh carousel berkualitas tinggi (PNG) yang siap diunggah ke Instagram.",
  },
  {
    icon: Share2,
    title: "Fokus Engagement",
    description:
      "Struktur konten yang dirancang untuk memaksimalkan save, share, dan komentar.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-16 sm:py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-10 text-center md:mb-16">
          <h2 className="mb-3 text-2xl font-bold tracking-tight text-foreground sm:mb-4 sm:text-3xl md:text-5xl">
            Semua yang Anda Butuhkan untuk <br />
            <span className="text-primary">Viral</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
            LokaGen menggabungkan kecerdasan AI dengan alat desain profesional
            untuk membantu konten Anda tampil beda.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true, amount: 0.15 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 backdrop-blur-sm transition-colors hover:bg-muted/50 sm:p-8"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground sm:h-12 sm:w-12">
                <feature.icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-foreground sm:text-xl">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground sm:text-base">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

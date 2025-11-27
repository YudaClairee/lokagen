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
    <section id="features" className="relative py-40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-5xl">
            Semua yang Anda Butuhkan untuk <br />
            <span className="text-primary">Viral</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            LokaGen menggabungkan kecerdasan AI dengan alat desain profesional
            untuk membantu konten Anda tampil beda.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-sm transition-colors hover:bg-slate-800/50"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

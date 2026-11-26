"use client";

import { motion } from "framer-motion";
import { Upload, Sliders, Sparkles } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "1. Upload Produk",
    description:
      "Cukup unggah foto produk Anda. Tidak perlu foto studio profesional.",
  },
  {
    icon: Sliders,
    title: "2. Kustomisasi Gaya",
    description:
      "Pilih tone bahasa, tema visual, dan warna brand yang Anda inginkan.",
  },
  {
    icon: Sparkles,
    title: "3. Generate Magic",
    description:
      "AI kami akan membuat carousel dan caption menakjubkan dalam hitungan detik.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-10 text-center md:mb-16">
          <h2 className="mb-3 text-2xl font-bold tracking-tight text-foreground sm:mb-4 sm:text-3xl md:text-5xl">
            Cara <span className="text-primary">Kerja</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
            Tiga langkah mudah untuk konten sosial media profesional.
          </p>
        </div>

        <div className="relative grid gap-8 md:grid-cols-3">
          {/* Connecting Line (Desktop) */}
          <div className="absolute top-12 left-0 hidden h-0.5 w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-primary/50 to-transparent md:block" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true, amount: 0.15 }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative z-10 mb-4 flex h-18 w-18 items-center justify-center rounded-full border-4 border-background bg-secondary text-primary shadow-xl sm:mb-6 sm:h-20 sm:w-20 md:h-24 md:w-24">
                <step.icon className="h-8 w-8 md:h-10 md:w-10" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-foreground sm:text-xl">
                {step.title}
              </h3>
              <p className="max-w-xs text-sm text-muted-foreground sm:max-w-none sm:text-base">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

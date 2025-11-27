"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "LokaGen menghemat waktu saya berjam-jam. Desainnya terlihat seperti saya menyewa agensi profesional!",
    author: "Sari",
    role: "Pemilik, Kopi Kenangan Hati",
  },
  {
    quote:
      "Akhirnya ada alat AI yang mengerti konteks pasar lokal. Sangat direkomendasikan.",
    author: "Budi",
    role: "Founder, Batik Modern",
  },
  {
    quote:
      "Saya sekarang bisa posting setiap hari tanpa pusing mikirin caption atau desain. Game changer.",
    author: "Rina",
    role: "Pemilik, Snack Mantap",
  },
];

export function SocialProof() {
  return (
    <section id="testimonials" className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-5xl">
            Dipercaya oleh <span className="text-gradient">UMKM Lokal</span>
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-sm transition-colors hover:bg-slate-800/50"
            >
              <p className="mb-6 text-lg italic text-slate-300">
                "{testimonial.quote}"
              </p>
              <div>
                <p className="font-bold text-white">{testimonial.author}</p>
                <p className="text-sm text-primary">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privasi & Ketentuan - LokaGen",
  description: "Kebijakan privasi dan syarat penggunaan LokaGen selama tahap uji coba.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-12 text-foreground">
      <div className="mx-auto max-w-2xl space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Beranda
        </Link>

        <article className="space-y-8 rounded-2xl border border-border bg-card p-8">
          <section className="space-y-3">
            <h1 className="text-2xl font-bold text-foreground">Kebijakan Privasi</h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              LokaGen menghargai privasi data usaha dan produk Anda. Berikut cara data diproses di aplikasi ini:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-foreground/80">
              <li>
                <strong>Foto &amp; deskripsi produk:</strong> dikirim ke penyedia layanan AI (OpenRouter) hanya untuk
                menghasilkan teks carousel, caption, dan template WhatsApp. LokaGen tidak menyimpan foto produk Anda di server.
              </li>
              <li>
                <strong>Profil toko &amp; riwayat konten:</strong> disimpan secara lokal di browser perangkat Anda
                (<code>localStorage</code>) agar tidak perlu mengetik ulang. Anda dapat menghapusnya kapan saja dengan
                membersihkan data situs di browser.
              </li>
              <li>
                <strong>Akun Google &amp; kuota uji coba:</strong> saat Anda masuk menggunakan Google, kami menyimpan
                nama, alamat email, dan sisa kuota uji coba gratis Anda di database (Supabase) untuk mencegah
                penyalahgunaan kuota dan menjaga sesi login Anda.
              </li>
            </ul>
          </section>

          <section id="ketentuan" className="space-y-3 border-t border-border pt-6">
            <h2 className="text-xl font-bold text-foreground">Syarat &amp; Ketentuan</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-foreground/80">
              <li>
                LokaGen saat ini berada dalam tahap <strong>uji coba terbatas (beta)</strong>. Fitur dan kuota
                penggunaan dapat berubah sewaktu-waktu.
              </li>
              <li>
                Konten yang dihasilkan AI adalah draf bantu. Mohon periksa kembali harga, detail promo, klaim produk,
                dan kontak sebelum dipublikasikan ke media sosial Anda.
              </li>
              <li>
                Anda bertanggung jawab atas hak penggunaan foto dan informasi produk yang diunggah.
              </li>
            </ul>
          </section>
        </article>
      </div>
    </main>
  );
}

import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-slate-800 bg-black/20 backdrop-blur-md py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              LokaGen
            </span>
          </div>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} LokaGen. Hak cipta dilindungi.
          </p>

          <div className="flex gap-6">
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-white"
            >
              Kebijakan Privasi
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-white"
            >
              Syarat & Ketentuan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

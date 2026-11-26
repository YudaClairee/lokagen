import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border bg-muted py-8 backdrop-blur-md md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:gap-6 md:flex-row md:text-left">
          <div className="flex items-center gap-2">
            <Image src="/lokagen-logo.png" alt="LokaGen" width={520} height={189} className="h-8 w-auto sm:h-10" />
          </div>

          <p className="text-xs text-muted-foreground sm:text-sm">
            © {new Date().getFullYear()} LokaGen. Hak cipta dilindungi.
          </p>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <Link
              href="/privasi"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Kebijakan Privasi
            </Link>
            <Link
              href="/privasi#ketentuan"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Syarat & Ketentuan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

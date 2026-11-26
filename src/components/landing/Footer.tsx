import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border bg-muted backdrop-blur-md py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <Image src="/lokagen-logo.png" alt="LokaGen" width={520} height={189} className="h-10 w-auto" />
          </div>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} LokaGen. Hak cipta dilindungi.
          </p>

          <div className="flex gap-6">
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

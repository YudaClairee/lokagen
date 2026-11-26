"use client";

import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={cn(
          "flex h-14 w-full max-w-4xl items-center justify-between rounded-full px-6 transition-all duration-300",
          isScrolled
            ? "bg-card backdrop-blur-md border border-border shadow-lg"
            : "bg-transparent border border-transparent"
        )}
      >
        <Link href="/" className="flex items-center gap-2">
          <Image src="/lokagen-logo.png" alt="LokaGen" width={520} height={189} priority className="h-9 w-auto" />
        </Link>

        {/* <div className="hidden md:flex items-center gap-6">
          <Link
            href="#features"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Fitur
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Cara Kerja
          </Link>
        </div> */}

        <div className="flex items-center gap-4">
          <Link
            href="/generate"
            className="rounded-full bg-primary px-4 py-1.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Mulai
          </Link>
        </div>
      </motion.nav>
    </div>
  );
}

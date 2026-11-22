import { Anton, Fraunces, JetBrains_Mono, Lilita_One, Space_Grotesk } from "next/font/google";

// Font khusus tema carousel. Outfit (font dasar aplikasi) tetap di root layout.
// Dimuat hanya di layout /generate dan /test-slides, agar halaman landing tidak ikut mengunduhnya.
// Variabel CSS dipetakan ke utility Tailwind (font-minimal-display, dst.) di globals.css.

const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"] });
const lilitaOne = Lilita_One({ variable: "--font-lilita-one", subsets: ["latin"], weight: "400" });
const anton = Anton({ variable: "--font-anton", subsets: ["latin"], weight: "400" });

/** Taruh di className pembungkus halaman yang merender slide. */
export const themeFontVariables = [
  fraunces.variable,
  spaceGrotesk.variable,
  jetbrainsMono.variable,
  lilitaOne.variable,
  anton.variable,
].join(" ");

import { notFound } from "next/navigation";
import { themeFontVariables } from "@/lib/fonts";

export default function TestSlidesLayout({ children }: { children: React.ReactNode }) {
  // Halaman uji visual hanya aktif di mode development.
  if (process.env.NODE_ENV === "production") {
    notFound();
  }
  return <div className={themeFontVariables}>{children}</div>;
}

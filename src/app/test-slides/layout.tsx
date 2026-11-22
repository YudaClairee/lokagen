import { themeFontVariables } from "@/lib/fonts";

export default function TestSlidesLayout({ children }: { children: React.ReactNode }) {
  return <div className={themeFontVariables}>{children}</div>;
}

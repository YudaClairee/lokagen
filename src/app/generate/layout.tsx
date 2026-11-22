import { themeFontVariables } from "@/lib/fonts";

export default function GenerateLayout({ children }: { children: React.ReactNode }) {
  return <div className={themeFontVariables}>{children}</div>;
}

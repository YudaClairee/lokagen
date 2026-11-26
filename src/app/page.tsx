import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { SocialProof } from "@/components/landing/SocialProof";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";
import { themeFontVariables } from "@/lib/fonts";

export default function Home() {
  return (
    <main className={`${themeFontVariables} min-h-screen overflow-x-clip text-foreground selection:bg-primary selection:text-primary-foreground`}>
      <div className="min-h-screen w-full bg-background relative">
        {/* Dark Sphere Grid Background */}
        <div
          className="fixed inset-0 z-0"
          style={{
            background: "#FFF8F0",
            backgroundImage: `
        linear-gradient(to right, rgba(28,25,23,0.08) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(28,25,23,0.08) 1px, transparent 1px),
        radial-gradient(circle at 50% 50%, rgba(194,65,12,0.08) 0%, transparent 70%)
      `,
            backgroundSize: "32px 32px, 32px 32px, 100% 100%",
          }}
        />
        {/* Your Content/Components */}
        <Navbar />
        <Hero />
        <Features />
        <HowItWorks />
        <SocialProof />
        <CTA />
        <Footer />
      </div>
    </main>
  );
}

import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { SocialProof } from "@/components/landing/SocialProof";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen text-white selection:bg-primary selection:text-white">
      <div className="min-h-screen w-full bg-[#020617] relative">
        {/* Dark Sphere Grid Background */}
        <div
          className="fixed inset-0 z-0"
          style={{
            background: "#020617",
            backgroundImage: `
        linear-gradient(to right, rgba(71,85,105,0.3) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(71,85,105,0.3) 1px, transparent 1px),
        radial-gradient(circle at 50% 50%, rgba(139,92,246,0.15) 0%, transparent 70%)
      `,
            backgroundSize: "32px 32px, 32px 32px, 100% 100%",
          }}
        />
        {/* Your Content/Components */}
        <Navbar />
        <Hero />
        <Features />
        <HowItWorks />
        {/* <SocialProof /> */}
        <CTA />
        <Footer />
      </div>
    </main>
  );
}

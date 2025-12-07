"use client";

import React, { useState } from 'react';
import { SlideIntro as BoldIntro } from "@/components/carousel/themes/bold-typography/SlideIntro";
import { SlideFeatures as BoldFeatures } from "@/components/carousel/themes/bold-typography/SlideFeatures";
import { SlideBenefits as BoldBenefits } from "@/components/carousel/themes/bold-typography/SlideBenefits";
import { SlidePromo as BoldPromo } from "@/components/carousel/themes/bold-typography/SlidePromo";
import { SlideCTA as BoldCTA } from "@/components/carousel/themes/bold-typography/SlideCTA";

import { SlideIntro as ColorfulIntro } from "@/components/carousel/themes/colorful-genz/SlideIntro";
import { SlideFeatures as ColorfulFeatures } from "@/components/carousel/themes/colorful-genz/SlideFeatures";
import { SlideBenefits as ColorfulBenefits } from "@/components/carousel/themes/colorful-genz/SlideBenefits";
import { SlidePromo as ColorfulPromo } from "@/components/carousel/themes/colorful-genz/SlidePromo";
import { SlideCTA as ColorfulCTA } from "@/components/carousel/themes/colorful-genz/SlideCTA";

import { SlideIntro as DarkIntro } from "@/components/carousel/themes/dark-futuristic/SlideIntro";
import { SlideFeatures as DarkFeatures } from "@/components/carousel/themes/dark-futuristic/SlideFeatures";
import { SlideBenefits as DarkBenefits } from "@/components/carousel/themes/dark-futuristic/SlideBenefits";
import { SlidePromo as DarkPromo } from "@/components/carousel/themes/dark-futuristic/SlidePromo";
import { SlideCTA as DarkCTA } from "@/components/carousel/themes/dark-futuristic/SlideCTA";

import { SlideIntro as MinimalIntro } from "@/components/carousel/themes/minimal-clean/SlideIntro";
import { SlideFeatures as MinimalFeatures } from "@/components/carousel/themes/minimal-clean/SlideFeatures";
import { SlideBenefits as MinimalBenefits } from "@/components/carousel/themes/minimal-clean/SlideBenefits";
import { SlidePromo as MinimalPromo } from "@/components/carousel/themes/minimal-clean/SlidePromo";
import { SlideCTA as MinimalCTA } from "@/components/carousel/themes/minimal-clean/SlideCTA";

import { SlideIntro, SlideFeatures, SlideBenefits, SlidePromo, SlideCTA } from "@/lib/types";

// Mock Data
const introData: SlideIntro = {
  type: "intro",
  title: "Super Mega Product 3000",
  subtitle: "The future of everything is here now",
};

const featuresData: SlideFeatures = {
  type: "features",
  title: "Key Features",
  bullets: [
    "Ultra-fast processing speed",
    "AI-powered recommendations",
    "Seamless integration",
    "24/7 Support access",
  ],
};

const benefitsData: SlideBenefits = {
  type: "benefits",
  title: "Why Choose Us?",
  bullets: [
    "Increase productivity by 200%",
    "Save hours of manual work",
    "Reduce error rates significantly",
    "Scale your business effortlessly",
  ],
};

const promoData: SlidePromo = {
  type: "promo",
  title: "Limited Time Offer",
  promoText: "Get 50% off your first subscription year. Valid until tomorrow!",
};

const ctaData: SlideCTA = {
  type: "cta",
  title: "Ready to Start?",
  ctaText: "Get Started Now",
};

// Colors
const colors = {
  bold: "#E63946",
  colorful: "#8B5CF6",
  dark: "#00F0FF",
  minimal: "#333333",
};

// Placeholder image (using a solid color div for now if image fails, but here's a placeholder URL)
const placeholderImage = "https://placehold.co/400x400/png"; 

export default function TestSlidesPage() {
  const [theme, setTheme] = useState<'bold' | 'colorful' | 'dark' | 'minimal'>('bold');

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="mb-6 text-2xl font-bold">Slide Theme Tester</h1>
      
      <div className="mb-8 flex gap-4">
        <button onClick={() => setTheme('bold')} className={`px-4 py-2 rounded ${theme === 'bold' ? 'bg-blue-600 text-white' : 'bg-white'}`}>Bold Typography</button>
        <button onClick={() => setTheme('colorful')} className={`px-4 py-2 rounded ${theme === 'colorful' ? 'bg-blue-600 text-white' : 'bg-white'}`}>Colorful Gen-Z</button>
        <button onClick={() => setTheme('dark')} className={`px-4 py-2 rounded ${theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-white'}`}>Dark Futuristic</button>
        <button onClick={() => setTheme('minimal')} className={`px-4 py-2 rounded ${theme === 'minimal' ? 'bg-blue-600 text-white' : 'bg-white'}`}>Minimal Clean</button>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {/* Intro */}
        <div className="flex flex-col gap-2">
            <h2 className="text-sm font-semibold text-gray-500">Intro</h2>
            <div className="aspect-square w-full sm:w-[320px]">
                {theme === 'bold' && <BoldIntro data={introData} brandColor={colors.bold} productImage={placeholderImage} />}
                {theme === 'colorful' && <ColorfulIntro data={introData} brandColor={colors.colorful} productImage={placeholderImage} />}
                {theme === 'dark' && <DarkIntro data={introData} brandColor={colors.dark} productImage={placeholderImage} />}
                {theme === 'minimal' && <MinimalIntro data={introData} brandColor={colors.minimal} productImage={placeholderImage} />}
            </div>
        </div>

        {/* Features */}
        <div className="flex flex-col gap-2">
            <h2 className="text-sm font-semibold text-gray-500">Features</h2>
            <div className="aspect-square w-full sm:w-[320px]">
                {theme === 'bold' && <BoldFeatures data={featuresData} brandColor={colors.bold} />}
                {theme === 'colorful' && <ColorfulFeatures data={featuresData} brandColor={colors.colorful} />}
                {theme === 'dark' && <DarkFeatures data={featuresData} brandColor={colors.dark} />}
                {theme === 'minimal' && <MinimalFeatures data={featuresData} brandColor={colors.minimal} />}
            </div>
        </div>

        {/* Benefits */}
        <div className="flex flex-col gap-2">
            <h2 className="text-sm font-semibold text-gray-500">Benefits</h2>
            <div className="aspect-square w-full sm:w-[320px]">
                {theme === 'bold' && <BoldBenefits data={benefitsData} brandColor={colors.bold} />}
                {theme === 'colorful' && <ColorfulBenefits data={benefitsData} brandColor={colors.colorful} />}
                {theme === 'dark' && <DarkBenefits data={benefitsData} brandColor={colors.dark} />}
                {theme === 'minimal' && <MinimalBenefits data={benefitsData} brandColor={colors.minimal} />}
            </div>
        </div>

        {/* Promo */}
        <div className="flex flex-col gap-2">
            <h2 className="text-sm font-semibold text-gray-500">Promo</h2>
            <div className="aspect-square w-full sm:w-[320px]">
                {theme === 'bold' && <BoldPromo data={promoData} brandColor={colors.bold} />}
                {theme === 'colorful' && <ColorfulPromo data={promoData} brandColor={colors.colorful} />}
                {theme === 'dark' && <DarkPromo data={promoData} brandColor={colors.dark} />}
                {theme === 'minimal' && <MinimalPromo data={promoData} brandColor={colors.minimal} />}
            </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-2">
            <h2 className="text-sm font-semibold text-gray-500">CTA</h2>
            <div className="aspect-square w-full sm:w-[320px]">
                {theme === 'bold' && <BoldCTA data={ctaData} brandColor={colors.bold} />}
                {theme === 'colorful' && <ColorfulCTA data={ctaData} brandColor={colors.colorful} />}
                {theme === 'dark' && <DarkCTA data={ctaData} brandColor={colors.dark} />}
                {theme === 'minimal' && <MinimalCTA data={ctaData} brandColor={colors.minimal} />}
            </div>
        </div>
      </div>
    </div>
  );
}

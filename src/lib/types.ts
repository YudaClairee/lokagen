// Tone options for content generation
export type Tone = "playful" | "formal" | "elegan" | "lokal";

// Visual theme options
export type Theme = "dark" | "light" | "colorful";

// Slide types
export interface SlideIntro {
  type: "intro";
  title: string;
  subtitle: string;
}

export interface SlideFeatures {
  type: "features";
  title: string;
  bullets: string[];
}

export interface SlideBenefits {
  type: "benefits";
  title: string;
  bullets: string[];
}

export interface SlidePromo {
  type: "promo";
  title: string;
  promoText: string;
}

export interface SlideCTA {
  type: "cta";
  title: string;
  ctaText: string;
}

export type SlideContent =
  | SlideIntro
  | SlideFeatures
  | SlideBenefits
  | SlidePromo
  | SlideCTA;

// Generated content from AI
export interface GeneratedContent {
  caption: string;
  slides: [SlideIntro, SlideFeatures, SlideBenefits, SlidePromo, SlideCTA];
}

// Server action response
export interface GenerateContentResponse {
  success: boolean;
  data?: GeneratedContent;
  error?: string;
}

// Form input for generate content
export interface GenerateContentInput {
  productImage: string; // base64 string
  description?: string;
  tone: Tone;
  theme: Theme;
  brandColor?: string; // hex color
}

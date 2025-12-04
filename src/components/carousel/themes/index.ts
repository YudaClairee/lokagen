import type { Theme } from "@/lib/types";
import type { ComponentType, RefAttributes } from "react";
import type {
  SlideIntroProps,
  SlideFeaturesProps,
  SlideBenefitsProps,
  SlidePromoProps,
  SlideCTAProps,
} from "./types";

// Import all theme components
import * as MinimalClean from "./minimal-clean";
import * as DarkFuturistic from "./dark-futuristic";
import * as ColorfulGenZ from "./colorful-genz";
import * as BoldTypography from "./bold-typography";

// Define the shape of each theme's slide components
export interface ThemeSlideComponents {
  SlideIntro: ComponentType<SlideIntroProps & RefAttributes<HTMLDivElement>>;
  SlideFeatures: ComponentType<SlideFeaturesProps & RefAttributes<HTMLDivElement>>;
  SlideBenefits: ComponentType<SlideBenefitsProps & RefAttributes<HTMLDivElement>>;
  SlidePromo: ComponentType<SlidePromoProps & RefAttributes<HTMLDivElement>>;
  SlideCTA: ComponentType<SlideCTAProps & RefAttributes<HTMLDivElement>>;
}

// Map theme names to their components
const themeComponents: Record<Theme, ThemeSlideComponents> = {
  "Minimal Clean Modern": MinimalClean,
  "Dark Modern/Futuristic": DarkFuturistic,
  "Colorful Gen Z": ColorfulGenZ,
  "Bold Typography": BoldTypography,
};

// Helper function to get components for a specific theme
export function getThemeComponents(theme: Theme): ThemeSlideComponents {
  return themeComponents[theme];
}

// Re-export types
export type {
  SlideIntroProps,
  SlideFeaturesProps,
  SlideBenefitsProps,
  SlidePromoProps,
  SlideCTAProps,
} from "./types";

// Re-export individual themes for direct imports
export { MinimalClean, DarkFuturistic, ColorfulGenZ, BoldTypography };


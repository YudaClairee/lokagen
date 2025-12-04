import type {
  SlideIntro,
  SlideFeatures,
  SlideBenefits,
  SlidePromo,
  SlideCTA,
} from "@/lib/types";

export interface SlideIntroProps {
  data: SlideIntro;
  brandColor: string;
  productImage?: string;
  isPlaceholder?: boolean;
}

export interface SlideFeaturesProps {
  data: SlideFeatures;
  brandColor: string;
  isPlaceholder?: boolean;
}

export interface SlideBenefitsProps {
  data: SlideBenefits;
  brandColor: string;
  isPlaceholder?: boolean;
}

export interface SlidePromoProps {
  data: SlidePromo;
  brandColor: string;
  isPlaceholder?: boolean;
}

export interface SlideCTAProps {
  data: SlideCTA;
  brandColor: string;
  isPlaceholder?: boolean;
}


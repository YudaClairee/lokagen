import type {
  SlideIntro,
  SlideFeatures,
  SlideBenefits,
  SlidePromo,
  SlideCTA,
  BrandInfo,
} from "@/lib/types";

export interface BaseSlideProps {
  productName?: string;
  brandColor: string;
  productImage?: string;
  brandInfo?: BrandInfo;
  isPlaceholder?: boolean;
}

export interface SlideIntroProps extends BaseSlideProps {
  data: SlideIntro;
}

export interface SlideFeaturesProps extends BaseSlideProps {
  data: SlideFeatures;
}

export interface SlideBenefitsProps extends BaseSlideProps {
  data: SlideBenefits;
}

export interface SlidePromoProps extends BaseSlideProps {
  data: SlidePromo;
}

export interface SlideCTAProps extends BaseSlideProps {
  data: SlideCTA;
}

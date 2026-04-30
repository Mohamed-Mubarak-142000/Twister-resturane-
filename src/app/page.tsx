import { HeroSection } from "@/components/sections/HeroSection";
import { CategoriesSection } from "@/components/sections/CategoriesSection";
import { BestsellerSection } from "@/components/sections/BestsellerSection";
import { OfferBannerSection } from "@/components/sections/OfferBannerSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { DeliveryZonesSection } from "@/components/sections/DeliveryZonesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <BestsellerSection />
      <OfferBannerSection />
      <WhyUsSection />
      <DeliveryZonesSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}

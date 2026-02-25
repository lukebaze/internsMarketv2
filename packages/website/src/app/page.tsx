import { NavigationBar } from "@/components/navigation-bar";
import { HeroSection } from "@/components/hero-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { InternCatalogSection } from "@/components/intern-catalog-section";
import { FeatureHighlightsSection } from "@/components/feature-highlights-section";
import { SocialProofSection } from "@/components/social-proof-section";
import { PricingSection } from "@/components/pricing-section";
import { FinalCtaSection } from "@/components/final-cta-section";
import { FooterSection } from "@/components/footer-section";

export default function Home() {
  return (
    <main id="main-content" className="flex min-h-screen flex-col">
      <NavigationBar />
      <HeroSection />
      <HowItWorksSection />
      <InternCatalogSection />
      <FeatureHighlightsSection />
      <SocialProofSection />
      <PricingSection />
      <FinalCtaSection />
      <FooterSection />
    </main>
  );
}

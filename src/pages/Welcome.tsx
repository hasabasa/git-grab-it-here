
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/welcome/HeroSection";
import FeaturesSection from "@/components/welcome/FeaturesSection";
import ModulesSection from "@/components/welcome/ModulesSection";
import GrowthSection from "@/components/welcome/GrowthSection";
import PricingSection from "@/components/welcome/PricingSection";
import TrustSection from "@/components/welcome/TrustSection";

const Welcome = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <HeroSection />
      <FeaturesSection />
      <ModulesSection />
      <GrowthSection />
      <PricingSection />
      <TrustSection />
      <Footer />
    </div>
  );
};

export default Welcome;

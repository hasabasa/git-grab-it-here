
import { useEffect } from 'react';
import HeroSection from '@/components/welcome/HeroSection';
import ModulesSection from '@/components/welcome/ModulesSection';
import PricingSection from '@/components/welcome/PricingSection';
import GrowthSection from '@/components/welcome/GrowthSection';
import Footer from '@/components/layout/Footer';
import { useReferralTracking } from '@/hooks/useReferralTracking';

const Welcome = () => {
  // Track referral clicks on the welcome page
  useReferralTracking();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <HeroSection />
      <ModulesSection />
      <PricingSection />
      <GrowthSection />
      <Footer />
    </div>
  );
};

export default Welcome;

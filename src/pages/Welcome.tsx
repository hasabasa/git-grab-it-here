
import { useEffect } from 'react';
import { useLoading } from '@/hooks/useLoading';
import LoadingScreen from '@/components/ui/loading-screen';
import HeroSection from "@/components/welcome/HeroSection";
import ModulesSection from "@/components/welcome/ModulesSection";
import PricingSection from "@/components/welcome/PricingSection";
import GrowthSection from "@/components/welcome/GrowthSection";

const Welcome = () => {
  const { isLoading, stopLoading } = useLoading({
    minDuration: 2000,
    initialLoading: true
  });

  useEffect(() => {
    // Симулируем загрузку данных приложения
    const timer = setTimeout(() => {
      stopLoading();
    }, 1500);

    return () => clearTimeout(timer);
  }, [stopLoading]);

  if (isLoading) {
    return <LoadingScreen text="Bot Mark загружается..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <HeroSection />
      <ModulesSection />
      <PricingSection />
      <GrowthSection />
    </div>
  );
};

export default Welcome;

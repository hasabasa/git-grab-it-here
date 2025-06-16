
import { useEffect } from 'react';
import { useLoading } from '@/hooks/useLoading';
import LoadingScreen from '@/components/ui/loading-screen';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Bot, BarChart3, Users, TrendingUp, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import HeroSection from "@/components/welcome/HeroSection";
import FeaturesSection from "@/components/welcome/FeaturesSection";
import ModulesSection from "@/components/welcome/ModulesSection";
import PricingSection from "@/components/welcome/PricingSection";
import TrustSection from "@/components/welcome/TrustSection";
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
      <FeaturesSection />
      <ModulesSection />
      <PricingSection />
      <TrustSection />
      <GrowthSection />
    </div>
  );
};

export default Welcome;

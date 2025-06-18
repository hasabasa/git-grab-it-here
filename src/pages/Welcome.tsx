
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Zap, TrendingUp, Users, BarChart3, Target } from "lucide-react";
import HeroSection from "@/components/welcome/HeroSection";
import ModulesSection from "@/components/welcome/ModulesSection";
import PricingSection from "@/components/welcome/PricingSection";
import GrowthSection from "@/components/welcome/GrowthSection";
import Footer from "@/components/layout/Footer";

const Welcome = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Mark Bot
          </div>
          <div className="flex gap-4">
            <Button variant="outline" asChild>
              <Link to="/auth">
                Войти
              </Link>
            </Button>
            <Button asChild>
              <Link to="/auth">
                Начать работу
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        <HeroSection />
        <ModulesSection />
        <GrowthSection />
        <PricingSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Welcome;

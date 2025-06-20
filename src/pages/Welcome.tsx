
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import HeroSection from "@/components/welcome/HeroSection";
import ModulesSection from "@/components/welcome/ModulesSection";
import PricingSection from "@/components/welcome/PricingSection";
import GrowthSection from "@/components/welcome/GrowthSection";
import Footer from "@/components/layout/Footer";

const Welcome = () => {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Mark Bot
          </div>
          <div className="flex gap-2 sm:gap-4">
            <Button asChild size="sm" className="text-xs sm:text-sm">
              <Link to="/auth">
                <span className="hidden sm:inline">Начать работу</span>
                <span className="sm:hidden">Старт</span>
                <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16 sm:pt-20 overflow-x-hidden">
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

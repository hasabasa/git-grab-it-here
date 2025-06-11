
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Crown, Brain, Target } from "lucide-react";
import DemoModeButton from "@/components/auth/DemoModeButton";
import ScrollAnimation from "@/components/ui/scroll-animation";

const HeroSection = () => {
  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 z-10">
        <ScrollAnimation animation="fade" delay={200}>
          <div className="text-center mb-12">
            <ScrollAnimation animation="scale" delay={400}>
              <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full text-sm font-medium text-blue-700 mb-4 shadow-md">
                <Crown className="h-4 w-4" />
                Платформа №1 для продавцов Kaspi
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation animation="slide-up" delay={600}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4 sm:mb-6">
                Kaspi Price
              </h1>
            </ScrollAnimation>
            
            <ScrollAnimation animation="fade" delay={800}>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8 px-2">
                Интеллектуальная платформа для предпринимателей на Kaspi.kz. 
                Автоматизируйте рутинные задачи и повысьте прибыль.
              </p>
            </ScrollAnimation>
            
            <ScrollAnimation animation="slide-up" delay={1000}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto mb-8 sm:mb-12 px-2">
                <div className="bg-white rounded-lg p-4 sm:p-6 shadow-lg border border-gray-200">
                  <div className="flex items-center gap-3 mb-3 justify-center">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <Brain className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">На основе данных</h3>
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Принимайте решения на основе данных, а не интуиции.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-4 sm:p-6 shadow-lg border border-gray-200">
                  <div className="flex items-center gap-3 mb-3 justify-center">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                      <Target className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Всё в одном</h3>
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Аналитика, автоценообразование, юнит-экономика, CRM.
                  </p>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="scale" delay={1200}>
              <p className="text-base sm:text-lg text-gray-700 font-medium mb-6 sm:mb-8 px-2">
                🎯 Хотите подключиться и попробовать бесплатно?<br />
                <span className="text-blue-600">Демо-режим доступен без регистрации!</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center max-w-md mx-auto px-2">
                <DemoModeButton />
                <Button onClick={scrollToPricing} size="lg" className="w-full sm:w-auto text-base sm:text-lg py-5 sm:py-6 px-6 sm:px-8">
                  <Crown className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Получить полный доступ
                </Button>
              </div>
            </ScrollAnimation>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
};

export default HeroSection;

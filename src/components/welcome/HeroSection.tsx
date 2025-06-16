import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Crown, Brain, Target } from "lucide-react";
import DemoModeButton from "@/components/auth/DemoModeButton";
import ScrollAnimation from "@/components/ui/scroll-animation";
const HeroSection = () => {
  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <div className="relative min-h-screen flex items-center">
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 z-10">
        <ScrollAnimation animation="fade" delay={200}>
          <div className="text-center mb-8 sm:mb-12">
            <ScrollAnimation animation="scale" delay={400}>
              <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium text-blue-700 mb-4 shadow-md">
                <Crown className="h-3 w-3 sm:h-4 sm:w-4" />
                Платформа №1 для продавцов Kaspi
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation animation="slide-up" delay={600}>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4 sm:mb-6">Bot Mark</h1>
            </ScrollAnimation>
            
            <ScrollAnimation animation="fade" delay={800}>
              <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto leading-relaxed mb-6 sm:mb-8 px-2">
                Интеллектуальная платформа для предпринимателей на Kaspi.kz. 
                Автоматизируйте рутинные задачи и повысьте прибыль.
              </p>
            </ScrollAnimation>
            
            <ScrollAnimation animation="slide-up" delay={1000}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-2xl mx-auto mb-6 sm:mb-8 px-2">
                <div className="bg-white rounded-lg p-3 sm:p-4 shadow-lg border border-gray-200">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 justify-center">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <Brain className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-xs sm:text-sm">На основе данных</h3>
                  </div>
                  <p className="text-gray-600 text-xs">
                    Принимайте решения на основе данных, а не интуиции.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-3 sm:p-4 shadow-lg border border-gray-200">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 justify-center">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                      <Target className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-xs sm:text-sm">Всё в одном</h3>
                  </div>
                  <p className="text-gray-600 text-xs">
                    Аналитика, автоценообразование, юнит-экономика, CRM.
                  </p>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="scale" delay={1200}>
              <p className="text-sm sm:text-base text-gray-700 font-medium mb-4 sm:mb-6 px-2">
                🎯 Хотите подключиться и попробовать бесплатно?<br />
                <span className="text-blue-600">Демо-режим доступен без регистрации!</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center max-w-sm sm:max-w-none mx-auto px-2">
                <DemoModeButton />
                <Button onClick={scrollToPricing} size="lg" className="w-full sm:w-auto text-sm sm:text-base py-3 sm:py-4 px-4 sm:px-6 min-h-[48px]">
                  <Crown className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <span className="truncate">Получить полный доступ</span>
                </Button>
              </div>
            </ScrollAnimation>
          </div>
        </ScrollAnimation>
      </div>
    </div>;
};
export default HeroSection;
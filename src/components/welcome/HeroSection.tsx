
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Crown, Brain, Target } from "lucide-react";
import DemoModeButton from "@/components/auth/DemoModeButton";
import ScrollAnimation from "@/components/ui/scroll-animation";
import AnimatedFeatureCard from "@/components/welcome/AnimatedFeatureCard";

const HeroSection = () => {
  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative min-h-[90vh] sm:min-h-screen flex items-center overflow-x-hidden">
      <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 z-10">
        <ScrollAnimation animation="fade" delay={200}>
          <div className="text-center mb-6 sm:mb-8 lg:mb-12">
            <ScrollAnimation animation="scale" delay={400}>
              <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium text-blue-700 mb-4 shadow-md">
                <Crown className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="whitespace-nowrap">Платформа №1 для продавцов Kaspi</span>
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation animation="slide-up" delay={600}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight">
                Mark Bot
              </h1>
            </ScrollAnimation>
            
            <ScrollAnimation animation="fade" delay={800}>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8 px-2">
                Интеллектуальная платформа для предпринимателей на Kaspi.kz. 
                Автоматизируйте рутинные задачи и повысьте прибыль.
              </p>
            </ScrollAnimation>
            
            <ScrollAnimation animation="slide-up" delay={1000}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto mb-6 sm:mb-8 px-2">
                <AnimatedFeatureCard 
                  icon={Brain} 
                  title="На основе данных" 
                  description="Глубокая аналитика продаж и конкурентов помогает принимать обоснованные решения для роста бизнеса на маркетплейсе" 
                  gradient="from-blue-500 to-cyan-500" 
                  delay={1200} 
                />
                
                <AnimatedFeatureCard 
                  icon={Target} 
                  title="Всё в одном" 
                  description="Полный комплекс инструментов включает аналитику продаж автоценообразование юнит экономику и CRM систему управления клиентами" 
                  gradient="from-green-500 to-emerald-500" 
                  delay={1400} 
                />
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="scale" delay={1200}>
              <div className="text-center mb-6 sm:mb-8">
                <p className="text-sm sm:text-base text-gray-700 font-medium mb-4 sm:mb-6 px-2">
                  🎯 Хотите подключиться и попробовать бесплатно?<br />
                  <span className="text-blue-600">Демо-режим доступен без регистрации!</span>
                </p>
                <div className="flex flex-col gap-3 sm:gap-4 justify-center items-center max-w-sm mx-auto sm:max-w-none sm:flex-row px-2">
                  <div className="w-full sm:w-auto">
                    <DemoModeButton />
                  </div>
                  <Button 
                    onClick={scrollToPricing} 
                    size="lg" 
                    className="w-full sm:w-auto text-sm sm:text-base py-3 sm:py-4 px-4 sm:px-6 min-h-[48px] whitespace-nowrap"
                  >
                    <Crown className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                    <span>Получить полный доступ</span>
                  </Button>
                </div>
                
                <div className="mt-4">
                  <Link 
                    to="/auth" 
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                  >
                    Есть аккаунт? Войти
                  </Link>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
};

export default HeroSection;

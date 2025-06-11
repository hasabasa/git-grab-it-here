
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Crown, Zap } from "lucide-react";
import DemoModeButton from "@/components/auth/DemoModeButton";
import ScrollAnimation from "@/components/ui/scroll-animation";

const PricingSection = () => {
  return (
    <div id="pricing-section" className="relative py-12 sm:py-16 lg:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <ScrollAnimation animation="slide-up">
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 sm:mb-4">Выберите свой план</h2>
            <p className="text-lg sm:text-xl text-muted-foreground px-2">
              Начните бесплатно или получите полный доступ к платформе
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Demo Plan */}
          <ScrollAnimation animation="slide-left" delay={200}>
            <Card className="relative overflow-hidden h-full glass-enhanced border-2 border-gray-200 smooth-hover ambient-glow">
              <CardHeader className="text-center pb-6 sm:pb-8">
                <div className="mb-3 sm:mb-4">
                  <Zap className="h-10 w-10 sm:h-12 sm:w-12 text-blue-500 mx-auto" />
                </div>
                <CardTitle className="text-xl sm:text-2xl mb-2">Демо-режим</CardTitle>
                <p className="text-gray-600 text-sm sm:text-base">Попробуйте все функции бесплатно</p>
                
                <div className="mt-4 sm:mt-6">
                  <div className="text-3xl sm:text-4xl font-bold text-gray-900">Бесплатно</div>
                  <p className="text-gray-500 mt-2 text-sm">Полный доступ к просмотру</p>
                </div>
              </CardHeader>

              <CardContent className="px-6 sm:px-8">
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  {[
                    "Просмотр всех модулей",
                    "Тестовые данные", 
                    "Изучение интерфейса",
                    "Понимание возможностей",
                    "Без ограничений по времени"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center">
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-3" />
                      <span className="text-gray-700 text-sm sm:text-base">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="relative z-20">
                  <DemoModeButton />
                </div>
              </CardContent>
            </Card>
          </ScrollAnimation>

          {/* Pro Plan */}
          <ScrollAnimation animation="slide-right" delay={400}>
            <Card className="relative overflow-hidden h-full bg-gradient-to-br from-blue-600 to-purple-600 text-white border-0 shadow-2xl smooth-hover">
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                <Badge className="bg-yellow-400 text-yellow-900 font-semibold text-xs sm:text-sm">
                  ПОПУЛЯРНЫЙ
                </Badge>
              </div>
              
              <CardHeader className="text-center pb-6 sm:pb-8">
                <div className="mb-3 sm:mb-4">
                  <Crown className="h-10 w-10 sm:h-12 sm:w-12 text-yellow-400 mx-auto" />
                </div>
                <CardTitle className="text-xl sm:text-2xl mb-2">Pro план</CardTitle>
                <p className="text-blue-100 text-sm sm:text-base">Все возможности для профессионалов</p>
                
                <div className="mt-4 sm:mt-6">
                  <div className="text-3xl sm:text-4xl font-bold">10 990 ₸</div>
                  <p className="text-blue-100 mt-2 text-sm">/месяц • Первый день бесплатно</p>
                </div>
              </CardHeader>

              <CardContent className="px-6 sm:px-8">
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  {[
                    "Полный доступ ко всем модулям",
                    "Неограниченное количество товаров", 
                    "Сохранение всех данных",
                    "Приоритетная поддержка 24/7",
                    "API для интеграций",
                    "Персональный менеджер"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center">
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 mr-3" />
                      <span className="text-white text-sm sm:text-base">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link to="/dashboard/subscription">
                  <Button size="lg" className="w-full text-base sm:text-lg py-5 sm:py-6 bg-white text-blue-600 hover:bg-gray-100 smooth-hover">
                    <Crown className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Начать бесплатный день
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </ScrollAnimation>
        </div>

        <ScrollAnimation animation="fade" delay={600}>
          <div className="text-center mt-8 sm:mt-10 lg:mt-12">
            <Link to="/auth">
              
            </Link>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
};

export default PricingSection;

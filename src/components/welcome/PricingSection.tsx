import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Crown, Zap } from "lucide-react";
import DemoModeButton from "@/components/auth/DemoModeButton";
import ScrollAnimation from "@/components/ui/scroll-animation";

const PricingSection = () => {
  return (
    <div className="relative py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <ScrollAnimation animation="slide-up">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Выберите свой план</h2>
            <p className="text-xl text-gray-600">
              Начните бесплатно или получите полный доступ к платформе
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Demo Plan */}
          <ScrollAnimation animation="slide-left" delay={200}>
            <Card className="relative overflow-hidden h-full glass-enhanced border-2 border-gray-200 smooth-hover ambient-glow">
              <CardHeader className="text-center pb-8">
                <div className="mb-4">
                  <Zap className="h-12 w-12 text-blue-500 mx-auto" />
                </div>
                <CardTitle className="text-2xl mb-2">Демо-режим</CardTitle>
                <p className="text-gray-600">Попробуйте все функции бесплатно</p>
                
                <div className="mt-6">
                  <div className="text-4xl font-bold text-gray-900">Бесплатно</div>
                  <p className="text-gray-500 mt-2">Полный доступ к просмотру</p>
                </div>
              </CardHeader>

              <CardContent className="px-8">
                <div className="space-y-4 mb-8">
                  {["Просмотр всех модулей", "Тестовые данные", "Изучение интерфейса", "Понимание возможностей", "Без ограничений по времени"].map((feature, i) => <div key={i} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </div>)}
                </div>

                <DemoModeButton />
              </CardContent>
            </Card>
          </ScrollAnimation>

          {/* Pro Plan */}
          <ScrollAnimation animation="slide-right" delay={400}>
            <Card className="relative overflow-hidden h-full bg-gradient-to-br from-blue-600 to-purple-600 text-white border-0 shadow-2xl smooth-hover">
              <div className="absolute top-4 right-4">
                <Badge className="bg-yellow-400 text-yellow-900 font-semibold">
                  ПОПУЛЯРНЫЙ
                </Badge>
              </div>
              
              <CardHeader className="text-center pb-8">
                <div className="mb-4">
                  <Crown className="h-12 w-12 text-yellow-400 mx-auto" />
                </div>
                <CardTitle className="text-2xl mb-2">Pro план</CardTitle>
                <p className="text-blue-100">Все возможности для профессионалов</p>
                
                <div className="mt-6">
                  <div className="text-4xl font-bold">10 990 ₸</div>
                  <p className="text-blue-100 mt-2">/месяц • Первый день бесплатно</p>
                </div>
              </CardHeader>

              <CardContent className="px-8">
                <div className="space-y-4 mb-8">
                  {["Полный доступ ко всем модулям", "Неограниченное количество товаров", "Сохранение всех данных", "Приоритетная поддержка 24/7", "API для интеграций", "Персональный менеджер"].map((feature, i) => <div key={i} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-yellow-400 mr-3" />
                      <span className="text-white">{feature}</span>
                    </div>)}
                </div>

                <Link to="/dashboard/subscription">
                  <Button size="lg" className="w-full text-lg py-6 bg-white text-blue-600 hover:bg-gray-100 smooth-hover">
                    <Crown className="mr-2 h-5 w-5" />
                    Начать бесплатный день
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </ScrollAnimation>
        </div>

        <ScrollAnimation animation="fade" delay={600}>
          <div className="text-center mt-12">
            
            <Link to="/auth">
              <Button variant="outline" size="lg" className="bg-white/10 text-white border-white/30 hover:bg-white/20 smooth-hover">
                Зарегистрироваться сейчас
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
};

export default PricingSection;

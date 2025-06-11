
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Crown, Brain, Target } from "lucide-react";
import DemoModeButton from "@/components/auth/DemoModeButton";
import ScrollAnimation from "@/components/ui/scroll-animation";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Subtle animated overlays */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/5 rounded-full filter blur-3xl animate-float" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-400/5 rounded-full filter blur-3xl animate-float float-delayed" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-20 z-10">
        <ScrollAnimation animation="fade" delay={200}>
          <div className="text-center mb-16">
            <ScrollAnimation animation="scale" delay={400}>
              <div className="inline-flex items-center gap-2 bg-white/40 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-blue-700 mb-6 glass-enhanced">
                <Crown className="h-4 w-4" />
                Платформа №1 для продавцов Kaspi
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation animation="slide-up" delay={600}>
              <h1 className="text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6">
                Kaspi Price
              </h1>
            </ScrollAnimation>
            
            <ScrollAnimation animation="fade" delay={800}>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
                Интеллектуальная платформа для предпринимателей и компаний, работающих на маркетплейсе Kaspi.kz. 
                Мы разработали это решение, чтобы вы могли автоматизировать рутинные задачи, повысить прибыль и получить полный контроль над вашим бизнесом.
              </p>
            </ScrollAnimation>
            
            <ScrollAnimation animation="slide-up" delay={1000}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
                <div className="glass-enhanced rounded-lg p-6 smooth-hover ambient-glow bg-white/20 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-3 justify-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <Brain className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900">На основе данных</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Принимайте решения на основе данных, а не интуиции. Получайте точную аналитику для роста бизнеса.
                  </p>
                </div>
                
                <div className="glass-enhanced rounded-lg p-6 smooth-hover ambient-glow bg-white/20 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-3 justify-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                      <Target className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Всё в одном</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Объединяем аналитику, автоценообразование, юнит-экономику, CRM в одном интерфейсе.
                  </p>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="scale" delay={1200}>
              <p className="text-lg text-gray-700 font-medium mb-8">
                🎯 Хотите подключиться и попробовать бесплатно?<br />
                <span className="text-blue-600">Демо-режим доступен без регистрации — начните прямо сейчас!</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-lg mx-auto">
                <DemoModeButton />
                <Link to="/auth" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full text-lg py-6 px-8 smooth-hover">
                    <Crown className="mr-2 h-5 w-5" />
                    Получить полный доступ
                  </Button>
                </Link>
              </div>
            </ScrollAnimation>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
};

export default HeroSection;

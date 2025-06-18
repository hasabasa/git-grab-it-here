
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import ScrollAnimation from "@/components/ui/scroll-animation";

const ModulesSection = () => {
  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const modules = [
    {
      title: "Автоценообразование",
      description: "Автоматическое обновление цен и борьба с демпингом",
      icon: "🚀",
      color: "from-red-500 to-orange-500"
    },
    {
      title: "Аналитика продаж",
      description: "Подробная аналитика продаж и прибыли",
      icon: "📊",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Управление товарами",
      description: "Удобное управление товарами и категориями",
      icon: "📦",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "CRM система",
      description: "Эффективные отношения с клиентами",
      icon: "👥",
      color: "from-purple-500 to-violet-500"
    },
    {
      title: "Поиск ниш",
      description: "Находите перспективные ниши для роста",
      icon: "💡",
      color: "from-indigo-500 to-purple-500"
    },
    {
      title: "Юнит-экономика",
      description: "Точный расчёт прибыли с учётом всех расходов",
      icon: "🔢",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <div className="relative py-12 sm:py-16 lg:py-20 overflow-x-hidden">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <ScrollAnimation animation="slide-up">
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 px-2">
              Все инструменты в одном месте
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Комплексное решение для автоматизации и роста вашего бизнеса на Kaspi.kz
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-10">
          {modules.map((module, index) => (
            <ScrollAnimation 
              key={module.title} 
              animation="scale" 
              delay={index * 100}
            >
              <Card className="h-full bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardHeader className="text-center pb-3 sm:pb-4">
                  <div className="flex justify-center mb-3 sm:mb-4">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r ${module.color} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-xl sm:text-2xl">{module.icon}</span>
                    </div>
                  </div>
                  <CardTitle className="text-base sm:text-lg mb-2 text-gray-900 leading-tight px-2">
                    {module.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-600 leading-relaxed text-center px-4 pb-4 sm:pb-6 text-sm sm:text-base">
                  {module.description}
                </CardContent>
              </Card>
            </ScrollAnimation>
          ))}
        </div>

        <ScrollAnimation animation="fade" delay={600}>
          <div className="text-center px-4">
            <Button 
              onClick={scrollToPricing} 
              size="lg" 
              className="bg-blue-600 text-white hover:bg-blue-700 text-base sm:text-lg py-4 sm:py-6 px-6 sm:px-8 w-full sm:w-auto"
            >
              Начать использовать
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
};

export default ModulesSection;

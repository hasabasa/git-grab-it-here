
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
    <div className="relative py-12 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <ScrollAnimation animation="slide-up">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Все инструменты в одном месте
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Комплексное решение для автоматизации и роста вашего бизнеса на Kaspi.kz
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-10">
          {modules.map((module, index) => (
            <ScrollAnimation 
              key={module.title} 
              animation="scale" 
              delay={index * 100}
            >
              <Card className="h-full bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${module.color} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-2xl">{module.icon}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg mb-2 text-gray-900">{module.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-600 leading-relaxed text-center px-4 pb-6 text-sm">
                  {module.description}
                </CardContent>
              </Card>
            </ScrollAnimation>
          ))}
        </div>

        <ScrollAnimation animation="fade" delay={600}>
          <div className="text-center">
            <Button 
              onClick={scrollToPricing} 
              size="lg" 
              className="bg-blue-600 text-white hover:bg-blue-700 text-lg py-6 px-8"
            >
              Начать использовать
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
};

export default ModulesSection;

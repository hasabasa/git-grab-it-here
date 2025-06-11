
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ScrollAnimation from "@/components/ui/scroll-animation";
import { useStaggeredScrollAnimation } from "@/hooks/useScrollAnimation";

const FeaturesSection = () => {
  const [featuresRef, visibleFeatures] = useStaggeredScrollAnimation(6, 150);

  const features = [
    {
      icon: "🚀",
      title: "Автоценообразование",
      description: "Автоматическое обновление цен и борьба с демпингом",
      color: "from-red-500 to-orange-500"
    },
    {
      icon: "📊",
      title: "Глубокая аналитика",
      description: "Подробная аналитика продаж и прибыли",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: "📦",
      title: "Управление товарами",
      description: "Удобное управление товарами и категориями",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: "👥",
      title: "CRM система",
      description: "Эффективные отношения с клиентами",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: "💡",
      title: "Поиск ниш",
      description: "Находите перспективные ниши для роста",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: "🔢",
      title: "Юнит-экономика",
      description: "Точный расчёт прибыли с учётом всех расходов",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <div className="relative py-12 sm:py-16 lg:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <ScrollAnimation animation="slide-up">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Почему выбирают Kaspi Price</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-2">
              Все инструменты для успешной торговли на Kaspi.kz в одном интерфейсе.
            </p>
          </div>
        </ScrollAnimation>

        <div ref={featuresRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 relative z-10">
          {features.map((feature, index) => (
            <ScrollAnimation 
              key={index} 
              animation="slide-up" 
              delay={visibleFeatures.includes(index) ? index * 150 : 0}
            >
              <Card className="h-full bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardHeader className="text-center pb-4 sm:pb-6">
                  <div className="flex justify-center mb-4 sm:mb-6">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-2xl sm:text-3xl">{feature.icon}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg sm:text-xl mb-2 sm:mb-3 text-center text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700 leading-relaxed text-center px-4 sm:px-6 pb-6 sm:pb-8 text-sm sm:text-base">
                  {feature.description}
                </CardContent>
              </Card>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;

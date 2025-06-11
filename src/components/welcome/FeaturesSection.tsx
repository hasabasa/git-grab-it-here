
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ScrollAnimation from "@/components/ui/scroll-animation";
import { useStaggeredScrollAnimation } from "@/hooks/useScrollAnimation";

const FeaturesSection = () => {
  const [featuresRef, visibleFeatures] = useStaggeredScrollAnimation(6, 150);

  const features = [
    {
      icon: "🚀",
      title: "Автоматическое ценообразование",
      description: "Автоматическое обновление цен и борьба с демпингом без лишних усилий",
      color: "from-red-500 to-orange-500"
    },
    {
      icon: "📊",
      title: "Глубокая аналитика",
      description: "Подробная аналитика продаж и прибыли для принятия взвешенных решений",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: "📦",
      title: "Управление товарами",
      description: "Удобное управление товарами и категориями в одном интерфейсе",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: "👥",
      title: "CRM система",
      description: "Построение эффективных отношений с клиентами через встроенную CRM",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: "💡",
      title: "Поиск ниш",
      description: "Находите перспективные ниши для роста и расширения бизнеса",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: "🔢",
      title: "Юнит-экономика",
      description: "Точный расчёт прибыли с учётом всех комиссий и расходов",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <div className="relative py-20 bg-transparent">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <ScrollAnimation animation="slide-up">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Почему выбирают Kaspi Price</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Наша цель — сделать управление интернет-магазином простым, понятным и прибыльным. 
              Kaspi Price объединяет в себе мощные инструменты аналитики, автоценообразования, расчёта юнит-экономики, CRM и многое другое — всё в одном интерфейсе.
            </p>
          </div>
        </ScrollAnimation>

        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {features.map((feature, index) => (
            <ScrollAnimation 
              key={index} 
              animation="slide-up" 
              delay={visibleFeatures.includes(index) ? index * 150 : 0}
              className={`opacity-0 ${visibleFeatures.includes(index) ? 'animate-slide-in-up' : ''}`}
            >
              <Card className="h-full glass-enhanced border-0 smooth-hover ambient-glow group bg-white/60 backdrop-blur-sm shadow-lg">
                <CardHeader className="text-center pb-6">
                  <div className="flex justify-center mb-6">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-3xl">{feature.icon}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl mb-3 text-center text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700 leading-relaxed text-center px-6 pb-8">
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


import { Users, TrendingUp, CheckCircle, Shield, Clock, Award } from "lucide-react";
import ScrollAnimation from "@/components/ui/scroll-animation";

const TrustSection = () => {
  const trustItems = [
    {
      icon: Users,
      text: "500+ активных пользователей",
      color: "text-blue-600"
    },
    {
      icon: TrendingUp,
      text: "Рост продаж до 40%",
      color: "text-green-600"
    },
    {
      icon: Shield,
      text: "99.9% время работы",
      color: "text-purple-600"
    },
    {
      icon: Clock,
      text: "Поддержка 24/7",
      color: "text-orange-600"
    },
    {
      icon: Award,
      text: "Проверенное качество",
      color: "text-yellow-600"
    },
    {
      icon: CheckCircle,
      text: "Гарантия результата",
      color: "text-emerald-600"
    }
  ];

  return (
    <div className="relative py-16">
      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <ScrollAnimation animation="slide-up">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Доверяют более 500+ продавцов на Kaspi
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trustItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div 
                  key={index}
                  className="flex items-center gap-3 bg-white rounded-lg px-6 py-4 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className={`flex-shrink-0 ${item.color}`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <span className="text-gray-700 font-medium">{item.text}</span>
                </div>
              );
            })}
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
};

export default TrustSection;

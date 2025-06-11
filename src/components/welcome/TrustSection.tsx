
import { Users, TrendingUp, CheckCircle } from "lucide-react";
import ScrollAnimation from "@/components/ui/scroll-animation";

const TrustSection = () => {
  return (
    <div className="relative py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <ScrollAnimation animation="slide-up">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Доверяют более 500+ продавцов на Kaspi
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500">
            <div className="flex items-center gap-2 smooth-hover bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <Users className="h-5 w-5" />
              <span>500+ активных пользователей</span>
            </div>
            <div className="flex items-center gap-2 smooth-hover bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <TrendingUp className="h-5 w-5" />
              <span>Рост продаж до 40%</span>
            </div>
            <div className="flex items-center gap-2 smooth-hover bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <CheckCircle className="h-5 w-5" />
              <span>99.9% время работы</span>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
};

export default TrustSection;

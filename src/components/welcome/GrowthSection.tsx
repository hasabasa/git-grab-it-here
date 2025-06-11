
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";
import ScrollAnimation from "@/components/ui/scroll-animation";

const GrowthSection = () => {
  return (
    <div className="relative py-12 sm:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <ScrollAnimation animation="scale">
          <div className="mb-6 sm:mb-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Shield className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Сосредоточьтесь на росте
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto px-2">
              Kaspi Price помогает принимать решения на основе данных. 
              Сосредоточьтесь на росте — всё остальное мы возьмём на себя.
            </p>
          </div>
        </ScrollAnimation>
        
        <ScrollAnimation animation="slide-up" delay={200}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10 lg:mb-12">
            <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200 shadow-lg">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-700 text-sm sm:text-base">Довольных клиентов</div>
            </div>
            <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200 shadow-lg">
              <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">40%</div>
              <div className="text-gray-700 text-sm sm:text-base">Рост продаж</div>
            </div>
            <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200 shadow-lg">
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-700 text-sm sm:text-base">Поддержка</div>
            </div>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="fade" delay={400}>
          <Link to="/auth">
            <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700 text-base sm:text-lg py-5 sm:py-6 px-6 sm:px-8">
              Начать прямо сейчас
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </Link>
        </ScrollAnimation>
      </div>
    </div>
  );
};

export default GrowthSection;


import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";
import ScrollAnimation from "@/components/ui/scroll-animation";

const GrowthSection = () => {
  return (
    <div className="relative py-12 sm:py-16 lg:py-20 overflow-x-hidden">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <ScrollAnimation animation="scale">
          <div className="mb-6 sm:mb-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Shield className="h-7 w-7 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 px-2">
              Готовы начать?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
              Присоединяйтесь к более чем 500 продавцам, которые уже используют Bot Mark 
              для роста своего бизнеса на Kaspi.kz
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="fade" delay={200}>
          <div className="px-4">
            <Link to="/auth">
              <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700 text-base sm:text-lg py-4 sm:py-6 px-6 sm:px-8 w-full sm:w-auto">
                Начать прямо сейчас
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
};

export default GrowthSection;

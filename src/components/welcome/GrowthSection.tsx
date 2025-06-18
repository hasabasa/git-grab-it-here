
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";
import ScrollAnimation from "@/components/ui/scroll-animation";

const GrowthSection = () => {
  return (
    <div className="relative py-12 sm:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <ScrollAnimation animation="scale">
          <div className="mb-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Готовы начать?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8">
              Присоединяйтесь к более чем 500 продавцам, которые уже используют Bot Mark 
              для роста своего бизнеса на Kaspi.kz
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="fade" delay={200}>
          <Link to="/auth">
            <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700 text-lg py-6 px-8">
              Начать прямо сейчас
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </ScrollAnimation>
      </div>
    </div>
  );
};

export default GrowthSection;

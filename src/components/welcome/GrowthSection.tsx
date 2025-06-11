
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";
import ScrollAnimation from "@/components/ui/scroll-animation";

const GrowthSection = () => {
  return (
    <div className="relative py-20">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <ScrollAnimation animation="scale">
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Сосредоточьтесь на росте
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Kaspi Price помогает вам принимать решения на основе данных, а не на интуиции. 
              С нами вы сможете сосредоточиться на росте и масштабировании бизнеса — всё остальное мы возьмём на себя.
            </p>
          </div>
        </ScrollAnimation>
        
        <ScrollAnimation animation="slide-up" delay={200}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-700">Довольных клиентов</div>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">40%</div>
              <div className="text-gray-700">Рост продаж</div>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-700">Поддержка</div>
            </div>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="fade" delay={400}>
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

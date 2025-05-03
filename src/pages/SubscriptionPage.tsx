
import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

const plans = [
  {
    id: "free",
    name: "Бесплатный",
    description: "Базовая функциональность с ограничениями",
    price: 0,
    features: [
      "Бот демпинга (1 товар)",
      "Базовая аналитика продаж",
      "Основные CRM-функции",
      "Ограниченный поиск ниш"
    ],
    limitations: [
      "Ограниченное количество товаров",
      "Только базовая аналитика",
      "Ручное обновление данных"
    ],
    recommended: false,
    buttonText: "Текущий план"
  },
  {
    id: "standard",
    name: "Стандарт",
    description: "Полноценное решение для среднего бизнеса",
    price: 30000,
    features: [
      "Бот демпинга (до 50 товаров)",
      "Расширенная аналитика продаж",
      "Полные CRM-функции",
      "Расширенный поиск ниш",
      "Автоматическое обновление данных",
      "Интеграция с магазином Kaspi"
    ],
    limitations: [],
    recommended: true,
    buttonText: "Выбрать план"
  },
  {
    id: "premium",
    name: "Премиум",
    description: "Максимальные возможности для крупного бизнеса",
    price: 50000,
    features: [
      "Бот демпинга (без ограничений)",
      "Премиум аналитика продаж",
      "Расширенные CRM-функции",
      "Приоритетные данные в поиске ниш",
      "API для интеграции",
      "Персональный менеджер",
      "Приоритетная поддержка 24/7"
    ],
    limitations: [],
    recommended: false,
    buttonText: "Выбрать план"
  }
];

const SubscriptionPage = () => {
  const [currentPlan, setCurrentPlan] = useState<string>("free");

  const handleSubscribe = (planId: string) => {
    if (planId === currentPlan) {
      toast("Это ваш текущий тариф");
      return;
    }
    
    // В реальном приложении здесь будет интеграция с платежной системой
    toast.success(`Переход на тариф ${planId} будет доступен после интеграции с платежной системой`);
  };

  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Тарифные планы</h1>
        <p className="text-gray-500">
          Выберите подходящий тарифный план для вашего бизнеса и получите доступ 
          к расширенным возможностям сервиса.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`relative ${
              plan.recommended ? 'border-2 border-primary shadow-lg' : ''
            }`}
          >
            {plan.recommended && (
              <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                Рекомендуемый
              </span>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <span className="text-3xl font-bold">{plan.price} ₸</span>
                <span className="text-gray-500 ml-1">/месяц</span>
              </div>
              <div className="space-y-2">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
                {plan.limitations.map((limitation, i) => (
                  <div key={i} className="flex items-center">
                    <span className="h-4 w-4 text-gray-300 mr-2">—</span>
                    <span className="text-sm text-gray-500">{limitation}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleSubscribe(plan.id)}
                className="w-full"
                variant={plan.id === currentPlan ? "outline" : "default"}
                disabled={plan.id === currentPlan}
              >
                {plan.id === currentPlan ? "Текущий план" : plan.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPage;

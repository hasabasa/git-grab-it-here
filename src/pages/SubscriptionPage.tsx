
import { useState } from "react";
import { Check, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const SubscriptionPage = () => {
  const [currentPlan, setCurrentPlan] = useState<string>("free");

  const handleSubscribe = () => {
    // В реальном приложении здесь будет интеграция с платежной системой
    toast.success("Переход на Pro план будет доступен после интеграции с платежной системой");
  };

  const allFeatures = [
    "Бот демпинга (без ограничений)",
    "Полная аналитика продаж",
    "Расширенные CRM-функции",
    "Поиск ниш с приоритетными данными",
    "Автоматическое обновление данных",
    "Интеграция с магазином Kaspi",
    "API для интеграции",
    "Персональный менеджер",
    "Приоритетная поддержка 24/7",
    "Неограниченное количество товаров",
    "Экспорт отчетов",
    "Уведомления в реальном времени"
  ];

  return (
    <div className="space-y-6">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Тарифный план</h1>
        <p className="text-gray-500 text-lg">
          Получите доступ ко всем возможностям платформы Kaspi Price по единой цене
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="border-2 border-primary shadow-lg relative">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
              <Crown className="h-4 w-4" />
              Kaspi Price Pro
            </Badge>
          </div>
          
          <CardHeader className="text-center pt-8">
            <CardTitle className="text-2xl">Pro план</CardTitle>
            <CardDescription className="text-lg">
              Все функции платформы для успешных продаж на Kaspi
            </CardDescription>
            
            <div className="mt-6">
              <div className="flex items-center justify-center gap-2">
                <span className="text-4xl font-bold">10 990 ₸</span>
                <span className="text-gray-500">/месяц</span>
              </div>
              <div className="flex items-center justify-center gap-2 mt-2">
                <Badge variant="success" className="text-sm">
                  3 дня бесплатно
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {allFeatures.map((feature, i) => (
                <div key={i} className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">Что входит в Pro план:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Полный доступ ко всем модулям платформы</li>
                <li>• Неограниченное количество товаров и магазинов</li>
                <li>• Приоритетная техническая поддержка</li>
                <li>• Регулярные обновления и новые функции</li>
              </ul>
            </div>
          </CardContent>

          <CardFooter className="px-8 pb-8">
            <div className="w-full space-y-3">
              <Button 
                onClick={handleSubscribe}
                className="w-full text-lg py-6"
                size="lg"
              >
                Начать с 3 бесплатных дней
              </Button>
              <p className="text-center text-sm text-gray-500">
                Отменить подписку можно в любое время
              </p>
            </div>
          </CardFooter>
        </Card>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
            <Crown className="h-4 w-4 text-amber-500" />
            <span className="text-sm font-medium">
              Текущий статус: Демо-режим
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Подключите Pro план для сохранения данных и полного доступа
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;

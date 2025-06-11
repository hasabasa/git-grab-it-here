
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Welcome = () => {
  const modules = [
    {
      title: "Бот демпинга",
      description: "Динамическое ценообразование для опережения конкурентов",
      path: "/dashboard/price-bot",
      icon: "🔥"
    },
    {
      title: "Мои продажи",
      description: "Статистика и аналитика продаж",
      path: "/dashboard/sales",
      icon: "📈"
    },
    {
      title: "Юнит-экономика",
      description: "Расчет прибыли с учетом комиссий и доставки",
      path: "/dashboard/unit-economics",
      icon: "🔢"
    },
    {
      title: "CRM и напоминания",
      description: "Работа с клиентами и задачами",
      path: "/dashboard/crm",
      icon: "✅"
    },
    {
      title: "WhatsApp",
      description: "Интеграция с WhatsApp для общения с клиентами",
      path: "/dashboard/whatsapp",
      icon: "💬"
    },
    {
      title: "Поиск ниш",
      description: "Анализ спроса и предложения",
      path: "/dashboard/niche-search",
      icon: "📊"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex flex-col justify-center items-center p-6">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Добро пожаловать в Kaspi Price
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Платформа для управления ценами, анализа продаж и увеличения прибыли на маркетплейсе Kaspi
        </p>
      </div>

      <Alert className="bg-blue-50 border-blue-200 mb-8 max-w-3xl">
        <AlertCircle className="h-4 w-4 text-blue-500" />
        <AlertDescription className="text-blue-700">
          Вы находитесь в демо-режиме. Все модули доступны для просмотра без авторизации. Для сохранения данных требуется регистрация.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl">
        {modules.map((module) => (
          <div key={module.path} className="transition-all duration-300 hover:scale-105">
            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full">
              <CardContent className="p-0">
                <Link to={module.path}>
                  <div className="p-6 flex flex-col h-full">
                    <div className="text-4xl mb-4">{module.icon}</div>
                    <h2 className="text-2xl font-semibold mb-2">{module.title}</h2>
                    <p className="text-gray-600 flex-grow">{module.description}</p>
                    <Button className="mt-4 w-full">Перейти</Button>
                  </div>
                </Link>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Welcome;

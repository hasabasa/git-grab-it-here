

import { useState } from "react";
import { Check, Crown, Calendar, Gift } from "lucide-react";
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
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/components/integration/useAuth";
import PromoCodeInput from "@/components/subscription/PromoCodeInput";

const SubscriptionPage = () => {
  const { isDemo } = useAuth();
  const { profile, subscriptionStatus, loading } = useProfile();

  const handleSubscribe = () => {
    // В реальном приложении здесь будет интеграция с платежной системой
    toast.success("Переход на Pro план будет доступен после интеграции с платежной системой");
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Не установлено";
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getButtonText = () => {
    if (isDemo) return "Недоступно в демо режиме";
    
    if (subscriptionStatus.isActive) {
      return "Управление подпиской";
    }
    
    if (subscriptionStatus.status === 'expired' && profile?.subscription_end_date) {
      return "Продлить Pro план";
    }
    
    return "Начать с 5 бесплатных дней";
  };

  const getButtonDescription = () => {
    if (isDemo) return "Зарегистрируйтесь для получения 5 бесплатных дней Pro плана";
    
    if (subscriptionStatus.isActive) {
      return "Изменить план или способ оплаты";
    }
    
    if (subscriptionStatus.status === 'expired' && profile?.subscription_end_date) {
      return "Ваш пробный период истек. Подключите Pro план для продолжения работы";
    }
    
    return "Отменить подписку можно в любое время";
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

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Тарифный план</h1>
        <p className="text-gray-500 text-lg">
          Получите доступ ко всем возможностям платформы Kaspi Price по единой цене
        </p>
      </div>

      {/* Текущий статус подписки */}
      {!isDemo && (
        <div className="max-w-2xl mx-auto">
          <Card className="border-2 border-blue-200 bg-blue-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Текущий статус подписки
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Статус</p>
                  <Badge 
                    variant={subscriptionStatus.isActive ? "success" : "destructive"}
                    className="text-sm"
                  >
                    {subscriptionStatus.isActive ? "Активна" : "Истекла"}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Осталось дней</p>
                  <p className="font-semibold text-lg">
                    {subscriptionStatus.daysLeft}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Дата окончания</p>
                  <p className="font-medium">
                    {formatDate(profile?.subscription_end_date)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Бонусные дни</p>
                  <p className="font-medium">
                    {profile?.bonus_days || 0}
                  </p>
                </div>
              </div>
              
              {subscriptionStatus.status === 'expired' && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-sm">
                    ⚠️ Ваш пробный период истек. Подключите Pro план для продолжения работы с платформой.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Промокод - только для пользователей с оплаченной подпиской */}
      {!isDemo && subscriptionStatus.hasPaidSubscription && (
        <div className="max-w-2xl mx-auto">
          <PromoCodeInput />
        </div>
      )}

      {/* Информация о промокоде для пользователей без оплаты */}
      {!isDemo && !subscriptionStatus.hasPaidSubscription && (
        <div className="max-w-2xl mx-auto">
          <Card className="border-amber-200 bg-amber-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-800">
                <Gift className="h-5 w-5" />
                Промокод
              </CardTitle>
              <CardDescription className="text-amber-700">
                Возможность использования промокодов станет доступна после оплаты ежемесячного тарифа
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-3 bg-amber-100 border border-amber-200 rounded-lg">
                <p className="text-amber-800 text-sm">
                  💡 После оплаты Pro плана вы сможете использовать промокоды для получения дополнительных дней подписки
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Pro план */}
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
              {!subscriptionStatus.isActive && !isDemo && subscriptionStatus.status !== 'expired' && (
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Badge variant="success" className="text-sm">
                    5 дней бесплатно
                  </Badge>
                </div>
              )}
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
                <li>• Возможность использования промокодов</li>
              </ul>
            </div>
          </CardContent>

          <CardFooter className="px-8 pb-8">
            <div className="w-full space-y-3">
              <Button 
                onClick={handleSubscribe}
                className="w-full text-lg py-6"
                size="lg"
                disabled={isDemo}
              >
                {getButtonText()}
              </Button>
              <p className="text-center text-sm text-gray-500">
                {getButtonDescription()}
              </p>
            </div>
          </CardFooter>
        </Card>

        {isDemo && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
              <Crown className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-medium">
                Текущий статус: Демо-режим
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {getButtonDescription()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionPage;

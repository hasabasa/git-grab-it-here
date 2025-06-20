
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import KaspiIntegration from "@/components/integration/KaspiIntegration";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, CheckCircle, ArrowRight } from "lucide-react";
import { useStoreConnection } from "@/hooks/useStoreConnection";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const IntegrationPage = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const { hasStores, isConnected } = useStoreConnection();
  const fromParam = new URLSearchParams(location.search).get('from');

  const getWelcomeMessage = () => {
    if (hasStores) {
      return {
        title: "Управление интеграциями",
        description: "Ваши магазины подключены. Вы можете добавить новые или управлять существующими интеграциями.",
        variant: "success" as const
      };
    }

    switch (fromParam) {
      case 'price-bot':
        return {
          title: "Подключите магазин для работы с ботом демпинга",
          description: "Бот демпинга требует подключения вашего магазина Kaspi.kz для анализа товаров и управления ценами.",
          variant: "info" as const
        };
      case 'sales':
        return {
          title: "Подключите магазин для аналитики продаж",
          description: "Для просмотра реальной статистики продаж необходимо подключить ваш магазин Kaspi.kz.",
          variant: "info" as const
        };
      case 'niche-search':
        return {
          title: "Подключите магазин для расширенного анализа ниш",
          description: "Получите персонализированные рекомендации по нишам на основе данных вашего магазина.",
          variant: "info" as const
        };
      default:
        return {
          title: "Добро пожаловать! Подключите свой первый магазин",
          description: "Для работы с платформой необходимо подключить ваш магазин Kaspi.kz. Это займет всего несколько минут.",
          variant: "info" as const
        };
    }
  };

  const welcomeMessage = getWelcomeMessage();

  const handleGoToDashboard = () => {
    navigate("/dashboard/price-bot");
  };

  return (
    <div className="space-y-4 sm:space-y-6 px-4 sm:px-0">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Интеграции</h1>
        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          Подключите внешние сервисы для расширения возможностей платформы
        </p>
      </div>

      {/* Welcome/Status message */}
      <Alert className={`${
        welcomeMessage.variant === 'success' 
          ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' 
          : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'
      }`}>
        {welcomeMessage.variant === 'success' ? (
          <CheckCircle className="h-4 w-4 text-green-500" />
        ) : (
          <Info className="h-4 w-4 text-blue-500" />
        )}
        <AlertDescription className={`${
          welcomeMessage.variant === 'success' ? 'text-green-700' : 'text-blue-700'
        } text-sm`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium mb-1">{welcomeMessage.title}</div>
              <div>{welcomeMessage.description}</div>
            </div>
            {hasStores && (
              <Button 
                onClick={handleGoToDashboard}
                size="sm"
                className="ml-4 bg-green-600 hover:bg-green-700 text-white"
              >
                Перейти к работе
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="kaspi">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="kaspi" className="flex-1 sm:flex-none">Kaspi.kz</TabsTrigger>
        </TabsList>
        <TabsContent value="kaspi" className="mt-4 sm:mt-6">
          <div className={`grid grid-cols-1 ${isMobile ? 'gap-4' : 'md:grid-cols-3 gap-6'}`}>
            <div className={isMobile ? '' : 'md:col-span-2'}>
              <KaspiIntegration />
            </div>
            <div className={isMobile ? 'order-first' : ''}>
              <Card>
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="text-lg sm:text-xl">О интеграции</CardTitle>
                  <CardDescription className="text-sm">
                    Что даёт подключение магазина Kaspi.kz
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2 mt-0.5 flex-shrink-0">•</span>
                      <span className="leading-relaxed">Автоматическая синхронизация товаров из вашего магазина</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2 mt-0.5 flex-shrink-0">•</span>
                      <span className="leading-relaxed">Отслеживание цен конкурентов для каждого товара</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2 mt-0.5 flex-shrink-0">•</span>
                      <span className="leading-relaxed">Автоматическое обновление цен на основе стратегии</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2 mt-0.5 flex-shrink-0">•</span>
                      <span className="leading-relaxed">Аналитика продаж с реальными данными</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2 mt-0.5 flex-shrink-0">•</span>
                      <span className="leading-relaxed">Уведомления о важных изменениях в товарах</span>
                    </li>
                  </ul>
                  
                  {hasStores && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2 text-green-700 text-sm font-medium">
                        <CheckCircle className="h-4 w-4" />
                        <span>Магазин успешно подключен!</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IntegrationPage;


import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import KaspiIntegration from "@/components/integration/KaspiIntegration";
import { useIsMobile } from "@/hooks/use-mobile";

const IntegrationPage = () => {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-4 sm:space-y-6 px-4 sm:px-0">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Интеграции</h1>
        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          Подключите внешние сервисы для расширения возможностей платформы
        </p>
      </div>

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

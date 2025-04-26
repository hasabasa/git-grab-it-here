
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import KaspiIntegration from "@/components/integration/KaspiIntegration";

const IntegrationPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Интеграции</h1>
        <p className="text-gray-500 mt-2">
          Подключите внешние сервисы для расширения возможностей платформы
        </p>
      </div>

      <Tabs defaultValue="kaspi">
        <TabsList>
          <TabsTrigger value="kaspi">Kaspi.kz</TabsTrigger>
        </TabsList>
        <TabsContent value="kaspi" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <KaspiIntegration />
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>О интеграции</CardTitle>
                  <CardDescription>
                    Что даёт подключение магазина Kaspi.kz
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2">•</span>
                      <span>Автоматическая синхронизация товаров из вашего магазина</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2">•</span>
                      <span>Отслеживание цен конкурентов для каждого товара</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2">•</span>
                      <span>Автоматическое обновление цен на основе стратегии</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2">•</span>
                      <span>Аналитика продаж с реальными данными</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2">•</span>
                      <span>Уведомления о важных изменениях в товарах</span>
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


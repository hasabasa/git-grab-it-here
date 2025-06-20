
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Bot, TrendingUp, Settings, DollarSign } from "lucide-react";
import StoreSelector from "@/components/price-bot/StoreSelector";
import ProductList from "@/components/price-bot/ProductList";
import PriceBotSettings from "@/components/price-bot/PriceBotSettings";
import ActivationSection from "@/components/price-bot/ActivationSection";
import ProfitSection from "@/components/price-bot/ProfitSection";
import { useAuth } from "@/components/integration/useAuth";
import { AuthComponent } from "@/components/integration/AuthComponent";
import { useStoreConnection } from "@/hooks/useStoreConnection";
import ConnectStoreButton from "@/components/store/ConnectStoreButton";
import LoadingScreen from "@/components/ui/loading-screen";

const PriceBotPage = () => {
  const { user, loading: authLoading, isDemo } = useAuth();
  const { isConnected, needsConnection, loading: storeLoading } = useStoreConnection();
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);

  // Show loading screen while authentication or stores are loading
  if (authLoading || storeLoading) {
    return <LoadingScreen text="Загрузка данных магазинов..." />;
  }

  // If user is not authenticated, show auth component
  if (!user && !isDemo) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Бот демпинга</h1>
        <p className="text-gray-600">Для использования бота демпинга необходима авторизация</p>
        <AuthComponent />
      </div>
    );
  }

  // If user needs to connect a store, show connect button
  if (needsConnection) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Бот демпинга</h1>
          <p className="text-gray-600">
            Автоматическое управление ценами для победы в конкурентной борьбе
          </p>
        </div>
        
        <ConnectStoreButton
          title="Подключите магазин для работы с ботом"
          description="Бот демпинга анализирует цены конкурентов и автоматически корректирует ваши цены для максимальной прибыльности"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Бот демпинга</h1>
        <p className="text-gray-600">
          Автоматическое управление ценами для победы в конкурентной борьбе
        </p>
      </div>

      {isDemo && (
        <Alert className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <Info className="h-4 w-4 text-blue-500" />
          <AlertDescription className="text-blue-700">
            Вы просматриваете демонстрационные данные. Подключите свой магазин Kaspi.kz для работы с реальными товарами.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <StoreSelector
            selectedStoreId={selectedStoreId}
            onStoreChange={setSelectedStoreId}
          />
        </div>
        
        <div className="lg:col-span-3 space-y-6">
          <Tabs defaultValue="products" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="products" className="flex items-center gap-2">
                <Bot className="h-4 w-4" />
                Товары
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Настройки
              </TabsTrigger>
              <TabsTrigger value="activation" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Активация
              </TabsTrigger>
              <TabsTrigger value="profit" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Прибыль
              </TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="space-y-6">
              <ProductList selectedStoreId={selectedStoreId} />
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <PriceBotSettings selectedStoreId={selectedStoreId} />
            </TabsContent>

            <TabsContent value="activation" className="space-y-6">
              <ActivationSection selectedStoreId={selectedStoreId} />
            </TabsContent>

            <TabsContent value="profit" className="space-y-6">
              <ProfitSection selectedStoreId={selectedStoreId} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PriceBotPage;

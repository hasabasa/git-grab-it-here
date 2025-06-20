
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Package, Clock, TrendingUp } from "lucide-react";
import PreordersComingSoonModal from "@/components/preorders/PreordersComingSoonModal";
import { useStoreConnection } from "@/hooks/useStoreConnection";
import { useAuth } from "@/components/integration/useAuth";
import AuthComponent from "@/components/integration/AuthComponent";
import ConnectStoreButton from "@/components/store/ConnectStoreButton";
import LoadingScreen from "@/components/ui/loading-screen";

const PreordersPage = () => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { isConnected, needsConnection, loading: storeLoading } = useStoreConnection();
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);

  const handleFeatureClick = () => {
    setShowComingSoonModal(true);
  };

  // Show loading screen while checking auth and store connection
  if (authLoading || storeLoading) {
    return <LoadingScreen text="Загрузка модуля предзаказов..." />;
  }

  // Show auth component if not authenticated
  if (!isAuthenticated) {
    return <AuthComponent />;
  }

  // Show store connection if needed
  if (needsConnection) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <ConnectStoreButton 
          title="Подключите магазин для предзаказов"
          description="Для работы с модулем предзаказов необходимо подключить ваш магазин Kaspi.kz. Это позволит создавать карточки товаров для предзаказа и управлять поставками."
          variant="card"
          className="max-w-md w-full"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Модальное окно */}
      <PreordersComingSoonModal 
        isOpen={showComingSoonModal} 
        onClose={() => setShowComingSoonModal(false)} 
      />

      <div>
        <h1 className="text-3xl font-bold mb-2">Предзаказы</h1>
        <p className="text-muted-foreground">
          Управляйте предзаказами и планируйте поставки товаров
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Активные предзаказы</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
            <p className="text-xs text-muted-foreground">Скоро будет доступно</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ожидают поставки</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
            <p className="text-xs text-muted-foreground">Скоро будет доступно</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Средний срок</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
            <p className="text-xs text-muted-foreground">Скоро будет доступно</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Прибыль с предзаказов</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
            <p className="text-xs text-muted-foreground">Скоро будет доступно</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Система предзаказов</CardTitle>
          <CardDescription>
            Принимайте заказы на товары, которых еще нет в наличии
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Возможности системы:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Создание карточек товаров для предзаказа</span>
                </li>
                
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Автоматические уведомления о поступлении</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Планирование закупок по спросу</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Интеграция с поставщиками</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Начать работу:</h3>
              <div className="space-y-3">
                <Button onClick={handleFeatureClick} className="w-full justify-start" variant="outline">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Создать предзаказ
                </Button>
                <Button onClick={handleFeatureClick} className="w-full justify-start" variant="outline">
                  <Package className="mr-2 h-4 w-4" />
                  Управление поставками
                </Button>
                <Button onClick={handleFeatureClick} className="w-full justify-start" variant="outline">
                  <Clock className="mr-2 h-4 w-4" />
                  Отчеты по предзаказам
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-bounce">
                <ShoppingCart className="h-8 w-8 text-white" />
              </div>
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">
              Система предзаказов в разработке! 🚀
            </h4>
            <p className="text-gray-600 mb-4">
              Мы работаем над мощной системой управления предзаказами, которая поможет вам увеличить продажи и оптимизировать складские запасы.
            </p>
            <div className="flex justify-center space-x-2 text-2xl">
              <span className="animate-pulse">📦</span>
              <span>💰</span>
              <span className="animate-pulse delay-200">🎯</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PreordersPage;

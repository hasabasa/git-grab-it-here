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
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types";
import { useMobileResponsive } from "@/hooks/use-mobile-responsive";
import { cn } from "@/lib/utils";

const PriceBotPage = () => {
  const { user, loading: authLoading, isDemo } = useAuth();
  const { isConnected, needsConnection, loading: storeLoading } = useStoreConnection();
  const { isMobile, isIPhoneMini, getMobileSpacing, getTouchTargetSize } = useMobileResponsive();
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loadingProducts, setLoadingProducts] = useState(false);

  // Demo products for demonstration
  const demoProducts: Product[] = [
    {
      id: 'demo-1',
      name: 'iPhone 15 Pro Max 256GB',
      price: 650000,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
      botActive: true,
      minProfit: 50000,
      maxProfit: 100000,
      store_id: 'demo-1',
      kaspi_product_id: 'demo-product-1',
      category: 'Электроника',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'demo-2', 
      name: 'Samsung Galaxy S24 Ultra',
      price: 580000,
      image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400',
      botActive: false,
      minProfit: 45000,
      maxProfit: 90000,
      store_id: 'demo-1',
      kaspi_product_id: 'demo-product-2',
      category: 'Электроника',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  // Load products when store is selected
  useEffect(() => {
    if (selectedStoreId && isConnected) {
      loadProducts();
    }
  }, [selectedStoreId, isConnected]);

  const loadProducts = async () => {
    if (isDemo) {
      setProducts(demoProducts);
      return;
    }

    if (!selectedStoreId || selectedStoreId === 'all') return;

    setLoadingProducts(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('store_id', selectedStoreId);
      
      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error loading products:', error);
      setProducts([]);
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleProductSelect = (productId: string) => {
    const product = products.find(p => p.id === productId);
    setSelectedProduct(product || null);
  };

  const handleSettingsSave = (settings: any) => {
    console.log('Settings saved:', settings);
    // Here you would save the settings to the database
  };

  // Show loading screen while authentication or stores are loading
  if (authLoading || storeLoading) {
    return <LoadingScreen text="Загрузка данных магазинов..." />;
  }

  // If user is not authenticated, show auth component
  if (!user && !isDemo) {
    return (
      <div className={cn("space-y-4 md:space-y-6", getMobileSpacing())}>
        <div className={isMobile ? "text-center" : ""}>
          <h1 className="text-2xl md:text-3xl font-bold">Бот демпинга</h1>
          <p className="text-gray-600 text-sm md:text-base mt-1">
            Для использования бота демпинга необходима авторизация
          </p>
        </div>
        <AuthComponent />
      </div>
    );
  }

  // If user needs to connect a store, show connect button
  if (needsConnection) {
    return (
      <div className={cn("space-y-4 md:space-y-6", getMobileSpacing())}>
        <div className={isMobile ? "text-center" : ""}>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Бот демпинга</h1>
          <p className="text-gray-600 text-sm md:text-base">
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
    <div className={cn("space-y-4 md:space-y-6", getMobileSpacing())}>
      <div className={isMobile ? "text-center" : ""}>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Бот демпинга</h1>
        <p className="text-gray-600 text-sm md:text-base">
          Автоматическое управление ценами для победы в конкурентной борьбе
        </p>
      </div>

      {isDemo && (
        <Alert className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <Info className="h-4 w-4 text-blue-500 flex-shrink-0" />
          <AlertDescription className="text-blue-700 text-xs md:text-sm">
            Вы просматриваете демонстрационные данные. Подключите свой магазин Kaspi.kz для работы с реальными товарами.
          </AlertDescription>
        </Alert>
      )}

      <div className={cn("grid gap-4 md:gap-6", isMobile ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-4")}>
        <div className={cn(isMobile ? "order-2" : "lg:col-span-1")}>
          <StoreSelector
            selectedStoreId={selectedStoreId}
            onStoreChange={setSelectedStoreId}
          />
        </div>
        
        <div className={cn("space-y-4 md:space-y-6", isMobile ? "order-1" : "lg:col-span-3")}>
          <Tabs defaultValue="products" className="w-full">
            <TabsList className={cn(
              "grid w-full",
              isMobile ? "grid-cols-2 h-auto" : "grid-cols-4",
              getTouchTargetSize()
            )}>
              <TabsTrigger 
                value="products" 
                className={cn("flex items-center gap-1 md:gap-2", isMobile && "flex-col py-2 px-1 text-xs")}
              >
                <Bot className="h-3 w-3 md:h-4 md:w-4" />
                <span>Товары</span>
              </TabsTrigger>
              <TabsTrigger 
                value="settings" 
                className={cn("flex items-center gap-1 md:gap-2", isMobile && "flex-col py-2 px-1 text-xs")}
              >
                <Settings className="h-3 w-3 md:h-4 md:w-4" />
                <span>Настройки</span>
              </TabsTrigger>
              {!isMobile && (
                <>
                  <TabsTrigger value="activation" className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Активация
                  </TabsTrigger>
                  <TabsTrigger value="profit" className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Прибыль
                  </TabsTrigger>
                </>
              )}
            </TabsList>

            {isMobile && (
              <div className="mt-2 flex gap-2">
                <TabsTrigger 
                  value="activation" 
                  className="flex-1 flex items-center justify-center gap-1 py-2 text-xs"
                >
                  <TrendingUp className="h-3 w-3" />
                  <span>Активация</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="profit" 
                  className="flex-1 flex items-center justify-center gap-1 py-2 text-xs"
                >
                  <DollarSign className="h-3 w-3" />
                  <span>Прибыль</span>
                </TabsTrigger>
              </div>
            )}

            <TabsContent value="products" className="space-y-4 md:space-y-6 mt-4">
              {loadingProducts ? (
                <LoadingScreen text="Загрузка товаров..." />
              ) : (
                <ProductList 
                  products={products}
                  activeProductId={selectedProduct?.id || null}
                  onProductSelect={handleProductSelect}
                />
              )}
            </TabsContent>

            <TabsContent value="settings" className="space-y-4 md:space-y-6 mt-4">
              {selectedProduct ? (
                <PriceBotSettings 
                  product={selectedProduct}
                  onSave={handleSettingsSave}
                />
              ) : (
                <div className="text-center py-6 md:py-8 text-gray-500 text-sm md:text-base">
                  Выберите товар для настройки бота
                </div>
              )}
            </TabsContent>

            <TabsContent value="activation" className="space-y-4 md:space-y-6 mt-4">
              <ActivationSection 
                isActive={selectedProduct?.botActive || false}
                onActiveChange={(active) => {
                  if (selectedProduct) {
                    setSelectedProduct({...selectedProduct, botActive: active});
                  }
                }}
              />
            </TabsContent>

            <TabsContent value="profit" className="space-y-4 md:space-y-6 mt-4">
              <ProfitSection 
                minProfit={selectedProduct?.minProfit || 0}
                onMinProfitChange={(profit) => {
                  if (selectedProduct) {
                    setSelectedProduct({...selectedProduct, minProfit: profit});
                  }
                }}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PriceBotPage;

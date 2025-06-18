import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Play, Pause, Info } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import PriceBotSettings from "@/components/price-bot/PriceBotSettings";
import StoreSelector from "@/components/price-bot/StoreSelector";
import { Product } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/integration/useAuth";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

// Демо-данные продуктов
const demoProducts: Product[] = [
  {
    id: 'demo-1',
    name: 'Смартфон Apple iPhone 13 128Gb черный',
    price: 389990,
    image: 'https://resources.cdn-kaspi.kz/img/m/p/h32/h70/84378448199710.jpg?format=gallery-large',
    image_url: 'https://resources.cdn-kaspi.kz/img/m/p/h32/h70/84378448199710.jpg?format=gallery-large',
    botActive: true,
    bot_active: true,
    minProfit: 5,
    min_profit: 5,
    maxProfit: 15,
    max_profit: 15,
    storeName: 'Демонстрационный магазин',
    store_id: 'demo-1',
    category: 'Электроника'
  },
  {
    id: 'demo-2',
    name: 'Ноутбук Apple MacBook Air 13 MGN63 серый',
    price: 499990,
    image: 'https://resources.cdn-kaspi.kz/img/m/p/h73/h87/63947822596126.jpg?format=gallery-large',
    image_url: 'https://resources.cdn-kaspi.kz/img/m/p/h73/h87/63947822596126.jpg?format=gallery-large',
    botActive: false,
    bot_active: false,
    minProfit: 3,
    min_profit: 3,
    maxProfit: 10,
    max_profit: 10,
    storeName: 'Демонстрационный магазин',
    store_id: 'demo-1',
    category: 'Компьютеры'
  },
  {
    id: 'demo-3',
    name: 'Наушники Apple AirPods Pro 2 (2022) белый',
    price: 129990,
    image: 'https://resources.cdn-kaspi.kz/img/m/p/ha3/h07/84434696175646.jpg?format=gallery-large',
    image_url: 'https://resources.cdn-kaspi.kz/img/m/p/ha3/h07/84434696175646.jpg?format=gallery-large',
    botActive: true,
    bot_active: true,
    minProfit: 7,
    min_profit: 7,
    maxProfit: 12,
    max_profit: 12,
    storeName: 'Тестовый магазин',
    store_id: 'demo-2',
    category: 'Аксессуары'
  }
];

const PriceBotPage = () => {
  const { user, loading: authLoading, isDemo } = useAuth();
  const isMobile = useIsMobile();
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  const [activeProduct, setActiveProduct] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [showProductDrawer, setShowProductDrawer] = useState(false);
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);

  // Загружаем выбранный магазин из localStorage при инициализации
  useEffect(() => {
    const savedStoreId = localStorage.getItem('selectedStoreId');
    if (savedStoreId && savedStoreId !== 'null') {
      setSelectedStoreId(savedStoreId);
    }
  }, []);

  // Сохраняем выбранный магазин в localStorage
  useEffect(() => {
    if (selectedStoreId !== null) {
      localStorage.setItem('selectedStoreId', selectedStoreId);
    } else {
      localStorage.removeItem('selectedStoreId');
    }
  }, [selectedStoreId]);
  
  useEffect(() => {
    if (isDemo) {
      // В демо-режиме просто используем демо-данные
      setProducts(demoProducts);
    } else if (user) {
      loadUserProducts();
    }
  }, [user, isDemo, selectedStoreId]);

  const loadUserProducts = async () => {
    if (!user || isDemo) return;
    
    setLoadingProducts(true);
    try {
      let query = supabase
        .from('products')
        .select(`
          id, 
          name, 
          price, 
          image_url,
          bot_active,
          min_profit,
          max_profit,
          store_id,
          category,
          kaspi_stores(name)
        `);

      // Фильтруем по выбранному магазину, если он выбран
      if (selectedStoreId) {
        query = query.eq('store_id', selectedStoreId);
      }
      
      const { data, error } = await query.order('name');
      
      if (error) throw error;
      
      const formattedProducts: Product[] = data?.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image_url || '',
        image_url: product.image_url,
        botActive: product.bot_active,
        bot_active: product.bot_active,
        minProfit: product.min_profit || 0,
        min_profit: product.min_profit || 0,
        maxProfit: product.max_profit || 0,
        max_profit: product.max_profit || 0,
        storeName: product.kaspi_stores?.name || '',
        store_id: product.store_id,
        category: product.category || ''
      })) || [];

      setProducts(formattedProducts);
    } catch (error: any) {
      console.error('Error loading products:', error);
      toast.error('Ошибка при загрузке товаров');
    } finally {
      setLoadingProducts(false);
    }
  };
  
  const handleProductSelect = (productId: string) => {
    setActiveProduct(productId);
    if (isMobile) {
      setShowSettingsDrawer(true);
    }
  };

  const handleStoreChange = (storeId: string | null) => {
    setSelectedStoreId(storeId);
    setActiveProduct(null);
    setSelectedProducts([]);
  };

  // Фильтруем продукты по выбранному магазину и поисковому запросу
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    // В демо-режиме также фильтруем по выбранному магазину
    const matchesStore = selectedStoreId === null || product.store_id === selectedStoreId;
    return matchesSearch && matchesStore;
  });

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleBulkAction = async (action: 'start' | 'stop') => {
    if (selectedProducts.length === 0) {
      toast.error("Выберите товары для действия");
      return;
    }

    setIsLoading(true);
    
    try {
      if (isDemo) {
        setProducts(prevProducts => 
          prevProducts.map(product => 
            selectedProducts.includes(product.id) 
              ? { ...product, botActive: action === 'start', bot_active: action === 'start' }
              : product
          )
        );
        
        toast.success(
          `Бот ${action === 'start' ? 'запущен' : 'остановлен'} для ${selectedProducts.length} товаров`
        );
      } else {
        const { error } = await supabase
          .from('products')
          .update({
            bot_active: action === 'start',
            updated_at: new Date().toISOString()
          })
          .in('id', selectedProducts);
          
        if (error) throw error;
        
        setProducts(prevProducts => 
          prevProducts.map(product => 
            selectedProducts.includes(product.id) 
              ? { ...product, botActive: action === 'start', bot_active: action === 'start' }
              : product
          )
        );
        
        toast.success(
          `Бот ${action === 'start' ? 'запущен' : 'остановлен'} для ${selectedProducts.length} товаров`
        );
      }
      
      setSelectedProducts([]);
    } catch (error: any) {
      console.error(`Error ${action === 'start' ? 'starting' : 'stopping'} bot:`, error);
      toast.error(error.message || `Ошибка при ${action === 'start' ? 'запуске' : 'остановке'} бота`);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id));
    }
  };
  
  const handleSaveSettings = async (settings: any) => {
    try {
      if (isDemo) {
        setProducts(prevProducts => 
          prevProducts.map(product => 
            product.id === settings.productId 
              ? { 
                  ...product, 
                  botActive: settings.isActive,
                  bot_active: settings.isActive,
                  minProfit: settings.minProfit,
                  min_profit: settings.minProfit,
                  maxProfit: settings.maxProfit,
                  max_profit: settings.maxProfit
                }
              : product
          )
        );
        
        toast.success("Настройки бота сохранены");
      } else {
        const { error } = await supabase
          .from('products')
          .update({
            bot_active: settings.isActive,
            min_profit: settings.minProfit,
            updated_at: new Date().toISOString()
          })
          .eq('id', settings.productId);
          
        if (error) throw error;
        
        setProducts(prevProducts => 
          prevProducts.map(product => 
            product.id === settings.productId 
              ? { 
                  ...product, 
                  botActive: settings.isActive,
                  bot_active: settings.isActive,
                  minProfit: settings.minProfit,
                  min_profit: settings.minProfit,
                  maxProfit: settings.maxProfit,
                  max_profit: settings.maxProfit
                }
              : product
          )
        );
        
        toast.success("Настройки бота сохранены");
      }
    } catch (error: any) {
      console.error("Error saving bot settings:", error);
      toast.error(error.message || "Ошибка при сохранении настроек бота");
    }
  };

  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  const ProductsSection = () => (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg md:text-xl">Мои товары</CardTitle>
        <CardDescription className="text-sm">
          {selectedStoreId === null ? 'Товары из всех магазинов' : 'Товары выбранного магазина'}
        </CardDescription>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-2">
          <Input 
            placeholder="Поиск товаров..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <div className="flex items-center gap-2 whitespace-nowrap">
            <Checkbox 
              id="select-all"
              checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
              onCheckedChange={toggleSelectAll}
            />
            <label htmlFor="select-all" className="text-sm">Все</label>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {loadingProducts ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="space-y-4 max-h-[400px] md:max-h-[600px] overflow-y-auto pr-2">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductSelect(product.id)}
                className={`p-6 rounded-xl cursor-pointer transition-all w-full ${
                  activeProduct === product.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card hover:bg-gray-100'
                }`}
              >
                <div className="flex items-start gap-6 w-full">
                  <Checkbox 
                    checked={selectedProducts.includes(product.id)}
                    onCheckedChange={() => toggleProductSelection(product.id)}
                    onClick={(e) => e.stopPropagation()}
                    className="mt-1"
                  />
                  <div className="flex-1 min-w-0 w-full">
                    <div className="flex items-start gap-6 w-full">
                      <div className="h-20 w-20 md:h-24 md:w-24 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0">
                        {product.image && (
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0 w-full">
                        <div className="font-medium text-sm md:text-base line-clamp-2 mb-4 pr-4">{product.name}</div>
                        <div className="text-xs md:text-sm flex flex-wrap items-center gap-5">
                          <span className={activeProduct === product.id ? 'text-primary-foreground font-semibold' : 'text-gray-900 font-semibold'}>
                            {Number(product.price).toLocaleString()} ₸
                          </span>
                          <Badge 
                            variant={(product.botActive || product.bot_active) ? 'default' : 'outline'} 
                            className="text-xs"
                          >
                            {(product.botActive || product.bot_active) ? 'Активен' : 'Пауза'}
                          </Badge>
                        </div>
                        {product.storeName && (
                          <div className={`text-xs mt-4 truncate pr-4 ${activeProduct === product.id ? 'text-primary-foreground/70' : 'text-gray-400'}`}>
                            {product.storeName}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {filteredProducts.length === 0 && (
              <div className="text-center py-6 text-gray-500 text-sm">
                {products.length === 0 ? "Добавьте товары через интеграцию с Kaspi" : "Товары не найдены"}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );

  const SettingsSection = () => activeProduct && (
    <Card className="h-full">
      <Tabs defaultValue="settings">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3">
            <CardTitle className="text-base md:text-lg line-clamp-2 flex-1">
              {products.find(p => p.id === activeProduct)?.name}
            </CardTitle>
            <Badge 
              variant={(products.find(p => p.id === activeProduct)?.botActive || products.find(p => p.id === activeProduct)?.bot_active) ? 'default' : 'outline'}
              className="self-start"
            >
              {(products.find(p => p.id === activeProduct)?.botActive || products.find(p => p.id === activeProduct)?.bot_active) ? 'Активен' : 'На паузе'}
            </Badge>
          </div>
          <TabsList className="grid grid-cols-1 w-full md:w-[200px]">
            <TabsTrigger value="settings" className="text-sm">Настройки бота</TabsTrigger>
          </TabsList>
        </CardHeader>
        <CardContent className="pt-0">
          <TabsContent value="settings">
            <PriceBotSettings 
              productId={activeProduct} 
              onSave={handleSaveSettings}
            />
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );

  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Бот демпинга</h1>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <Button 
            onClick={() => handleBulkAction('start')} 
            disabled={selectedProducts.length === 0 || isLoading}
            size={isMobile ? "sm" : "default"}
            className="flex-1 sm:flex-none"
          >
            <Play className="mr-2 h-4 w-4" />
            Запустить выбранные
          </Button>
          <Button 
            onClick={() => handleBulkAction('stop')} 
            variant="outline"
            disabled={selectedProducts.length === 0 || isLoading}
            size={isMobile ? "sm" : "default"}
            className="flex-1 sm:flex-none"
          >
            <Pause className="mr-2 h-4 w-4" />
            Остановить выбранные
          </Button>
        </div>
      </div>

      {isDemo && (
        <Alert className="bg-blue-50 border-blue-200">
          <Info className="h-4 w-4 text-blue-500" />
          <AlertDescription className="text-blue-700 text-sm">
            Вы работаете в демо-режиме. Все изменения будут сохранены только в памяти браузера.
          </AlertDescription>
        </Alert>
      )}

      {isMobile ? (
        <div className="space-y-4">
          {/* Store Selector - Mobile */}
          <StoreSelector 
            selectedStoreId={selectedStoreId}
            onStoreChange={handleStoreChange}
          />
          
          {/* Products List - Mobile */}
          <ProductsSection />
          
          {/* Settings Drawer - Mobile */}
          {activeProduct && (
            <Drawer open={showSettingsDrawer} onOpenChange={setShowSettingsDrawer}>
              <DrawerContent className="h-[90vh] max-h-[90vh] rounded-t-xl">
                <DrawerHeader className="px-4 py-3 border-b">
                  <DrawerTitle className="text-left text-lg">
                    Настройки товара
                  </DrawerTitle>
                </DrawerHeader>
                <div className="flex-1 px-4 py-4 overflow-y-auto">
                  <SettingsSection />
                </div>
              </DrawerContent>
            </Drawer>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
          {/* Store Selector - Desktop */}
          <div className="lg:col-span-1">
            <StoreSelector 
              selectedStoreId={selectedStoreId}
              onStoreChange={handleStoreChange}
            />
          </div>

          {/* Products List - Desktop - Увеличиваем до 3 колонок */}
          <div className="lg:col-span-3">
            <ProductsSection />
          </div>

          {/* Settings Section - Desktop - Оставляем 2 колонки */}
          {activeProduct && (
            <div className="lg:col-span-2">
              <SettingsSection />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PriceBotPage;

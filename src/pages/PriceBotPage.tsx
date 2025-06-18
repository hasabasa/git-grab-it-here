import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Play, Pause, Info, X } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import PriceBotSettings from "@/components/price-bot/PriceBotSettings";
import StoreSelector from "@/components/price-bot/StoreSelector";
import ProductsPagination from "@/components/price-bot/ProductsPagination";
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
  DrawerClose,
} from "@/components/ui/drawer";

// Расширенные демо-данные продуктов для демонстрации пагинации
const demoProducts: Product[] = [
  // Электроника - Магазин 1
  {
    id: 'demo-1',
    name: 'Смартфон Apple iPhone 15 Pro 128Gb черный',
    price: 529990,
    image: 'https://resources.cdn-kaspi.kz/img/m/p/h32/h70/84378448199710.jpg?format=gallery-large',
    image_url: 'https://resources.cdn-kaspi.kz/img/m/p/h32/h70/84378448199710.jpg?format=gallery-large',
    botActive: true,
    bot_active: true,
    minProfit: 5,
    min_profit: 5,
    maxProfit: 15,
    max_profit: 15,
    storeName: 'Электроника Плюс',
    store_id: 'demo-store-1',
    category: 'Электроника'
  },
  {
    id: 'demo-2',
    name: 'Смартфон Samsung Galaxy S24 Ultra 256Gb серый',
    price: 479990,
    image: 'https://resources.cdn-kaspi.kz/img/m/p/h73/h87/63947822596126.jpg?format=gallery-large',
    image_url: 'https://resources.cdn-kaspi.kz/img/m/p/h73/h87/63947822596126.jpg?format=gallery-large',
    botActive: false,
    bot_active: false,
    minProfit: 3,
    min_profit: 3,
    maxProfit: 10,
    max_profit: 10,
    storeName: 'Электроника Плюс',
    store_id: 'demo-store-1',
    category: 'Электроника'
  },
  {
    id: 'demo-3',
    name: 'Ноутбук Apple MacBook Air 13 M2 серый',
    price: 599990,
    image: 'https://resources.cdn-kaspi.kz/img/m/p/ha3/h07/84434696175646.jpg?format=gallery-large',
    image_url: 'https://resources.cdn-kaspi.kz/img/m/p/ha3/h07/84434696175646.jpg?format=gallery-large',
    botActive: true,
    bot_active: true,
    minProfit: 7,
    min_profit: 7,
    maxProfit: 12,
    max_profit: 12,
    storeName: 'Электроника Плюс',
    store_id: 'demo-store-1',
    category: 'Компьютеры'
  },
  {
    id: 'demo-4',
    name: 'Планшет iPad Air 10.9 Wi-Fi 64Gb синий',
    price: 289990,
    image: 'https://resources.cdn-kaspi.kz/img/m/p/h32/h70/84378448199710.jpg?format=gallery-large',
    image_url: 'https://resources.cdn-kaspi.kz/img/m/p/h32/h70/84378448199710.jpg?format=gallery-large',
    botActive: false,
    bot_active: false,
    minProfit: 4,
    min_profit: 4,
    maxProfit: 8,
    max_profit: 8,
    storeName: 'Электроника Плюс',
    store_id: 'demo-store-1',
    category: 'Планшеты'
  },
  {
    id: 'demo-5',
    name: 'Наушники Apple AirPods Pro 2 (2023) белый',
    price: 149990,
    image: 'https://resources.cdn-kaspi.kz/img/m/p/h73/h87/63947822596126.jpg?format=gallery-large',
    image_url: 'https://resources.cdn-kaspi.kz/img/m/p/h73/h87/63947822596126.jpg?format=gallery-large',
    botActive: true,
    bot_active: true,
    minProfit: 6,
    min_profit: 6,
    maxProfit: 10,
    max_profit: 10,
    storeName: 'Электроника Плюс',
    store_id: 'demo-store-1',
    category: 'Аксессуары'
  },
  // Добавляем еще товары для Магазина 1
  ...Array.from({ length: 45 }, (_, i) => ({
    id: `demo-store-1-${i + 6}`,
    name: `Товар ${i + 6} - Электроника Плюс`,
    price: Math.floor(Math.random() * 500000) + 50000,
    image: 'https://resources.cdn-kaspi.kz/img/m/p/ha3/h07/84434696175646.jpg?format=gallery-large',
    image_url: 'https://resources.cdn-kaspi.kz/img/m/p/ha3/h07/84434696175646.jpg?format=gallery-large',
    botActive: Math.random() > 0.5,
    bot_active: Math.random() > 0.5,
    minProfit: Math.floor(Math.random() * 10) + 1,
    min_profit: Math.floor(Math.random() * 10) + 1,
    maxProfit: Math.floor(Math.random() * 15) + 5,
    max_profit: Math.floor(Math.random() * 15) + 5,
    storeName: 'Электроника Плюс',
    store_id: 'demo-store-1',
    category: ['Электроника', 'Компьютеры', 'Аксессуары', 'Планшеты'][Math.floor(Math.random() * 4)]
  })),
  
  // Магазин 2 - Техно Мир
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `demo-store-2-${i + 1}`,
    name: `Товар ${i + 1} - Техно Мир`,
    price: Math.floor(Math.random() * 400000) + 30000,
    image: 'https://resources.cdn-kaspi.kz/img/m/p/h32/h70/84378448199710.jpg?format=gallery-large',
    image_url: 'https://resources.cdn-kaspi.kz/img/m/p/h32/h70/84378448199710.jpg?format=gallery-large',
    botActive: Math.random() > 0.5,
    bot_active: Math.random() > 0.5,
    minProfit: Math.floor(Math.random() * 8) + 2,
    min_profit: Math.floor(Math.random() * 8) + 2,
    maxProfit: Math.floor(Math.random() * 12) + 8,
    max_profit: Math.floor(Math.random() * 12) + 8,
    storeName: 'Техно Мир',
    store_id: 'demo-store-2',
    category: ['Электроника', 'Бытовая техника', 'Аксессуары'][Math.floor(Math.random() * 3)]
  })),
  
  // Магазин 3 - Цифровой Центр
  ...Array.from({ length: 35 }, (_, i) => ({
    id: `demo-store-3-${i + 1}`,
    name: `Товар ${i + 1} - Цифровой Центр`,
    price: Math.floor(Math.random() * 600000) + 40000,
    image: 'https://resources.cdn-kaspi.kz/img/m/p/h73/h87/63947822596126.jpg?format=gallery-large',
    image_url: 'https://resources.cdn-kaspi.kz/img/m/p/h73/h87/63947822596126.jpg?format=gallery-large',
    botActive: Math.random() > 0.5,
    bot_active: Math.random() > 0.5,
    minProfit: Math.floor(Math.random() * 6) + 3,
    min_profit: Math.floor(Math.random() * 6) + 3,
    maxProfit: Math.floor(Math.random() * 18) + 7,
    max_profit: Math.floor(Math.random() * 18) + 7,
    storeName: 'Цифровой Центр',
    store_id: 'demo-store-3',
    category: ['Компьютеры', 'Периферия', 'Комплектующие'][Math.floor(Math.random() * 3)]
  }))
];

const PRODUCTS_PER_PAGE = 50;

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
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const savedStoreId = localStorage.getItem('selectedStoreId');
    if (savedStoreId && savedStoreId !== 'null') {
      setSelectedStoreId(savedStoreId);
    }
  }, []);

  useEffect(() => {
    if (selectedStoreId !== null) {
      localStorage.setItem('selectedStoreId', selectedStoreId);
    } else {
      localStorage.removeItem('selectedStoreId');
    }
  }, [selectedStoreId]);
  
  useEffect(() => {
    if (isDemo) {
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
    console.log('PriceBotPage: Product selected:', productId);
    setActiveProduct(productId);
    if (isMobile) {
      setShowSettingsDrawer(true);
    }
  };

  const handleStoreChange = (storeId: string | null) => {
    setSelectedStoreId(storeId);
    setActiveProduct(null);
    setSelectedProducts([]);
    setCurrentPage(1);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStore = selectedStoreId === null || product.store_id === selectedStoreId;
    return matchesSearch && matchesStore;
  });

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSelectedProducts([]);
    setActiveProduct(null);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
    setSelectedProducts([]);
    setActiveProduct(null);
  };

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
    console.log('PriceBotPage: Saving settings:', settings);
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
    <div className="space-y-4">
      <StoreSelector 
        selectedStoreId={selectedStoreId}
        onStoreChange={handleStoreChange}
      />
      
      {/* Title and controls in one horizontal line */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="flex-1">
          <h2 className="text-xl font-semibold">Мои товары</h2>
          <p className="text-sm text-gray-600 mt-1">
            {selectedStoreId === null ? 'Товары из всех магазинов' : 'Товары выбранного магазина'}
            {filteredProducts.length > 0 && (
              <span className="ml-2">
                ({filteredProducts.length} {filteredProducts.length === 1 ? 'товар' : 
                  filteredProducts.length < 5 ? 'товара' : 'товаров'})
              </span>
            )}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <Input 
            placeholder="Поиск товаров..." 
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full sm:w-64"
          />
          <div className="flex items-center gap-2 whitespace-nowrap">
            <Checkbox 
              id="select-all"
              checked={selectedProducts.length === currentProducts.length && currentProducts.length > 0}
              onCheckedChange={() => {
                if (selectedProducts.length === currentProducts.length) {
                  setSelectedProducts([]);
                } else {
                  setSelectedProducts(currentProducts.map(p => p.id));
                }
              }}
            />
            <label htmlFor="select-all" className="text-sm">Все на странице</label>
          </div>
        </div>
      </div>
      
      <Card className="h-full">
        <CardContent className="pt-6">
          {loadingProducts ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              <div className="space-y-4 max-h-[400px] md:max-h-[600px] overflow-y-auto pr-2">
                {currentProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductSelect(product.id)}
                    className={`p-6 rounded-xl cursor-pointer transition-all w-full border-2 ${
                      activeProduct === product.id
                        ? 'border-primary bg-primary/5 shadow-md'
                        : 'border-transparent bg-card hover:bg-gray-50 hover:border-gray-200'
                    }`}
                  >
                    <div className="flex items-start gap-6 w-full">
                      <Checkbox 
                        checked={selectedProducts.includes(product.id)}
                        onCheckedChange={() => toggleProductSelection(product.id)}
                        onClick={(e) => e.stopPropagation()}
                        className="mt-1 bg-white border-2"
                      />
                      <div className="flex-1 min-w-0 w-full">
                        <div className="flex items-start gap-6 w-full">
                          <div className="h-20 w-20 md:h-24 md:w-24 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0 border border-gray-300">
                            {product.image && (
                              <img 
                                src={product.image} 
                                alt={product.name} 
                                className="h-full w-full object-cover"
                              />
                            )}
                          </div>
                          <div className="flex-1 min-w-0 w-full">
                            <div className="font-medium text-sm md:text-base line-clamp-2 mb-4 pr-4 text-gray-900">{product.name}</div>
                            <div className="text-xs md:text-sm flex flex-wrap items-center gap-5">
                              <span className="text-gray-900 font-semibold">
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
                              <div className="text-xs mt-4 truncate pr-4 text-gray-500">
                                {product.storeName}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {currentProducts.length === 0 && (
                  <div className="text-center py-6 text-gray-500 text-sm">
                    {filteredProducts.length === 0 ? 
                      (products.length === 0 ? "Добавьте товары через интеграцию с Kaspi" : "Товары не найдены") :
                      "На этой странице нет товаров"
                    }
                  </div>
                )}
              </div>
              <ProductsPagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const SettingsSection = () => {
    const selectedProduct = products.find(p => p.id === activeProduct);
    
    console.log('PriceBotPage: SettingsSection render - activeProduct:', activeProduct, 'selectedProduct:', selectedProduct);
    
    if (!selectedProduct) {
      return null;
    }
    
    return (
      <Card className="h-fit">
        <Tabs defaultValue="settings">
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3">
              <CardTitle className="text-base md:text-lg line-clamp-2 flex-1">
                {selectedProduct.name}
              </CardTitle>
              <Badge 
                variant={(selectedProduct.botActive || selectedProduct.bot_active) ? 'default' : 'outline'}
                className="self-start"
              >
                {(selectedProduct.botActive || selectedProduct.bot_active) ? 'Активен' : 'На паузе'}
              </Badge>
            </div>
            <TabsList className="grid grid-cols-1 w-full md:w-[200px]">
              <TabsTrigger value="settings" className="text-sm">Настройки бота</TabsTrigger>
            </TabsList>
          </CardHeader>
          <CardContent className="pt-0">
            <TabsContent value="settings">
              <PriceBotSettings 
                product={selectedProduct}
                onSave={handleSaveSettings}
              />
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    );
  };

  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="sticky top-0 z-10 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/40 pb-4 border-b border-gray-100">
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
          <Alert className="bg-blue-50 border-blue-200 mt-4">
            <Info className="h-4 w-4 text-blue-500" />
            <AlertDescription className="text-blue-700 text-sm">
              Вы работаете в демо-режиме. Все изменения будут сохранены только в памяти браузера.
            </AlertDescription>
          </Alert>
        )}
      </div>

      {isMobile ? (
        <div className="space-y-4">
          <ProductsSection />
          
          {activeProduct && (
            <Drawer open={showSettingsDrawer} onOpenChange={setShowSettingsDrawer}>
              <DrawerContent className="h-[90vh] max-h-[90vh] rounded-t-xl">
                <DrawerHeader className="px-4 py-3 border-b flex justify-between items-center">
                  <DrawerTitle className="text-left text-lg">
                    Настройки товара
                  </DrawerTitle>
                  <DrawerClose className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <X className="h-5 w-5" />
                  </DrawerClose>
                </DrawerHeader>
                <div className="flex-1 px-4 py-4 overflow-y-auto">
                  <SettingsSection />
                </div>
              </DrawerContent>
            </Drawer>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <ProductsSection />

          {activeProduct && (
            <div className="self-start">
              <SettingsSection />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PriceBotPage;

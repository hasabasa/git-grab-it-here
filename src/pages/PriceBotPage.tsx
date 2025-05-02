
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, Play, Pause } from "lucide-react";
import { toast } from "sonner";
import PriceBotSettings from "@/components/price-bot/PriceBotSettings";
import CompetitorsList from "@/components/price-bot/CompetitorsList";
import { mockProducts } from "@/data/mockData";
import { runPriceBot } from "@/lib/salesUtils";
import { Product } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import ProductList from "@/components/price-bot/ProductList";
import { useAuth } from "@/components/integration/useAuth";
import AuthComponent from "@/components/integration/AuthComponent";

const PriceBotPage = () => {
  const { user, loading: authLoading } = useAuth();
  const [activeProduct, setActiveProduct] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  
  useEffect(() => {
    if (user) {
      loadUserProducts();
    }
  }, [user]);

  const loadUserProducts = async () => {
    if (!user) return;
    
    setLoadingProducts(true);
    try {
      const { data, error } = await supabase
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
          kaspi_stores(name)
        `)
        .order('name');
      
      if (error) throw error;
      
      // Преобразуем данные в нужный формат
      const formattedProducts = data?.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image_url || '',
        botActive: product.bot_active,
        minProfit: product.min_profit || 0,
        maxProfit: product.max_profit || 0,
        storeName: product.kaspi_stores?.name || ''
      })) || [];

      setProducts(formattedProducts);
    } catch (error: any) {
      console.error('Error loading products:', error);
      toast.error('Ошибка при загрузке товаров');
      setProducts([]);
    } finally {
      setLoadingProducts(false);
    }
  };
  
  const handleProductSelect = (productId: string) => {
    setActiveProduct(productId);
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      // Обновляем статус ботов в Supabase
      const { error } = await supabase
        .from('products')
        .update({
          bot_active: action === 'start',
          updated_at: new Date().toISOString()
        })
        .in('id', selectedProducts);
        
      if (error) throw error;
      
      // Обновляем локальное состояние
      setProducts(prevProducts => 
        prevProducts.map(product => 
          selectedProducts.includes(product.id) 
            ? { ...product, botActive: action === 'start' }
            : product
        )
      );
      
      toast.success(
        `Бот ${action === 'start' ? 'запущен' : 'остановлен'} для ${selectedProducts.length} товаров`
      );
      
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
      // Обновляем настройки в Supabase
      const { error } = await supabase
        .from('products')
        .update({
          bot_active: settings.isActive,
          min_profit: settings.minProfit,
          max_profit: settings.maxProfit,
          updated_at: new Date().toISOString()
        })
        .eq('id', settings.productId);
        
      if (error) throw error;
      
      // Обновляем локальное состояние
      setProducts(prevProducts => 
        prevProducts.map(product => 
          product.id === settings.productId 
            ? { 
                ...product, 
                botActive: settings.isActive,
                minProfit: settings.minProfit,
                maxProfit: settings.maxProfit
              }
            : product
        )
      );
      
      toast.success("Настройки бота сохранены");
    } catch (error: any) {
      console.error("Error saving bot settings:", error);
      toast.error(error.message || "Ошибка при сохранении настроек бота");
    }
  };

  // Если идет загрузка аутентификации, показываем индикатор загрузки
  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  // Если пользователь не авторизован, показываем компонент авторизации
  if (!user) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Бот демпинга</h1>
        <p className="text-gray-600">Для использования функционала бота необходима авторизация</p>
        <AuthComponent />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Бот демпинга</h1>
        <div className="flex items-center gap-2">
          <Button 
            onClick={() => handleBulkAction('start')} 
            disabled={selectedProducts.length === 0 || isLoading}
          >
            <Play className="mr-2 h-4 w-4" />
            Запустить выбранные
          </Button>
          <Button 
            onClick={() => handleBulkAction('stop')} 
            variant="outline"
            disabled={selectedProducts.length === 0 || isLoading}
          >
            <Pause className="mr-2 h-4 w-4" />
            Остановить выбранные
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Мои товары</CardTitle>
            <CardDescription>Выберите товар для настройки бота</CardDescription>
            <div className="flex items-center gap-4 mt-2">
              <Input 
                placeholder="Поиск товаров..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="select-all"
                  checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                  onCheckedChange={toggleSelectAll}
                />
                <label htmlFor="select-all" className="text-sm">Все</label>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loadingProducts ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductSelect(product.id)}
                    className={`p-3 rounded-xl cursor-pointer transition-all ${
                      activeProduct === product.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox 
                        checked={selectedProducts.includes(product.id)}
                        onCheckedChange={() => toggleProductSelection(product.id)}
                        onClick={(e) => e.stopPropagation()}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-lg bg-gray-200 mr-3 overflow-hidden">
                            {product.image && (
                              <img 
                                src={product.image} 
                                alt={product.name} 
                                className="h-full w-full object-cover"
                              />
                            )}
                          </div>
                          <div>
                            <div className="font-medium line-clamp-2">{product.name}</div>
                            <div className="text-sm mt-1 flex items-center">
                              <span className={activeProduct === product.id ? 'text-primary-foreground' : 'text-gray-500'}>
                                {Number(product.price).toLocaleString()} ₸
                              </span>
                              <Badge 
                                variant={product.botActive ? 'default' : 'outline'} 
                                className="ml-2 text-xs"
                              >
                                {product.botActive ? 'Активен' : 'Пауза'}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredProducts.length === 0 && (
                  <div className="text-center py-6 text-gray-500">
                    {products.length === 0 ? "Добавьте товары через интеграцию с Kaspi" : "Товары не найдены"}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {activeProduct && (
          <Card className="lg:col-span-2">
            <Tabs defaultValue="competitors">
              <CardHeader>
                <div className="flex justify-between items-center mb-2">
                  <CardTitle>
                    {products.find(p => p.id === activeProduct)?.name}
                  </CardTitle>
                  <Badge variant={products.find(p => p.id === activeProduct)?.botActive ? 'default' : 'outline'}>
                    {products.find(p => p.id === activeProduct)?.botActive ? 'Активен' : 'На паузе'}
                  </Badge>
                </div>
                <TabsList className="grid grid-cols-2 w-[400px]">
                  <TabsTrigger value="competitors">Конкуренты</TabsTrigger>
                  <TabsTrigger value="settings">Настройки бота</TabsTrigger>
                </TabsList>
              </CardHeader>
              <CardContent>
                <TabsContent value="competitors">
                  <CompetitorsList 
                    productId={activeProduct} 
                  />
                </TabsContent>
                <TabsContent value="settings">
                  <PriceBotSettings 
                    productId={activeProduct} 
                    onSave={handleSaveSettings}
                  />
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PriceBotPage;

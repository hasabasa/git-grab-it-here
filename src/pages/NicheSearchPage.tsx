
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import NicheChart from "@/components/niche-search/NicheChart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockNiches, mockGoldCommissions } from "@/data/mockData";
import NicheProductsList from "@/components/niche-search/NicheProductsList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/integration/useAuth";
import AuthComponent from "@/components/integration/AuthComponent";

// Получаем уникальные категории из комиссий Kaspi
const categories = [...new Set(mockGoldCommissions.map(commission => commission.category))];

const NicheSearchPage = () => {
  const { user, loading: authLoading } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0] || "");
  const [products, setProducts] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("products");

  // Функция для поиска ниш с использованием API
  const fetchNiches = async (category: string) => {
    if (!user) {
      toast.error("Для поиска ниш необходимо авторизоваться");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Вызываем Edge Function для поиска ниш
      const { data, error } = await supabase.functions.invoke('search-niches', {
        body: { category, userId: user.id }
      });
      
      if (error) throw error;
      
      setProducts(data.data || []);
      
      if (data.data.length === 0) {
        toast.info("В выбранной категории не найдено товаров");
      } else {
        toast.success(`Найдено ${data.data.length} товаров`);
      }
    } catch (error: any) {
      console.error("Error fetching niches:", error);
      toast.error("Ошибка при поиске ниш: " + (error.message || ''));
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Получаем товары по категории при первой загрузке или смене категории
  useEffect(() => {
    if (user && selectedCategory) {
      fetchNiches(selectedCategory);
    }
  }, [user, selectedCategory]);

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
        <h1 className="text-3xl font-bold">Поиск ниш</h1>
        <p className="text-gray-600">Для использования поиска ниш необходима авторизация</p>
        <AuthComponent />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Поиск ниш</h1>
      <p className="text-gray-600">
        Анализ продаж товаров на Kaspi
      </p>
      
      <Card>
        <CardHeader>
          <CardTitle>Выбор категории товаров</CardTitle>
          <CardDescription>Выберите категорию для анализа продаж</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex gap-4">
              <Select 
                value={selectedCategory} 
                onValueChange={setSelectedCategory}
                disabled={isLoading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button 
                onClick={() => fetchNiches(selectedCategory)} 
                disabled={isLoading || !selectedCategory}
              >
                {isLoading ? "Загрузка..." : "Обновить"}
              </Button>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : products && products.length > 0 ? (
              <div className="space-y-4">
                <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="products">Товары</TabsTrigger>
                    <TabsTrigger value="chart">График продаж</TabsTrigger>
                  </TabsList>
                  <TabsContent value="products">
                    <NicheProductsList products={products} />
                  </TabsContent>
                  <TabsContent value="chart">
                    {products[0] && (
                      <Card>
                        <CardHeader>
                          <CardTitle>График продаж в категории {selectedCategory}</CardTitle>
                          <CardDescription>Динамика продаж за последние 6 месяцев</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[400px]">
                          <NicheChart data={products[0].chartData} />
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <div className="text-center p-10">
                <p className="text-gray-500">В выбранной категории товары не найдены.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NicheSearchPage;

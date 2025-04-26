
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import NicheChart from "@/components/niche-search/NicheChart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockNiches } from "@/data/mockData";
import { kaspiCommissions } from "@/data/mockData";
import NicheProductsList from "@/components/niche-search/NicheProductsList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Получаем уникальные категории из комиссий Kaspi
const categories = [...new Set(kaspiCommissions.map(commission => commission.category))];

const NicheSearchPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0] || "");
  const [products, setProducts] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("products");

  // Получаем товары по категории
  useEffect(() => {
    if (selectedCategory) {
      setIsLoading(true);
      
      // Имитация загрузки данных с сервера
      setTimeout(() => {
        const categoryProducts = mockNiches.filter(niche => 
          niche.category === selectedCategory
        );
        
        setProducts(categoryProducts);
        setIsLoading(false);
      }, 800);
    }
  }, [selectedCategory]);

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
            <Select 
              value={selectedCategory} 
              onValueChange={setSelectedCategory}
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

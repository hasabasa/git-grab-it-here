
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowDown, ArrowUp } from "lucide-react";
import PriceBotSettings from "@/components/price-bot/PriceBotSettings";
import ProductList from "@/components/price-bot/ProductList";
import CompetitorsList from "@/components/price-bot/CompetitorsList";
import { mockProducts } from "@/data/mockData";

const PriceBotPage = () => {
  const [activeProduct, setActiveProduct] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState(mockProducts);

  const handleProductSelect = (productId: number) => {
    setActiveProduct(productId);
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Бот демпинга</h1>
        <Button>Загрузить товары</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Мои товары</CardTitle>
            <CardDescription>Выберите товар для настройки бота</CardDescription>
            <Input 
              placeholder="Поиск товаров..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-2"
            />
          </CardHeader>
          <CardContent>
            <ProductList 
              products={filteredProducts} 
              activeProductId={activeProduct} 
              onProductSelect={handleProductSelect} 
            />
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
                    onSave={(settings) => console.log('Saved settings:', settings)}
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

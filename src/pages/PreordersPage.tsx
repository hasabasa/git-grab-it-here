import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Package, Plus, TrendingUp } from "lucide-react";
import PreorderForm from "@/components/preorders/PreorderForm";
import PreorderList, { PreorderItem } from "@/components/preorders/PreorderList";
import { useStoreConnection } from "@/hooks/useStoreConnection";
import LoadingScreen from "@/components/ui/loading-screen";

// Mock data for demonstration
const mockPreorders: PreorderItem[] = [
  {
    id: "1",
    article: "PHONE123",
    name: "iPhone 15 Pro Max 256GB",
    brand: "Apple",
    price: 749000,
    warehouses: [{ id: 1, quantity: 5 }, { id: 3, quantity: 10 }],
    deliveryDays: 7,
    status: "processing",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
  },
  {
    id: "2",
    article: "LAPTOP456",
    name: "MacBook Air M2",
    brand: "Apple",
    price: 599000,
    warehouses: [{ id: 3, quantity: 2 }, { id: 4, quantity: 8 }, { id: 5, quantity: 3 }],
    deliveryDays: 5,
    status: "added",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
  },
  {
    id: "3",
    article: "WATCH789",
    name: "Apple Watch Series 9",
    brand: "Apple",
    price: 199000,
    warehouses: [{ id: 1, quantity: 15 }, { id: 4, quantity: 7 }],
    deliveryDays: 3,
    status: "rejected",
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    rejectionReason: "Товар не соответствует требованиям безопасности"
  }
];

const PreordersPage = () => {
  const { loading } = useStoreConnection();
  const [preorders, setPreorders] = useState<PreorderItem[]>(mockPreorders);
  const [showForm, setShowForm] = useState(false);

  const handleAddPreorder = (products: any[]) => {
    const newPreorders = products.map((product, index) => ({
      id: `${Date.now()}-${index}`,
      article: product.article,
      name: product.name,
      brand: product.brand || product.name,
      price: Number(product.price),
      warehouses: [
        ...(product.warehouse1 ? [{ id: 1, quantity: product.warehouse1Quantity }] : []),
        ...(product.warehouse3 ? [{ id: 3, quantity: product.warehouse3Quantity }] : []),
        ...(product.warehouse4 ? [{ id: 4, quantity: product.warehouse4Quantity }] : []),
        ...(product.warehouse5 ? [{ id: 5, quantity: product.warehouse5Quantity }] : [])
      ],
      deliveryDays: Number(product.deliveryDays),
      status: "processing" as const,
      createdAt: new Date()
    }));

    setPreorders(prev => [...newPreorders, ...prev]);
  };

  const handleResubmit = (id: string) => {
    setPreorders(prev => prev.map(item => 
      item.id === id 
        ? { ...item, status: "processing" as const, rejectionReason: undefined }
        : item
    ));
  };

  // Calculate statistics
  const stats = {
    total: preorders.length,
    processing: preorders.filter(p => p.status === "processing").length,
    rejected: preorders.filter(p => p.status === "rejected").length,
    added: preorders.filter(p => p.status === "added").length
  };

  // Show loading screen while checking store connection
  if (loading) {
    return <LoadingScreen text="Загрузка модуля предзаказов..." />;
  }

  return (
    <div className="space-y-6">
      <PreorderForm 
        isOpen={showForm} 
        onClose={() => setShowForm(false)} 
        onSubmit={handleAddPreorder}
      />

      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">Предзаказы</h1>
          <p className="text-muted-foreground">
            Управляйте предзаказами и отслеживайте статус добавления товаров
          </p>
        </div>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Добавить предзаказ
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Всего предзаказов</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Общее количество</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">В обработке</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.processing}</div>
            <p className="text-xs text-muted-foreground">Ожидают проверки</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Добавлено</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.added}</div>
            <p className="text-xs text-muted-foreground">Успешно добавлено</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Отклонено</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            <p className="text-xs text-muted-foreground">Требуют внимания</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Список предзаказов</CardTitle>
          <CardDescription>
            Отслеживайте статус обработки ваших предзаказов
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PreorderList 
            items={preorders} 
            onResubmit={handleResubmit}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default PreordersPage;

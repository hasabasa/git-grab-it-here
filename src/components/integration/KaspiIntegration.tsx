
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Link2, Package, Plus, RefreshCw, Store, Trash2 } from "lucide-react";
import { KaspiStore } from "@/types";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const KaspiIntegration = () => {
  const [stores, setStores] = useState<KaspiStore[]>([]);
  const [isAddingStore, setIsAddingStore] = useState(false);
  const [newStoreName, setNewStoreName] = useState("");
  const [newMerchantId, setNewMerchantId] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isSyncing, setIsSyncing] = useState<string | null>(null);

  const handleAddStore = () => {
    if (!newStoreName || !newMerchantId || !apiKey) {
      toast.error("Пожалуйста, заполните все поля");
      return;
    }

    const newStore: KaspiStore = {
      id: Date.now().toString(),
      merchantId: newMerchantId,
      name: newStoreName,
      productsCount: 0,
      lastSync: new Date().toISOString(),
      isActive: true
    };

    setStores([...stores, newStore]);
    setIsAddingStore(false);
    setNewStoreName("");
    setNewMerchantId("");
    setApiKey("");
    toast.success("Магазин успешно подключен!");
  };

  const handleRemoveStore = (storeId: string) => {
    setStores(stores.filter(store => store.id !== storeId));
    toast("Магазин отключен");
  };

  const handleSync = (storeId: string) => {
    setIsSyncing(storeId);
    setTimeout(() => {
      setIsSyncing(null);
      toast.success("Товары успешно синхронизированы");
      // Обновляем количество товаров для демонстрации
      setStores(stores.map(store => 
        store.id === storeId 
          ? { ...store, productsCount: store.productsCount + 147, lastSync: new Date().toISOString() }
          : store
      ));
    }, 2000);
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {stores.map(store => (
          <Card key={store.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Store className="h-5 w-5 text-orange-500" />
                  <CardTitle>{store.name}</CardTitle>
                </div>
                <Badge className="bg-green-500">Подключено</Badge>
              </div>
              <CardDescription>
                ID магазина: {store.merchantId}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-500">Товаров</div>
                  <div className="mt-1 font-medium">{store.productsCount}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-500">Последняя синхронизация</div>
                  <div className="mt-1 font-medium">
                    {new Date(store.lastSync).toLocaleString('ru-RU', {
                      day: 'numeric',
                      month: 'long',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    onClick={() => handleSync(store.id)}
                    disabled={isSyncing === store.id}
                    className="flex-1 mr-2"
                  >
                    <RefreshCw className={`mr-2 h-4 w-4 ${isSyncing === store.id ? 'animate-spin' : ''}`} />
                    {isSyncing === store.id ? 'Синхронизация...' : 'Синхронизировать товары'}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Импортировать товары из магазина Kaspi
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    onClick={() => handleRemoveStore(store.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Отключить магазин
                </TooltipContent>
              </Tooltip>
            </CardFooter>
          </Card>
        ))}

        <Collapsible open={isAddingStore} onOpenChange={setIsAddingStore}>
          <CollapsibleTrigger asChild>
            {!isAddingStore && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Подключить новый магазин
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Добавить новый магазин Kaspi
                </TooltipContent>
              </Tooltip>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Card>
              <CardHeader>
                <CardTitle>Новый магазин</CardTitle>
                <CardDescription>
                  Подключите ваш магазин Kaspi.kz для автоматического импорта товаров
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="store-name">Название магазина</Label>
                    <Input
                      id="store-name"
                      placeholder="Введите название магазина"
                      value={newStoreName}
                      onChange={(e) => setNewStoreName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="merchant-id">ID Магазина</Label>
                    <Input
                      id="merchant-id"
                      placeholder="Введите ID вашего магазина на Kaspi"
                      value={newMerchantId}
                      onChange={(e) => setNewMerchantId(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Ключ</Label>
                    <Input
                      id="api-key"
                      type="password"
                      placeholder="Введите API ключ"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                    />
                    <p className="text-xs text-gray-500">
                      API ключ можно получить в личном кабинете продавца Kaspi
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => setIsAddingStore(false)}
                  className="mr-2"
                >
                  Отмена
                </Button>
                <Button onClick={handleAddStore}>
                  <Link2 className="mr-2 h-4 w-4" />
                  Подключить магазин
                </Button>
              </CardFooter>
            </Card>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </TooltipProvider>
  );
};

export default KaspiIntegration;

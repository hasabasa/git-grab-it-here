
import { useState, useEffect } from "react";
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
import { Link2, Package, Plus, RefreshCw, Store, Trash2, AlertTriangle, LogIn } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "./useAuth";
import { supabase } from "@/integrations/supabase/client";
import { KaspiStore } from "@/types";
import { Alert, AlertDescription } from "@/components/ui/alert";
import AuthComponent from "./AuthComponent";

const KaspiIntegration = () => {
  const { user, loading: authLoading } = useAuth();
  const [stores, setStores] = useState<KaspiStore[]>([]);
  const [isAddingStore, setIsAddingStore] = useState(false);
  const [newStoreName, setNewStoreName] = useState("");
  const [newMerchantId, setNewMerchantId] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isSyncing, setIsSyncing] = useState<string | null>(null);
  const [isLoadingStoreName, setIsLoadingStoreName] = useState(false);
  const [loadingStores, setLoadingStores] = useState(false);

  // Демонстрационные магазины с добавленными полями created_at и updated_at
  const demoStores: KaspiStore[] = [
    {
      id: '1',
      merchant_id: 'demo-123',
      name: 'Демонстрационный магазин',
      user_id: 'demo',
      api_key: '****',
      products_count: 157,
      last_sync: new Date().toISOString(),
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '2',
      merchant_id: 'demo-456',
      name: 'Тестовый магазин',
      user_id: 'demo',
      api_key: '****',
      products_count: 86,
      last_sync: new Date(Date.now() - 86400000).toISOString(),
      is_active: true,
      created_at: new Date(Date.now() - 604800000).toISOString(), // Неделю назад
      updated_at: new Date(Date.now() - 86400000).toISOString() // День назад
    }
  ];

  // Загружаем магазины пользователя из Supabase
  useEffect(() => {
    if (user) {
      loadUserStores();
    } else {
      // Для демонстрации без авторизации
      setStores(demoStores);
    }
  }, [user]);

  const loadUserStores = async () => {
    if (!user) return;
    
    setLoadingStores(true);
    try {
      const { data, error } = await supabase
        .from('kaspi_stores')
        .select('*')
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      // Устанавливаем данные магазинов
      setStores(data as KaspiStore[] || []);
    } catch (error: any) {
      console.error('Error loading stores:', error);
      toast.error('Ошибка при загрузке магазинов');
    } finally {
      setLoadingStores(false);
    }
  };

  const fetchStoreName = async (merchantId: string) => {
    // Имитация API запроса
    setIsLoadingStoreName(true);
    try {
      // В реальном приложении здесь был бы запрос к API Kaspi
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockStoreName = `Магазин ${merchantId}`;
      setNewStoreName(mockStoreName);
      toast.success("Название магазина получено");
    } catch (error) {
      toast.error("Не удалось получить название магазина");
    } finally {
      setIsLoadingStoreName(false);
    }
  };

  const handleMerchantIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewMerchantId(value);
    if (value.length >= 5) { // Предполагаем, что ID магазина должен быть минимум 5 символов
      fetchStoreName(value);
    }
  };

  const handleAddStore = async () => {
    if (!user) {
      toast.error("Пожалуйста, войдите в аккаунт для сохранения данных");
      return;
    }

    try {
      const newStore = {
        merchant_id: newMerchantId,
        name: newStoreName,
        user_id: user.id,
        api_key: apiKey,
        products_count: 0,
        last_sync: new Date().toISOString(),
        is_active: true
      };

      const { data, error } = await supabase
        .from('kaspi_stores')
        .insert([newStore])
        .select()
        .single();
      
      if (error) throw error;
      
      setStores([...stores, data as KaspiStore]);
      setIsAddingStore(false);
      setNewStoreName("");
      setNewMerchantId("");
      setApiKey("");
      toast.success("Магазин успешно подключен!");
    } catch (error: any) {
      console.error('Error adding store:', error);
      toast.error(error.message || 'Ошибка при добавлении магазина');
    }
  };

  const handleRemoveStore = async (storeId: string) => {
    if (!user) {
      toast.error("Эта функция доступна только после входа в аккаунт");
      return;
    }
    
    try {
      const { error } = await supabase
        .from('kaspi_stores')
        .delete()
        .eq('id', storeId);
      
      if (error) throw error;
      
      setStores(stores.filter(store => store.id !== storeId));
      toast("Магазин отключен");
    } catch (error: any) {
      console.error('Error removing store:', error);
      toast.error(error.message || 'Ошибка при отключении магазина');
    }
  };

  const handleSync = async (storeId: string) => {
    if (!user) {
      toast.error("Для синхронизации требуется авторизация");
      return;
    }
    
    setIsSyncing(storeId);
    try {
      // В реальном приложении здесь был бы API запрос к Edge Function для синхронизации с Kaspi
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Находим текущий счетчик продуктов для этого магазина
      const currentStore = stores.find(s => s.id === storeId);
      const currentCount = currentStore?.products_count || 0;
      
      // Обновление количества товаров и времени синхронизации
      const { error } = await supabase
        .from('kaspi_stores')
        .update({
          products_count: currentCount + 147,
          last_sync: new Date().toISOString()
        })
        .eq('id', storeId);
      
      if (error) throw error;
      
      // Обновляем состояние
      setStores(stores.map(store => 
        store.id === storeId 
          ? { ...store, products_count: (store.products_count || 0) + 147, last_sync: new Date().toISOString() }
          : store
      ));
      
      toast.success("Товары успешно синхронизированы");
    } catch (error) {
      console.error('Error syncing store:', error);
      toast.error('Ошибка синхронизации магазина');
    } finally {
      setIsSyncing(null);
    }
  };

  const demoAddStore = () => {
    if (user) {
      setIsAddingStore(true);
      return;
    }
    
    toast.error("Для добавления магазина требуется авторизация");
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {!user && (
          <Alert className="bg-amber-50 border-amber-200">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <AlertDescription className="text-amber-700">
              Вы просматриваете демонстрационные данные. Для подключения реальных магазинов требуется 
              <Button variant="link" asChild className="p-0 h-auto font-semibold">
                <a href="/"> войти в систему</a>
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {loadingStores ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
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
                    ID магазина: {store.merchant_id}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm font-medium text-gray-500">Товаров</div>
                      <div className="mt-1 font-medium">{store.products_count}</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm font-medium text-gray-500">Последняя синхронизация</div>
                      <div className="mt-1 font-medium">
                        {new Date(store.last_sync || Date.now()).toLocaleString('ru-RU', {
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
                        disabled={isSyncing === store.id || !user}
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
                        disabled={!user}
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

            {!isAddingStore ? (
              <Button 
                className="w-full" 
                onClick={demoAddStore}
              >
                {user ? (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Подключить новый магазин
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Войдите для добавления магазина
                  </>
                )}
              </Button>
            ) : (
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
                      <Label htmlFor="merchant-id">ID Магазина</Label>
                      <Input
                        id="merchant-id"
                        placeholder="Введите ID вашего магазина на Kaspi"
                        value={newMerchantId}
                        onChange={handleMerchantIdChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="store-name">Название магазина</Label>
                      <Input
                        id="store-name"
                        placeholder="Название магазина будет получено автоматически"
                        value={newStoreName}
                        onChange={(e) => setNewStoreName(e.target.value)}
                        disabled={isLoadingStoreName}
                      />
                      {isLoadingStoreName && (
                        <p className="text-xs text-gray-500">
                          Получение названия магазина...
                        </p>
                      )}
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
                    onClick={() => {
                      setIsAddingStore(false);
                      setNewStoreName("");
                      setNewMerchantId("");
                      setApiKey("");
                    }}
                    className="mr-2"
                  >
                    Отмена
                  </Button>
                  <Button 
                    onClick={handleAddStore}
                    disabled={!newMerchantId || !newStoreName || isLoadingStoreName}
                  >
                    <Link2 className="mr-2 h-4 w-4" />
                    Подключить магазин
                  </Button>
                </CardFooter>
              </Card>
            )}
          </>
        )}
      </div>
    </TooltipProvider>
  );
};

export default KaspiIntegration;

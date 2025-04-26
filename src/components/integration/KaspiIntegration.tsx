
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
import { Link2, Package, Plus, RefreshCw, Store, Trash2, AlertTriangle } from "lucide-react";
import { KaspiStore } from "@/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "./useAuth"; // Новый хук для авторизации

const KaspiIntegration = () => {
  const { user, signIn, signUp, isSupabaseConfigured } = useAuth();
  const [stores, setStores] = useState<KaspiStore[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAddingStore, setIsAddingStore] = useState(false);
  const [newStoreName, setNewStoreName] = useState("");
  const [newMerchantId, setNewMerchantId] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isSyncing, setIsSyncing] = useState<string | null>(null);
  const [isLoadingStoreName, setIsLoadingStoreName] = useState(false);

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

  const handleAddStore = () => {
    if (!user) {
      toast.error("Пожалуйста, войдите в аккаунт");
      return;
    }

    const newStore: KaspiStore = {
      id: Date.now().toString(),
      merchantId: newMerchantId,
      name: newStoreName,
      userId: user.id, // Привязка магазина к пользователю
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

  const handleSignIn = async () => {
    try {
      await signIn(email, password);
    } catch (error) {
      toast.error("Ошибка входа");
    }
  };

  const handleSignUp = async () => {
    try {
      await signUp(email, password);
    } catch (error) {
      toast.error("Ошибка регистрации");
    }
  };

  // Show error message if Supabase is not configured
  if (!isSupabaseConfigured) {
    return (
      <Card className="border-yellow-300 bg-yellow-50">
        <CardHeader>
          <div className="flex items-center gap-2 text-yellow-600">
            <AlertTriangle />
            <CardTitle>Требуется настройка Supabase</CardTitle>
          </div>
          <CardDescription>
            Для работы с аутентификацией необходимо настроить подключение к Supabase
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            Чтобы использовать функции авторизации и хранения данных, необходимо установить следующие переменные окружения:
          </p>
          <div className="mt-4 p-4 bg-gray-100 rounded-md font-mono text-xs">
            <p>VITE_SUPABASE_URL=ваш_url_supabase</p>
            <p>VITE_SUPABASE_ANON_KEY=ваш_anon_key_supabase</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" onClick={() => toast.info("Для настройки переменных окружения обратитесь к документации.")}>
            Подробнее
          </Button>
        </CardFooter>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Вход в систему</CardTitle>
          <CardDescription>
            Добавляйте и управляйте магазинами Kaspi
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Email</Label>
            <Input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div>
            <Label>Пароль</Label>
            <Input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleSignUp}>
            Регистрация
          </Button>
          <Button onClick={handleSignIn}>
            Войти
          </Button>
        </CardFooter>
      </Card>
    );
  }

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

        {!isAddingStore ? (
          <Button 
            className="w-full" 
            onClick={() => setIsAddingStore(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Подключить новый магазин
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
                disabled={isLoadingStoreName}
              >
                <Link2 className="mr-2 h-4 w-4" />
                Подключить магазин
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </TooltipProvider>
  );
};

export default KaspiIntegration;

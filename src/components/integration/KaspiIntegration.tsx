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
import { useIsMobile } from "@/hooks/use-mobile";

const KaspiIntegration = () => {
  const { user, loading: authLoading } = useAuth();
  const isMobile = useIsMobile();
  const [stores, setStores] = useState<KaspiStore[]>([]);
  const [isAddingStore, setIsAddingStore] = useState(false);
  const [kaspiEmail, setKaspiEmail] = useState("");
  const [kaspiPassword, setKaspiPassword] = useState("");
  const [isSyncing, setIsSyncing] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [loadingStores, setLoadingStores] = useState(false);

  // Демонстрационные магазины
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
      created_at: new Date(Date.now() - 604800000).toISOString(),
      updated_at: new Date(Date.now() - 86400000).toISOString()
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
      
      setStores(data as KaspiStore[] || []);
    } catch (error: any) {
      console.error('Error loading stores:', error);
      toast.error('Ошибка при загрузке магазинов');
    } finally {
      setLoadingStores(false);
    }
  };

  const handleConnectStore = async () => {
    if (!user) {
      toast.error("Пожалуйста, войдите в аккаунт для подключения магазина");
      return;
    }

    if (!kaspiEmail || !kaspiPassword) {
      toast.error("Пожалуйста, заполните все поля");
      return;
    }

    setIsConnecting(true);
    try {
      // В реальном приложении здесь будет запрос к API для авторизации в Kaspi
      // и получения данных магазина
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Имитируем получение данных магазина
      const mockStoreData = {
        merchant_id: `kaspi_${Date.now()}`,
        name: `Магазин ${kaspiEmail.split('@')[0]}`,
        user_id: user.id,
        api_key: 'auto_generated_token',
        products_count: 0,
        last_sync: new Date().toISOString(),
        is_active: true
      };

      const { data, error } = await supabase
        .from('kaspi_stores')
        .insert([mockStoreData])
        .select()
        .single();
      
      if (error) throw error;
      
      setStores([...stores, data as KaspiStore]);
      setIsAddingStore(false);
      setKaspiEmail("");
      setKaspiPassword("");
      toast.success("Магазин успешно подключен!");
    } catch (error: any) {
      console.error('Error connecting store:', error);
      toast.error('Ошибка при подключении магазина. Проверьте данные для входа.');
    } finally {
      setIsConnecting(false);
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
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const currentStore = stores.find(s => s.id === storeId);
      const currentCount = currentStore?.products_count || 0;
      
      const { error } = await supabase
        .from('kaspi_stores')
        .update({
          products_count: currentCount + 147,
          last_sync: new Date().toISOString()
        })
        .eq('id', storeId);
      
      if (error) throw error;
      
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
      <div className="space-y-4 sm:space-y-6">
        {!user && (
          <Alert className="bg-amber-50 border-amber-200">
            <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0" />
            <AlertDescription className="text-amber-700 text-sm">
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
                <CardHeader className="pb-3 sm:pb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <Store className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500 flex-shrink-0" />
                      <CardTitle className="text-base sm:text-lg truncate">{store.name}</CardTitle>
                    </div>
                    <Badge className="bg-green-500 text-xs sm:text-sm flex-shrink-0">Подключено</Badge>
                  </div>
                  <CardDescription className="text-xs sm:text-sm">
                    ID магазина: {store.merchant_id}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-2 gap-4'}`}>
                    <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                      <div className="text-xs sm:text-sm font-medium text-gray-500">Товаров</div>
                      <div className="mt-1 font-medium text-sm sm:text-base">{store.products_count}</div>
                    </div>
                    <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                      <div className="text-xs sm:text-sm font-medium text-gray-500">Последняя синхронизация</div>
                      <div className="mt-1 font-medium text-xs sm:text-sm">
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
                <CardFooter className={`${isMobile ? 'flex-col gap-2' : 'flex-row justify-between'} pt-3 sm:pt-6`}>
                  {isMobile ? (
                    <>
                      <Button 
                        onClick={() => handleSync(store.id)}
                        disabled={isSyncing === store.id || !user}
                        className="w-full text-sm"
                        size="sm"
                      >
                        <RefreshCw className={`mr-2 h-4 w-4 ${isSyncing === store.id ? 'animate-spin' : ''}`} />
                        {isSyncing === store.id ? 'Синхронизация...' : 'Синхронизировать товары'}
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => handleRemoveStore(store.id)}
                        disabled={!user}
                        className="w-full text-sm"
                        size="sm"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Отключить магазин
                      </Button>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </CardFooter>
              </Card>
            ))}

            {!isAddingStore ? (
              <Button 
                className="w-full text-sm sm:text-base" 
                onClick={demoAddStore}
                size={isMobile ? "sm" : "default"}
              >
                {user ? (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Подключить магазин Kaspi
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
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="text-base sm:text-lg">Подключение магазина Kaspi</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Введите данные от вашего аккаунта Kaspi для автоматического подключения магазина
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="kaspi-email" className="text-sm">Email от Kaspi</Label>
                      <Input
                        id="kaspi-email"
                        type="email"
                        placeholder="Введите email от аккаунта Kaspi"
                        value={kaspiEmail}
                        onChange={(e) => setKaspiEmail(e.target.value)}
                        className="text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="kaspi-password" className="text-sm">Пароль от Kaspi</Label>
                      <Input
                        id="kaspi-password"
                        type="password"
                        placeholder="Введите пароль от аккаунта Kaspi"
                        value={kaspiPassword}
                        onChange={(e) => setKaspiPassword(e.target.value)}
                        className="text-sm"
                      />
                      <p className="text-xs text-gray-500">
                        Ваши данные защищены и используются только для подключения магазина
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className={`${isMobile ? 'flex-col gap-2' : 'flex-row justify-between'} pt-3 sm:pt-6`}>
                  {isMobile ? (
                    <>
                      <Button 
                        onClick={handleConnectStore}
                        disabled={!kaspiEmail || !kaspiPassword || isConnecting}
                        className="w-full text-sm"
                        size="sm"
                      >
                        <Link2 className="mr-2 h-4 w-4" />
                        {isConnecting ? 'Подключение...' : 'Подключить магазин'}
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setIsAddingStore(false);
                          setKaspiEmail("");
                          setKaspiPassword("");
                        }}
                        disabled={isConnecting}
                        className="w-full text-sm"
                        size="sm"
                      >
                        Отмена
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setIsAddingStore(false);
                          setKaspiEmail("");
                          setKaspiPassword("");
                        }}
                        className="mr-2"
                        disabled={isConnecting}
                      >
                        Отмена
                      </Button>
                      <Button 
                        onClick={handleConnectStore}
                        disabled={!kaspiEmail || !kaspiPassword || isConnecting}
                      >
                        <Link2 className="mr-2 h-4 w-4" />
                        {isConnecting ? 'Подключение...' : 'Подключить магазин'}
                      </Button>
                    </>
                  )}
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

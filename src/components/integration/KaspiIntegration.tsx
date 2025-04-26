
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
import { Link2, RefreshCw, ShoppingCart } from "lucide-react";

const KaspiIntegration = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [merchantId, setMerchantId] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);

  const handleConnect = () => {
    if (!apiKey || !merchantId) {
      toast.error("Пожалуйста, заполните все поля");
      return;
    }
    
    // В реальном приложении здесь будет проверка API ключа
    setIsConnected(true);
    toast.success("Магазин успешно подключен!");
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setApiKey("");
    setMerchantId("");
    toast("Магазин отключен");
  };

  const handleSync = () => {
    if (!isConnected) {
      toast.error("Сначала подключите магазин");
      return;
    }
    
    setIsSyncing(true);
    
    // Имитация синхронизации
    setTimeout(() => {
      setIsSyncing(false);
      toast.success("Товары успешно синхронизированы");
    }, 2000);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Интеграция с Kaspi</CardTitle>
          {isConnected && (
            <Badge className="bg-green-500">Подключено</Badge>
          )}
        </div>
        <CardDescription>
          Подключите ваш магазин Kaspi.kz для автоматического импорта товаров и управления ценами
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isConnected ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="merchant-id">ID Магазина</Label>
              <Input
                id="merchant-id"
                placeholder="Введите ID вашего магазина на Kaspi"
                value={merchantId}
                onChange={(e) => setMerchantId(e.target.value)}
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
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm font-medium text-gray-500">ID Магазина</div>
                <div className="mt-1 font-medium">{merchantId}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm font-medium text-gray-500">Товаров</div>
                <div className="mt-1 font-medium">147</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-4 w-4 text-orange-500" />
              <span className="text-sm">Последняя синхронизация: сегодня, 14:30</span>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {!isConnected ? (
          <Button onClick={handleConnect} className="w-full">
            <Link2 className="mr-2 h-4 w-4" />
            Подключить магазин
          </Button>
        ) : (
          <div className="flex w-full space-x-2">
            <Button 
              onClick={handleSync} 
              className="flex-1"
              disabled={isSyncing}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? 'Синхронизация...' : 'Синхронизировать товары'}
            </Button>
            <Button 
              variant="outline" 
              onClick={handleDisconnect}
            >
              Отключить
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default KaspiIntegration;

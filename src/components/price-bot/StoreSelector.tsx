
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Store, Package } from "lucide-react";
import { KaspiStore } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/integration/useAuth";

interface StoreSelectorProps {
  selectedStoreId: string | null;
  onStoreChange: (storeId: string | null) => void;
}

const StoreSelector = ({ selectedStoreId, onStoreChange }: StoreSelectorProps) => {
  const { user, isDemo } = useAuth();
  const [stores, setStores] = useState<KaspiStore[]>([]);
  const [loading, setLoading] = useState(false);

  // Демонстрационные магазины
  const demoStores: KaspiStore[] = [
    {
      id: 'demo-1',
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
      id: 'demo-2',
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

  useEffect(() => {
    if (isDemo) {
      setStores(demoStores);
    } else if (user) {
      loadStores();
    }
  }, [user, isDemo]);

  const loadStores = async () => {
    if (!user || isDemo) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('kaspi_stores')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true);
      
      if (error) throw error;
      
      setStores(data as KaspiStore[] || []);
    } catch (error: any) {
      console.error('Error loading stores:', error);
    } finally {
      setLoading(false);
    }
  };

  const selectedStore = stores.find(store => store.id === selectedStoreId);
  const totalProducts = selectedStoreId === 'all' 
    ? stores.reduce((sum, store) => sum + (store.products_count || 0), 0)
    : selectedStore?.products_count || 0;

  return (
    <Card className="h-fit">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-xl">
          <Store className="h-6 w-6 text-blue-600" />
          Выбор магазина
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Select 
          value={selectedStoreId || 'all'} 
          onValueChange={(value) => onStoreChange(value === 'all' ? null : value)}
          disabled={loading}
        >
          <SelectTrigger className="h-12 text-base">
            <SelectValue placeholder="Выберите магазин" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="py-3">
              <div className="flex items-center gap-3">
                <Store className="h-5 w-5 text-gray-500" />
                <span className="font-medium">Все магазины</span>
              </div>
            </SelectItem>
            {stores.map((store) => (
              <SelectItem key={store.id} value={store.id} className="py-3">
                <div className="flex items-center gap-3">
                  <Store className="h-5 w-5 text-blue-500" />
                  <span>{store.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {stores.length > 0 && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Package className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 text-base">
                    {selectedStoreId === null ? 'Все магазины' : selectedStore?.name || 'Магазин не найден'}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {totalProducts} товаров в системе
                  </div>
                </div>
              </div>
              
              {selectedStoreId === null && stores.length > 1 && (
                <div className="pt-3 border-t border-blue-200">
                  <div className="text-xs text-gray-500 mb-2">Распределение по магазинам:</div>
                  <div className="space-y-2">
                    {stores.map((store) => (
                      <div key={store.id} className="flex justify-between items-center text-sm">
                        <span className="text-gray-700 truncate flex-1 mr-2">
                          {store.name}
                        </span>
                        <span className="font-medium text-gray-900 bg-white px-2 py-1 rounded">
                          {store.products_count || 0}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {stores.length === 0 && !loading && (
          <div className="text-center py-8 text-gray-500">
            <Store className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <div className="text-base font-medium mb-1">
              {isDemo ? 'Загрузка демо-магазинов...' : 'Магазины не найдены'}
            </div>
            <div className="text-sm">
              {!isDemo && 'Подключите магазины через интеграцию'}
            </div>
          </div>
        )}

        {loading && (
          <div className="flex justify-center py-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StoreSelector;

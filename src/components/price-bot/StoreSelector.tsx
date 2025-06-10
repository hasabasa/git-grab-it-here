
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
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Store className="h-5 w-5" />
          Выбор магазина
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Select 
            value={selectedStoreId || 'all'} 
            onValueChange={(value) => onStoreChange(value === 'all' ? null : value)}
            disabled={loading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите магазин" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                <div className="flex items-center gap-2">
                  <Store className="h-4 w-4" />
                  Все магазины
                </div>
              </SelectItem>
              {stores.map((store) => (
                <SelectItem key={store.id} value={store.id}>
                  <div className="flex items-center gap-2">
                    <Store className="h-4 w-4" />
                    {store.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {stores.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">
                    {selectedStoreId === null ? 'Все магазины' : selectedStore?.name || 'Магазин не найден'}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  {totalProducts} товаров
                </div>
              </div>
            </div>
          )}

          {stores.length === 0 && !loading && (
            <div className="text-center py-4 text-gray-500 text-sm">
              {isDemo ? 'Загрузка демо-магазинов...' : 'Магазины не найдены'}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StoreSelector;

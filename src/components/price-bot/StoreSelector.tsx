import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Store, Package } from "lucide-react";
import { KaspiStore } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/integration/useAuth";
import { useStoreContext } from "@/contexts/StoreContext";
interface StoreSelectorProps {
  selectedStoreId: string | null;
  onStoreChange: (storeId: string | null) => void;
}
const StoreSelector = ({
  selectedStoreId,
  onStoreChange
}: StoreSelectorProps) => {
  const {
    user,
    isDemo
  } = useAuth();
  const {
    stores: globalStores,
    loading: globalLoading,
    setSelectedStore: setGlobalStore
  } = useStoreContext();
  const [stores, setStores] = useState<KaspiStore[]>([]);
  const [loading, setLoading] = useState(false);

  // Демонстрационные магазины
  const demoStores: KaspiStore[] = [{
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
  }, {
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
  }];

  // Use global stores if available
  useEffect(() => {
    if (globalStores.length > 0) {
      setStores(globalStores);
    } else if (isDemo) {
      setStores(demoStores);
    } else if (user) {
      loadStores();
    }
  }, [user, isDemo, globalStores]);

  // Auto-select first store if no store is selected
  useEffect(() => {
    if (stores.length > 0 && !selectedStoreId) {
      const firstStore = stores[0];
      onStoreChange(firstStore.id);
    }
  }, [stores, selectedStoreId, onStoreChange]);
  const loadStores = async () => {
    if (!user || isDemo) return;
    setLoading(true);
    try {
      const {
        data,
        error
      } = await supabase.from('kaspi_stores').select('*').eq('user_id', user.id).eq('is_active', true);
      if (error) throw error;
      setStores(data as KaspiStore[] || []);
    } catch (error: any) {
      console.error('Error loading stores:', error);
    } finally {
      setLoading(false);
    }
  };

  // Synchronize with global store context
  const handleStoreChange = (storeId: string | null) => {
    onStoreChange(storeId);
    // Also update global context
    setGlobalStore(storeId);
  };
  const selectedStore = stores.find(store => store.id === selectedStoreId);
  const totalProducts = selectedStore?.products_count || 0;
  const isLoading = loading || globalLoading;
  return;
};
export default StoreSelector;
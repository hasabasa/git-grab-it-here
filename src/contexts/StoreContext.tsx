
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { KaspiStore } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/integration/useAuth';
import { toast } from 'sonner';

interface StoreContextType {
  selectedStoreId: string | null;
  selectedStore: KaspiStore | null;
  stores: KaspiStore[];
  loading: boolean;
  error: string | null;
  setSelectedStore: (storeId: string | null) => void;
  refreshStores: () => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

interface StoreContextProviderProps {
  children: ReactNode;
}

export const StoreContextProvider = ({ children }: StoreContextProviderProps) => {
  const { user, isDemo } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  const [stores, setStores] = useState<KaspiStore[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Demo stores
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

  // Load stores function
  const loadStores = async () => {
    if (isDemo) {
      setStores(demoStores);
      return;
    }

    if (!user) {
      setStores([]);
      return;
    }

    setLoading(true);
    setError(null);
    
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
      setError('Ошибка загрузки магазинов');
      toast.error('Ошибка загрузки магазинов');
    } finally {
      setLoading(false);
    }
  };

  // Set selected store with URL and localStorage persistence
  const setSelectedStore = (storeId: string | null) => {
    setSelectedStoreId(storeId);
    
    // Update URL params
    const newSearchParams = new URLSearchParams(searchParams);
    if (storeId && storeId !== 'all') {
      newSearchParams.set('storeId', storeId);
    } else {
      newSearchParams.delete('storeId');
    }
    setSearchParams(newSearchParams, { replace: true });
    
    // Save to localStorage
    if (storeId) {
      localStorage.setItem('selectedStoreId', storeId);
    } else {
      localStorage.removeItem('selectedStoreId');
    }
  };

  // Initialize from URL or localStorage, default to 'all'
  const initializeSelectedStore = () => {
    const urlStoreId = searchParams.get('storeId');
    const savedStoreId = localStorage.getItem('selectedStoreId');
    
    // Check if URL store ID is valid
    if (urlStoreId && stores.find(store => store.id === urlStoreId)) {
      setSelectedStoreId(urlStoreId);
      return;
    }
    
    // Check if saved store ID is valid
    if (savedStoreId && savedStoreId !== 'null' && stores.find(store => store.id === savedStoreId)) {
      setSelectedStoreId(savedStoreId);
      return;
    }
    
    // Default to 'all' for global context
    setSelectedStoreId('all');
  };

  // Load stores on user change
  useEffect(() => {
    loadStores();
  }, [user, isDemo]);

  // Initialize selected store when stores change
  useEffect(() => {
    if (!loading) {
      initializeSelectedStore();
    }
  }, [stores, loading]);

  // Get selected store object
  const selectedStore = selectedStoreId && selectedStoreId !== 'all'
    ? stores.find(store => store.id === selectedStoreId) || null
    : null;

  const value: StoreContextType = {
    selectedStoreId,
    selectedStore,
    stores,
    loading,
    error,
    setSelectedStore,
    refreshStores: loadStores
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStoreContext must be used within a StoreContextProvider');
  }
  return context;
};

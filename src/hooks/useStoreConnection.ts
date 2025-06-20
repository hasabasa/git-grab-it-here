
import { useStoreContext } from "@/contexts/StoreContext";
import { useAuth } from "@/components/integration/useAuth";

export const useStoreConnection = () => {
  const { stores, loading, selectedStoreId } = useStoreContext();
  const { isDemo } = useAuth();

  const hasStores = stores.length > 0;
  const isConnected = hasStores || isDemo;
  const needsConnection = !isConnected && !loading;

  return {
    hasStores,
    isConnected,
    needsConnection,
    loading,
    stores,
    selectedStoreId
  };
};

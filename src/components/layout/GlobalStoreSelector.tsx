
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Store, Package } from "lucide-react";
import { useStoreContext } from "@/contexts/StoreContext";
import { useScreenSize } from "@/hooks/use-screen-size";
import { cn } from "@/lib/utils";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const GlobalStoreSelector = () => {
  const { selectedStoreId, stores, loading, setSelectedStore } = useStoreContext();
  const { isMobile, isLargeDesktop, isExtraLargeDesktop } = useScreenSize();
  const [open, setOpen] = useState(false);

  const selectedStore = stores.find(store => store.id === selectedStoreId);
  const totalProducts = selectedStoreId === null || selectedStoreId === 'all'
    ? stores.reduce((sum, store) => sum + (store.products_count || 0), 0)
    : selectedStore?.products_count || 0;

  const getDisplayName = () => {
    if (selectedStoreId === null || selectedStoreId === 'all') {
      return isMobile ? 'Все' : 'Все магазины';
    }
    const store = selectedStore;
    if (!store) return 'Магазин не найден';
    
    if (isMobile && store.name.length > 15) {
      return store.name.substring(0, 15) + '...';
    }
    return store.name;
  };

  const handleStoreChange = (value: string) => {
    setSelectedStore(value === 'all' ? null : value);
    setOpen(false);
  };

  if (stores.length === 0 && !loading) {
    return null;
  }

  // Mobile version with Drawer
  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button 
            variant="outline" 
            className="flex items-center gap-2 h-9 px-3"
            disabled={loading}
          >
            <Store className="h-4 w-4" />
            <span className="text-sm">{getDisplayName()}</span>
            <Package className="h-3 w-3 text-gray-500" />
            <span className="text-xs text-gray-500">{totalProducts}</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Выберите магазин</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 space-y-2">
            <Button
              variant={selectedStoreId === null ? "default" : "outline"}
              className="w-full justify-start"
              onClick={() => handleStoreChange('all')}
            >
              <Store className="h-4 w-4 mr-2" />
              Все магазины ({stores.reduce((sum, store) => sum + (store.products_count || 0), 0)})
            </Button>
            {stores.map((store) => (
              <Button
                key={store.id}
                variant={selectedStoreId === store.id ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => handleStoreChange(store.id)}
              >
                <Store className="h-4 w-4 mr-2" />
                {store.name} ({store.products_count || 0})
              </Button>
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  // Desktop version with Select
  const selectWidth = isExtraLargeDesktop ? "w-64" : isLargeDesktop ? "w-48" : "w-40";

  return (
    <div className="flex items-center gap-2">
      <Store className="h-4 w-4 text-gray-500 hidden lg:block" />
      <Select 
        value={selectedStoreId || 'all'} 
        onValueChange={handleStoreChange}
        disabled={loading}
      >
        <SelectTrigger className={cn("h-9", selectWidth)}>
          <SelectValue placeholder="Выберите магазин" />
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
          <SelectItem value="all" className="cursor-pointer hover:bg-gray-50">
            <div className="flex items-center gap-2">
              <Store className="h-4 w-4 text-gray-500" />
              <span>Все магазины</span>
              <span className="text-xs text-gray-500 ml-auto">
                ({stores.reduce((sum, store) => sum + (store.products_count || 0), 0)})
              </span>
            </div>
          </SelectItem>
          {stores.map((store) => (
            <SelectItem key={store.id} value={store.id} className="cursor-pointer hover:bg-gray-50">
              <div className="flex items-center gap-2">
                <Store className="h-4 w-4 text-blue-500" />
                <span className="truncate">{store.name}</span>
                <span className="text-xs text-gray-500 ml-auto">
                  ({store.products_count || 0})
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default GlobalStoreSelector;

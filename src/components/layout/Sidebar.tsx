import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "@/components/layout/ModeToggle";
import { useTheme } from "next-themes";
import { Link } from "react-router-dom";
import { useAuth } from "@/components/integration/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useStore } from "@/contexts/StoreContext";
import { useRouteConfig } from "@/hooks/useRouteConfig";
import {
  BarChart3,
  Calculator,
  ClipboardList,
  CreditCard,
  Home,
  LogOut,
  MessageCircle,
  Package,
  Search,
  Settings,
  Store as StoreIcon,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  width: string;
}

const menuItems = [
  {
    icon: Calculator,
    label: "Прайс-бот",
    href: "/dashboard/price-bot",
    requiredModules: ["price_bot"]
  },
  {
    icon: BarChart3,
    label: "Продажи",
    href: "/dashboard/sales",
    requiredModules: ["analytics"]
  },
  {
    icon: ClipboardList,
    label: "Задачи",
    href: "/dashboard/tasks",
    requiredModules: ["crm"]
  },
  {
    icon: Calculator,
    label: "Юнит-экономика",
    href: "/dashboard/unit-economics",
    requiredModules: ["unit_economics"]
  },
  {
    icon: Search,
    label: "Поиск ниш",
    href: "/dashboard/niche-search",
    requiredModules: ["niche_search"]
  },
  {
    icon: Package,
    label: "Предзаказы",
    href: "/dashboard/preorders",
    requiredModules: ["preorders"]
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    href: "/dashboard/whatsapp",
    requiredModules: ["whatsapp"]
  },
  {
    icon: Settings,
    label: "Интеграции",
    href: "/dashboard/integration",
    requiredModules: ["integrations"]
  },
  {
    icon: CreditCard,
    label: "Подписка",
    href: "/dashboard/subscription",
    requiredModules: []
  }
];

const Sidebar = ({ isOpen, setIsOpen, width }: SidebarProps) => {
  const { theme } = useTheme();
  const { user, signOut } = useAuth();
  const { stores, selectedStore, setSelectedStore } = useStore();
  const { currentConfig } = useRouteConfig();
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleStoreChange = (storeId: string) => {
    setSelectedStore(storeId);
  };

  const renderMenuItems = () => {
    return menuItems.map((item) => {
      if (item.requiredModules && item.requiredModules.length > 0) {
        const hasRequiredModules = item.requiredModules.every(module =>
          user?.modules?.includes(module)
        );
        if (!hasRequiredModules) return null;
      }

      return (
        <NavigationMenuItem key={item.label}>
          <Link to={item.href} className={cn(
            "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
            item.href === window.location.pathname ? "bg-accent text-accent-foreground" : "text-muted-foreground"
          )} onClick={() => isMobile && setIsOpen(false)}>
            <item.icon className="h-4 w-4" />
            {isOpen && item.label}
          </Link>
        </NavigationMenuItem>
      );
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="lg:hidden">
          Open
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className={`flex flex-col ${width} border-r px-0`}>
        <div className="flex h-[60px] items-center border-b px-4">
          <Link to="/dashboard" className="flex items-center font-semibold">
            <Home className="mr-2 h-5 w-5" />
            {isOpen && "Bot Mark"}
          </Link>
        </div>
        <NavigationMenu className="flex-1">
          <NavigationMenuList className="flex flex-col gap-0.5 p-4">
            {renderMenuItems()}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="border-t p-4">
          {currentConfig?.showStoreSelector && mounted && stores && stores.length > 0 && (
            <div className="mb-4">
              <div className="mb-2 text-sm font-medium">Выберите магазин</div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    <div className="flex items-center gap-2">
                      <StoreIcon className="h-4 w-4" />
                      <span>{selectedStore ? stores.find(store => store.id === selectedStore)?.name : "Все магазины"}</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  {stores.map((store) => (
                    <DropdownMenuItem key={store.id} onSelect={() => handleStoreChange(store.id)}>
                      {store.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
          <div className="mb-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.user_metadata?.avatar_url} />
                      <AvatarFallback>{user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{user?.email}</span>
                  </div>
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/dashboard/profile" onClick={() => isMobile && setIsOpen(false)}>
                    Профиль
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  Выйти
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <ModeToggle />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;

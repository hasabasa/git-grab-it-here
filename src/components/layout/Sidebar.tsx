import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, BarChart2, Search, Calendar, ClipboardList, Crown, Link2, MessageCircle, ShoppingCart } from "lucide-react";
import Calculator from "@/components/icons/Calculator";
import { Button } from "@/components/ui/button";
import { useScreenSize } from "@/hooks/use-screen-size";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  width?: string;
}

const Sidebar = ({ isOpen, setIsOpen, width }: SidebarProps) => {
  const location = useLocation();
  const { isMobile, isDesktop, isLargeDesktop, isExtraLargeDesktop, isUltraWideDesktop } = useScreenSize();
  
  const menuItems = [
    {
      title: "Бот демпинга",
      icon: ArrowRight,
      path: "/dashboard/price-bot",
      description: "Автоматическое управление ценами"
    },
    {
      title: "Мои продажи",
      icon: BarChart2,
      path: "/dashboard/sales",
      description: "Аналитика и статистика продаж"
    },
    {
      title: "Юнит-экономика",
      icon: Calculator,
      path: "/dashboard/unit-economics",
      description: "Расчет рентабельности товаров"
    },
    {
      title: "CRM и напоминания",
      icon: ClipboardList,
      path: "/dashboard/crm",
      description: "Управление задачами и клиентами"
    },
    {
      title: "WhatsApp",
      icon: MessageCircle,
      path: "/dashboard/whatsapp",
      description: "Интеграция с мессенджером",
      badge: "Beta"
    },
    {
      title: "Поиск ниш",
      icon: Search,
      path: "/dashboard/niche-search",
      description: "Анализ рыночных возможностей"
    },
    {
      title: "Предзаказы",
      icon: ShoppingCart,
      path: "/dashboard/preorders",
      description: "Управление предзаказами",
      badge: "Скоро"
    },
    {
      title: "Тарифы",
      icon: Crown,
      path: "/dashboard/subscription",
      description: "Управление подпиской"
    },
    {
      title: "Интеграции",
      icon: Link2,
      path: "/dashboard/integrations",
      description: "Подключение внешних сервисов"
    }
  ];

  // Более компактные размеры для больших мониторов
  const getSidebarWidth = () => {
    if (isMobile) return isOpen ? "w-64" : "w-0";
    if (!isOpen) return isUltraWideDesktop ? "w-16" : isExtraLargeDesktop ? "w-16" : "w-16";
    if (isUltraWideDesktop) return "w-80"; // Уменьшено с 400px до 320px
    if (isExtraLargeDesktop) return "w-72"; // Уменьшено с 384px до 288px
    if (isLargeDesktop) return "w-64"; // Уменьшено с 320px до 256px
    return "w-60"; // Уменьшено с 288px до 240px
  };

  const getHeaderHeight = () => {
    if (isUltraWideDesktop) return "h-16"; // Уменьшено с h-24
    if (isExtraLargeDesktop) return "h-14"; // Уменьшено с h-20
    if (isDesktop) return "h-12"; // Уменьшено с h-16
    return "h-12";
  };

  const getHeaderPadding = () => {
    if (isUltraWideDesktop) return "px-4"; // Уменьшено с px-8
    if (isExtraLargeDesktop) return "px-3"; // Уменьшено с px-6
    if (isDesktop) return "px-3";
    return "px-3";
  };

  const getContentPadding = () => {
    if (isUltraWideDesktop) return "px-3 py-4"; // Уменьшено с px-6 py-8
    if (isExtraLargeDesktop) return "px-3 py-3"; // Уменьшено с px-4 py-6
    if (isDesktop) return "px-2 py-3";
    return "px-2 py-2";
  };

  const getMenuItemPadding = () => {
    if (isUltraWideDesktop) return "px-3 py-2.5"; // Уменьшено с px-6 py-5
    if (isExtraLargeDesktop) return "px-3 py-2"; // Уменьшено с px-4 py-4
    if (isDesktop) return "px-2 py-2";
    return "px-2 py-2";
  };

  const getIconSize = () => {
    if (isUltraWideDesktop) return "h-5 w-5"; // Уменьшено с h-7 w-7
    if (isExtraLargeDesktop) return "h-5 w-5"; // Уменьшено с h-6 w-6
    return "h-4 w-4";
  };

  const getIconPadding = () => {
    if (isUltraWideDesktop) return "p-2"; // Уменьшено с p-4
    if (isExtraLargeDesktop) return "p-2"; // Уменьшено с p-3
    return "p-2";
  };

  const getTitleSize = () => {
    if (isUltraWideDesktop) return "text-base font-medium"; // Уменьшено с text-xl
    if (isExtraLargeDesktop) return "text-sm font-medium"; // Уменьшено с text-lg
    if (isDesktop) return "text-sm font-medium";
    return "text-sm font-medium";
  };

  const getBrandSize = () => {
    if (isUltraWideDesktop) return "text-xl"; // Уменьшено с text-3xl
    if (isExtraLargeDesktop) return "text-lg"; // Уменьшено с text-2xl
    if (isDesktop) return "text-base";
    return "text-base";
  };

  const getBrandIconSize = () => {
    if (isUltraWideDesktop) return "w-8 h-8"; // Уменьшено с w-12 h-12
    if (isExtraLargeDesktop) return "w-7 h-7"; // Уменьшено с w-10 h-10
    return "w-6 h-6";
  };

  const getBrandIconInnerSize = () => {
    if (isUltraWideDesktop) return "h-5 w-5"; // Уменьшено с h-7 w-7
    if (isExtraLargeDesktop) return "h-4 w-4"; // Уменьшено с h-6 w-6
    return "h-4 w-4";
  };

  const getToggleButtonSize = () => {
    if (isUltraWideDesktop) return "h-8 w-8"; // Уменьшено с h-12 w-12
    if (isExtraLargeDesktop) return "h-7 w-7"; // Уменьшено с h-10 w-10
    return "h-6 w-6";
  };

  const getToggleIconSize = () => {
    if (isUltraWideDesktop) return "h-4 w-4"; // Уменьшено с h-6 w-6
    if (isExtraLargeDesktop) return "h-4 w-4"; // Уменьшено с h-5 w-5
    return "h-4 w-4";
  };

  const SidebarContent = () => (
    <div className={cn(
      "flex-1 overflow-y-auto",
      getContentPadding()
    )}>
      <nav className={cn(
        "space-y-1",
        isUltraWideDesktop && "space-y-2"
      )}>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => isMobile && setIsOpen(false)}
            className={cn(
              "group relative flex items-center rounded-xl transition-all duration-200",
              // Улучшенная цветовая схема для hover состояний
              location.pathname === item.path
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25 hover:from-blue-600 hover:to-indigo-700"
                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
              !isOpen && !isMobile && "justify-center px-3",
              getMenuItemPadding()
            )}
          >
            <div className={cn(
              "flex items-center justify-center rounded-lg transition-colors flex-shrink-0",
              location.pathname === item.path
                ? "bg-white/20 group-hover:bg-white/30"
                : "bg-gray-100 group-hover:bg-gray-200",
              getIconPadding()
            )}>
              <item.icon className={cn(
                "transition-colors",
                location.pathname === item.path
                  ? "text-white"
                  : "text-gray-600 group-hover:text-gray-800",
                getIconSize()
              )} />
            </div>
            
            {(isOpen || isMobile) && (
              <div className="ml-3 flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <span className={cn(
                      "truncate block",
                      getTitleSize()
                    )}>
                      {item.title}
                    </span>
                  </div>
                  {item.badge && (
                    <Badge 
                      variant={item.badge === "Beta" ? "secondary" : "outline"}
                      className={cn(
                        "ml-2 shrink-0",
                        location.pathname === item.path && "bg-white/20 text-white border-white/30",
                        isUltraWideDesktop ? "text-sm px-3 py-1" : isExtraLargeDesktop ? "text-sm px-2 py-1" : "text-xs"
                      )}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </Link>
        ))}
      </nav>

      {(isOpen || isMobile) && isDesktop && (
        <div className={cn(
          "border-t border-gray-200 mt-auto",
          isUltraWideDesktop ? "mt-10 pt-8" : isExtraLargeDesktop ? "mt-8 pt-6" : "mt-4 pt-3"
        )}>
          <div className={cn(
            "text-gray-500",
            isUltraWideDesktop ? "px-6 py-4" : isExtraLargeDesktop ? "px-4 py-3" : "px-2 py-2"
          )}>
            <div className={cn(
              "font-medium",
              isUltraWideDesktop ? "text-lg" : isExtraLargeDesktop ? "text-base" : "text-xs"
            )}>
              Mark Bot v2.0
            </div>
            <div className={cn(
              "mt-1",
              isUltraWideDesktop ? "text-base" : isExtraLargeDesktop ? "text-sm" : "text-xs"
            )}>
              Платформа автоматизации продаж
            </div>
            {(isExtraLargeDesktop || isUltraWideDesktop) && (
              <div className={cn(
                "mt-2 text-gray-400",
                isUltraWideDesktop ? "text-sm" : "text-xs"
              )}>
                <div>© 2024 Mark Bot</div>
                <div className="mt-1">Все права защищены</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent className="h-[85vh]">
          <DrawerHeader className="border-b">
            <DrawerTitle className="text-xl font-bold text-center">Mark Bot</DrawerTitle>
          </DrawerHeader>
          <div className="flex-1 overflow-y-auto">
            <SidebarContent />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <aside className={cn(
      "fixed left-0 top-0 z-40 h-full bg-white/95 backdrop-blur-sm shadow-xl border-r border-gray-200/50 transition-all duration-300 ease-in-out flex flex-col",
      getSidebarWidth()
    )}>
      <div className={cn(
        "flex items-center justify-between border-b border-gray-200/50 flex-shrink-0",
        getHeaderHeight(),
        getHeaderPadding()
      )}>
        {isOpen && (
          <div className="flex items-center gap-3">
            <div className={cn(
              "bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center",
              getBrandIconSize()
            )}>
              <BarChart2 className={cn(
                "text-white",
                getBrandIconInnerSize()
              )} />
            </div>
            <span className={cn(
              "font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent",
              getBrandSize()
            )}>
              Mark Bot
            </span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "rounded-lg hover:bg-gray-100",
            !isOpen && "mx-auto",
            getToggleButtonSize()
          )}
        >
          {isOpen ? (
            <ArrowLeft className={cn(
              getToggleIconSize()
            )} />
          ) : (
            <ArrowRight className={cn(
              getToggleIconSize()
            )} />
          )}
        </Button>
      </div>

      <SidebarContent />
    </aside>
  );
};

export default Sidebar;

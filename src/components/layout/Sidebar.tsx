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

  // Improved responsive dimensions for better PC adaptation
  const getSidebarWidth = () => {
    if (isMobile) return isOpen ? "w-64" : "w-0";
    if (!isOpen) return "w-16";
    if (isUltraWideDesktop) return "w-96";
    if (isExtraLargeDesktop) return "w-80";
    if (isLargeDesktop) return "w-72";
    return "w-64"; // Standard desktop
  };

  const getHeaderHeight = () => {
    if (isUltraWideDesktop) return "h-20";
    if (isExtraLargeDesktop) return "h-18";
    if (isDesktop) return "h-16";
    return "h-14";
  };

  const getHeaderPadding = () => {
    if (isUltraWideDesktop) return "px-6";
    if (isExtraLargeDesktop) return "px-5";
    if (isDesktop) return "px-4";
    return "px-3";
  };

  const getContentPadding = () => {
    if (isUltraWideDesktop) return "px-4 py-6";
    if (isExtraLargeDesktop) return "px-3 py-5";
    if (isDesktop) return "px-3 py-4";
    return "px-2 py-3";
  };

  const getMenuItemPadding = () => {
    if (isUltraWideDesktop) return "px-4 py-4";
    if (isExtraLargeDesktop) return "px-3 py-3.5";
    if (isDesktop) return "px-3 py-3";
    return "px-2 py-2.5";
  };

  const getIconSize = () => {
    if (isUltraWideDesktop) return "h-6 w-6";
    if (isExtraLargeDesktop) return "h-5 w-5";
    return "h-5 w-5";
  };

  const getIconPadding = () => {
    if (isUltraWideDesktop) return "p-3";
    if (isExtraLargeDesktop) return "p-2.5";
    return "p-2";
  };

  const getTitleSize = () => {
    if (isUltraWideDesktop) return "text-lg font-semibold";
    if (isExtraLargeDesktop) return "text-base font-medium";
    if (isDesktop) return "text-sm font-medium";
    return "text-sm font-medium";
  };

  const getDescriptionSize = () => {
    if (isUltraWideDesktop) return "text-sm";
    if (isExtraLargeDesktop) return "text-xs";
    return "text-xs";
  };

  const getBrandSize = () => {
    if (isUltraWideDesktop) return "text-2xl";
    if (isExtraLargeDesktop) return "text-xl";
    if (isDesktop) return "text-lg";
    return "text-base";
  };

  const SidebarContent = () => (
    <div className={cn(
      "flex-1 overflow-y-auto",
      getContentPadding()
    )}>
      <nav className={cn(
        "space-y-1",
        isUltraWideDesktop && "space-y-1.5"
      )}>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => isMobile && setIsOpen(false)}
            className={cn(
              "group relative flex items-center rounded-xl transition-all duration-200",
              "hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50",
              location.pathname === item.path
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
                : "text-gray-700 hover:text-gray-900",
              !isOpen && !isMobile && "justify-center px-3",
              getMenuItemPadding()
            )}
          >
            <div className={cn(
              "flex items-center justify-center rounded-lg transition-colors flex-shrink-0",
              location.pathname === item.path
                ? "bg-white/20"
                : "bg-gray-100 group-hover:bg-white group-hover:shadow-sm",
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
                    {/* Show descriptions on all desktop sizes, not just large ones */}
                    {isDesktop && item.description && (
                      <span className={cn(
                        "opacity-75 block mt-1 truncate leading-tight",
                        location.pathname === item.path
                          ? "text-white/80"
                          : "text-gray-500",
                        getDescriptionSize()
                      )}>
                        {item.description}
                      </span>
                    )}
                  </div>
                  {item.badge && (
                    <Badge 
                      variant={item.badge === "Beta" ? "secondary" : "outline"}
                      className={cn(
                        "ml-2 text-xs shrink-0",
                        location.pathname === item.path && "bg-white/20 text-white border-white/30",
                        isUltraWideDesktop && "text-sm px-2 py-1"
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

      {/* Show footer on all desktop sizes for better PC adaptation */}
      {(isOpen || isMobile) && isDesktop && (
        <div className={cn(
          "border-t border-gray-200 mt-auto",
          isUltraWideDesktop ? "mt-8 pt-6" : isExtraLargeDesktop ? "mt-6 pt-4" : "mt-4 pt-3"
        )}>
          <div className={cn(
            "text-gray-500",
            isUltraWideDesktop ? "px-4 py-3" : isExtraLargeDesktop ? "px-3 py-2" : "px-2 py-2"
          )}>
            <div className={cn(
              "font-medium",
              isUltraWideDesktop ? "text-base" : isExtraLargeDesktop ? "text-sm" : "text-xs"
            )}>
              Mark Bot v2.0
            </div>
            <div className={cn(
              "mt-1",
              isUltraWideDesktop ? "text-sm" : isExtraLargeDesktop ? "text-xs" : "text-xs"
            )}>
              Платформа автоматизации продаж
            </div>
            {(isExtraLargeDesktop || isUltraWideDesktop) && (
              <div className="mt-2 text-xs text-gray-400">
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
              isUltraWideDesktop ? "w-10 h-10" : isExtraLargeDesktop ? "w-9 h-9" : "w-8 h-8"
            )}>
              <BarChart2 className={cn(
                "text-white",
                isUltraWideDesktop ? "h-6 w-6" : isExtraLargeDesktop ? "h-5 w-5" : "h-4 w-4"
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
            isUltraWideDesktop && "h-10 w-10"
          )}
        >
          {isOpen ? (
            <ArrowLeft className={cn(
              isUltraWideDesktop ? "h-5 w-5" : "h-4 w-4"
            )} />
          ) : (
            <ArrowRight className={cn(
              isUltraWideDesktop ? "h-5 w-5" : "h-4 w-4"
            )} />
          )}
        </Button>
      </div>

      <SidebarContent />
    </aside>
  );
};

export default Sidebar;

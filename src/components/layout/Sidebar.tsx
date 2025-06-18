
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
  const { isMobile, isLargeDesktop, isExtraLargeDesktop } = useScreenSize();
  
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

  const SidebarContent = () => (
    <div className={cn(
      "px-2 py-4",
      isExtraLargeDesktop && "px-4 py-6"
    )}>
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => isMobile && setIsOpen(false)}
            className={cn(
              "group relative flex items-center rounded-xl px-3 py-3 transition-all duration-200",
              "hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50",
              location.pathname === item.path
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
                : "text-gray-700 hover:text-gray-900",
              !isOpen && !isMobile && "justify-center px-3",
              isLargeDesktop && "py-4",
              isExtraLargeDesktop && "py-5"
            )}
          >
            <div className={cn(
              "flex items-center justify-center rounded-lg p-2",
              location.pathname === item.path
                ? "bg-white/20"
                : "bg-gray-100 group-hover:bg-white group-hover:shadow-sm",
              isLargeDesktop && "p-2.5",
              isExtraLargeDesktop && "p-3"
            )}>
              <item.icon className={cn(
                "h-5 w-5 transition-colors",
                location.pathname === item.path
                  ? "text-white"
                  : "text-gray-600 group-hover:text-gray-800",
                isLargeDesktop && "h-6 w-6",
                isExtraLargeDesktop && "h-7 w-7"
              )} />
            </div>
            
            {(isOpen || isMobile) && (
              <div className="ml-3 flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <span className={cn(
                      "font-medium truncate block",
                      isLargeDesktop && "text-base",
                      isExtraLargeDesktop && "text-lg"
                    )}>
                      {item.title}
                    </span>
                    {(isLargeDesktop || isExtraLargeDesktop) && item.description && (
                      <span className={cn(
                        "text-xs opacity-75 block mt-0.5 truncate",
                        location.pathname === item.path
                          ? "text-white/80"
                          : "text-gray-500"
                      )}>
                        {item.description}
                      </span>
                    )}
                  </div>
                  {item.badge && (
                    <Badge 
                      variant={item.badge === "Beta" ? "secondary" : "outline"}
                      className={cn(
                        "ml-2 text-xs",
                        location.pathname === item.path && "bg-white/20 text-white border-white/30"
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

      {/* Footer section for expanded sidebar */}
      {(isOpen || isMobile) && (isLargeDesktop || isExtraLargeDesktop) && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="px-3 py-2 text-xs text-gray-500">
            <div className="font-medium">Mark Bot v2.0</div>
            <div className="mt-1">Платформа автоматизации продаж</div>
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
      "fixed left-0 top-0 z-40 h-full bg-white/95 backdrop-blur-sm shadow-xl border-r border-gray-200/50 transition-all duration-300 ease-in-out",
      width || (isOpen ? "w-64" : "w-16"),
      isExtraLargeDesktop && isOpen && "w-80",
      isLargeDesktop && isOpen && "w-72"
    )}>
      <div className={cn(
        "flex h-16 items-center justify-between border-b border-gray-200/50 px-4",
        isLargeDesktop && "h-20 px-6",
        isExtraLargeDesktop && "h-24 px-8"
      )}>
        {isOpen && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <BarChart2 className="h-5 w-5 text-white" />
            </div>
            <span className={cn(
              "font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent",
              isLargeDesktop && "text-xl",
              isExtraLargeDesktop && "text-2xl"
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
            "ml-auto rounded-lg hover:bg-gray-100",
            !isOpen && "mx-auto"
          )}
        >
          {isOpen ? (
            <ArrowLeft className="h-5 w-5" />
          ) : (
            <ArrowRight className="h-5 w-5" />
          )}
        </Button>
      </div>

      <SidebarContent />
    </aside>
  );
};

export default Sidebar;


import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, BarChart3, Users, Crown, Settings, Database, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScreenSize } from "@/hooks/use-screen-size";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

interface AdminSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AdminSidebar = ({ isOpen, setIsOpen }: AdminSidebarProps) => {
  const location = useLocation();
  const { isMobile } = useScreenSize();
  
  const adminMenuItems = [
    {
      title: "Обзор",
      icon: BarChart3,
      path: "/admin",
      description: "Статистика и аналитика системы"
    },
    {
      title: "Пользователи",
      icon: Users,
      path: "/admin/users",
      description: "Управление пользователями"
    },
    {
      title: "Партнеры",
      icon: Crown,
      path: "/admin/partners",
      description: "Управление партнерской программой"
    },
    {
      title: "Система",
      icon: Settings,
      path: "/admin/system",
      description: "Системные настройки"
    }
  ];

  const getSidebarWidth = () => {
    if (isMobile) return isOpen ? "w-64" : "w-0";
    return isOpen ? "w-64" : "w-16";
  };

  const SidebarContent = () => (
    <div className="flex-1 overflow-y-auto px-3 py-4">
      <nav className="space-y-2">
        {adminMenuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => isMobile && setIsOpen(false)}
            className={cn(
              "group relative flex items-center rounded-xl transition-all duration-200 px-3 py-2.5",
              location.pathname === item.path
                ? "bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg shadow-red-500/25"
                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
              !isOpen && !isMobile && "justify-center"
            )}
          >
            <div className={cn(
              "flex items-center justify-center rounded-lg transition-colors flex-shrink-0 p-2",
              location.pathname === item.path
                ? "bg-white/20"
                : "bg-gray-100 group-hover:bg-gray-200"
            )}>
              <item.icon className={cn(
                "h-4 w-4 transition-colors",
                location.pathname === item.path
                  ? "text-white"
                  : "text-gray-600 group-hover:text-gray-800"
              )} />
            </div>
            
            {(isOpen || isMobile) && (
              <div className="ml-3 flex-1 min-w-0">
                <span className="text-sm font-medium truncate block">
                  {item.title}
                </span>
              </div>
            )}
          </Link>
        ))}
      </nav>

      {(isOpen || isMobile) && (
        <div className="border-t border-gray-200 mt-6 pt-4">
          <div className="text-gray-500 px-3">
            <div className="font-medium text-xs">Mark Bot Admin v2.0</div>
            <div className="text-xs mt-1">Панель администратора</div>
            <div className="text-xs text-gray-400 mt-2">
              <div>© 2024 Mark Bot</div>
              <div className="mt-1">Все права защищены</div>
            </div>
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
            <DrawerTitle className="text-xl font-bold text-center flex items-center justify-center gap-2">
              <Shield className="h-6 w-6 text-red-500" />
              Админ-панель
            </DrawerTitle>
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
      "fixed left-0 top-0 z-40 h-full bg-white/95 backdrop-blur-sm shadow-xl border-r border-red-200/50 transition-all duration-300 ease-in-out flex flex-col",
      getSidebarWidth()
    )}>
      <div className="flex items-center justify-between border-b border-red-200/50 h-14 px-3">
        {isOpen && (
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-lg p-2">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
              Admin
            </span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "rounded-lg hover:bg-red-50 h-8 w-8",
            !isOpen && "mx-auto"
          )}
        >
          {isOpen ? (
            <ArrowLeft className="h-4 w-4" />
          ) : (
            <ArrowRight className="h-4 w-4" />
          )}
        </Button>
      </div>

      <SidebarContent />
    </aside>
  );
};

export default AdminSidebar;


import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, BarChart2, Search, Calendar, ClipboardList, Crown, Link2, MessageCircle, ShoppingCart } from "lucide-react";
import Calculator from "@/components/icons/Calculator";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const menuItems = [
    {
      title: "Бот демпинга",
      icon: ArrowRight,
      path: "/dashboard/price-bot"
    },
    {
      title: "Мои продажи",
      icon: BarChart2,
      path: "/dashboard/sales"
    },
    {
      title: "Юнит-экономика",
      icon: Calculator,
      path: "/dashboard/unit-economics"
    },
    {
      title: "CRM и напоминания",
      icon: ClipboardList,
      path: "/dashboard/crm"
    },
    {
      title: "WhatsApp",
      icon: MessageCircle,
      path: "/dashboard/whatsapp"
    },
    {
      title: "Поиск ниш",
      icon: Search,
      path: "/dashboard/niche-search"
    },
    {
      title: "Предзаказы",
      icon: ShoppingCart,
      path: "/dashboard/preorders"
    },
    {
      title: "Тарифы",
      icon: Crown,
      path: "/dashboard/subscription"
    },
    {
      title: "Интеграции",
      icon: Link2,
      path: "/dashboard/integrations"
    }
  ];

  const SidebarContent = () => (
    <div className="px-2 py-4">
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => isMobile && setIsOpen(false)}
            className={cn(
              "flex items-center rounded-lg px-3 py-3 transition-colors text-base",
              location.pathname === item.path
                ? "bg-primary text-primary-foreground"
                : "hover:bg-gray-100",
              !isOpen && !isMobile && "justify-center"
            )}
          >
            <item.icon className={cn("h-5 w-5", (!isOpen && !isMobile) ? "mr-0" : "mr-3")} />
            {(isOpen || isMobile) && <span>{item.title}</span>}
          </Link>
        ))}
      </nav>
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
      "fixed left-0 top-0 z-40 h-full bg-white shadow-md transition-all duration-300 ease-in-out",
      isOpen ? "w-64" : "w-16"
    )}>
      <div className="flex h-16 items-center justify-between border-b px-4">
        {isOpen && <span className="text-xl font-bold">Mark Bot</span>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="ml-auto"
        >
          {isOpen ? <ArrowLeft className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
        </Button>
      </div>

      <SidebarContent />
    </aside>
  );
};

export default Sidebar;

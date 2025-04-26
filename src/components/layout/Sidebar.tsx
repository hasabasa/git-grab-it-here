
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, BarChart2, Search, Calendar, ClipboardList, Crown, Link2 } from "lucide-react";
import Calculator from "@/components/icons/Calculator";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const location = useLocation();
  
  const menuItems = [
    {
      title: "Бот демпинга",
      icon: ArrowRight,
      path: "/price-bot",
    },
    {
      title: "Мои продажи",
      icon: BarChart2,
      path: "/sales",
    },
    {
      title: "Юнит-экономика",
      icon: Calculator,
      path: "/unit-economics",
    },
    {
      title: "CRM и напоминания",
      icon: ClipboardList,
      path: "/crm",
    },
    {
      title: "Поиск ниш",
      icon: Search,
      path: "/niche-search",
    },
    {
      title: "Тарифы",
      icon: Crown,
      path: "/subscription",
    },
    {
      title: "Интеграции",
      icon: Link2,
      path: "/integrations",
    },
  ];

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-full bg-white shadow-md transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <div className="flex h-16 items-center justify-between border-b px-4">
        {isOpen && <span className="text-xl font-bold">Kaspi Price</span>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="ml-auto"
        >
          {isOpen ? (
            <ArrowLeft className="h-5 w-5" />
          ) : (
            <ArrowRight className="h-5 w-5" />
          )}
        </Button>
      </div>

      <div className="px-2 py-4">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center rounded-lg px-3 py-2 transition-colors",
                location.pathname === item.path
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-gray-100",
                !isOpen && "justify-center"
              )}
            >
              <item.icon className={cn("h-5 w-5", !isOpen && "mr-0")} />
              {isOpen && <span className="ml-3">{item.title}</span>}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;

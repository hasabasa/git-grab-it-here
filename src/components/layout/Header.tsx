
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleSidebar}
        className="mr-4"
      >
        <MenuIcon className="h-5 w-5" />
      </Button>
      
      <div className="text-xl font-semibold text-gray-800">
        Kaspi Price
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm">
          Помощь
        </Button>
        <Button size="sm">
          Настройки
        </Button>
      </div>
    </header>
  );
};

export default Header;

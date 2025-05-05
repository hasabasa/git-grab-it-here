
import { MenuIcon, LogIn, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SubscriptionBadge from "@/components/subscription/SubscriptionBadge";
import { useAuth } from "@/components/integration/useAuth";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({
  toggleSidebar
}: HeaderProps) => {
  const { user, signOut, isDemo } = useAuth();

  return (
    <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
      <div className="text-xl font-semibold text-gray-800">
        Kaspi Price
      </div>
      
      <div className="flex items-center gap-4">
        <SubscriptionBadge plan="free" daysLeft={0} />
        
        <Button variant="outline" size="sm">
          Помощь
        </Button>
        
        {isDemo ? (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" asChild>
              <Link to="/">
                <User className="mr-2 h-4 w-4" />
                Демо режим
              </Link>
            </Button>
            
            <Button size="sm" variant="default" asChild>
              <Link to="/">
                <LogIn className="mr-2 h-4 w-4" />
                Вход
              </Link>
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button size="sm">
              Настройки
            </Button>
            
            <Button size="sm" variant="outline" onClick={signOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Выход
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

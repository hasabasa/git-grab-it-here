
import { MenuIcon, LogIn } from "lucide-react";
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
  const { user } = useAuth();

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
        {user ? (
          <Button size="sm">
            Настройки
          </Button>
        ) : (
          <Link to="/">
            <Button size="sm" variant="default">
              <LogIn className="mr-2 h-4 w-4" />
              Вход
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;


import { MenuIcon, LogIn, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SubscriptionBadge from "@/components/subscription/SubscriptionBadge";
import { useAuth } from "@/components/integration/useAuth";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({
  toggleSidebar
}: HeaderProps) => {
  const { user, signOut, loading, isDemo, exitDemoMode } = useAuth();

  const handleSignOut = () => {
    if (isDemo) {
      exitDemoMode();
      window.location.href = "/";
    } else {
      signOut();
    }
  };

  return (
    <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
      <div className="text-xl font-semibold text-gray-800">
        Kaspi Price
      </div>
      
      <div className="flex items-center gap-4">
        {isDemo && (
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
            Демо режим
          </Badge>
        )}
        
        {!isDemo && <SubscriptionBadge plan="free" daysLeft={0} />}
        
        <Button variant="outline" size="sm">
          Помощь
        </Button>
        
        {loading ? (
          <div className="w-20 h-9 bg-muted animate-pulse rounded"></div>
        ) : user || isDemo ? (
          <div className="flex gap-2">
            {user && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                {user.email}
              </div>
            )}
            
            <Button size="sm" variant="outline" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              {isDemo ? "Выйти из демо" : "Выход"}
            </Button>
          </div>
        ) : (
          <Button size="sm" variant="default" asChild>
            <Link to="/auth">
              <LogIn className="mr-2 h-4 w-4" />
              Вход
            </Link>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;

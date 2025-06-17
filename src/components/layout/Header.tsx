
import { MenuIcon, LogIn, LogOut, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SubscriptionBadge from "@/components/subscription/SubscriptionBadge";
import { useAuth } from "@/components/integration/useAuth";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  toggleSidebar: () => void;
  isMobile?: boolean;
  sidebarOpen?: boolean;
}

const Header = ({
  toggleSidebar,
  isMobile = false,
  sidebarOpen = true
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
    <header className="bg-white shadow-sm py-3 px-4 md:py-4 md:px-6 flex justify-between items-center">
      <div className="flex items-center gap-3">
        {isMobile && (
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleSidebar}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <div className="text-lg md:text-xl font-semibold text-gray-800">
          Mark Bot
        </div>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4">
        {isDemo && (
          <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs md:text-sm">
            {isMobile ? "Демо" : "Демо режим"}
          </Badge>
        )}
        
        {!isDemo && <SubscriptionBadge plan="free" daysLeft={0} />}
        
        <Button variant="outline" size="sm" className="hidden md:flex">
          Помощь
        </Button>
        
        {loading ? (
          <div className="w-16 md:w-20 h-8 md:h-9 bg-muted animate-pulse rounded"></div>
        ) : user || isDemo ? (
          <div className="flex gap-2">
            {user && !isMobile && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span className="hidden lg:inline">{user.email}</span>
              </div>
            )}
            
            <Button size="sm" variant="outline" onClick={handleSignOut}>
              <LogOut className="mr-1 md:mr-2 h-4 w-4" />
              <span className="hidden sm:inline">
                {isDemo ? "Выйти из демо" : "Выход"}
              </span>
            </Button>
          </div>
        ) : (
          <Button size="sm" variant="default" asChild>
            <Link to="/auth">
              <LogIn className="mr-1 md:mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Вход</span>
            </Link>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;

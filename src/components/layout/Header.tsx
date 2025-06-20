import { MenuIcon, LogIn, LogOut, User, Menu, Settings, HelpCircle, Bell, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SubscriptionBadge from "@/components/subscription/SubscriptionBadge";
import { useAuth } from "@/components/integration/useAuth";
import { Badge } from "@/components/ui/badge";
import { useScreenSize } from "@/hooks/use-screen-size";
import { cn } from "@/lib/utils";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GlobalStoreSelector from "./GlobalStoreSelector";

interface HeaderProps {
  toggleSidebar: () => void;
  isMobile?: boolean;
  sidebarOpen?: boolean;
}

const getModuleName = (pathname: string): string => {
  const moduleNames: Record<string, string> = {
    '/dashboard/price-bot': 'Бот демпинга',
    '/dashboard/sales': 'Мои продажи',
    '/dashboard/unit-economics': 'Юнит-экономика',
    '/dashboard/whatsapp': 'WhatsApp бот',
    '/dashboard/niche-search': 'Поиск ниш',
    '/dashboard/preorders': 'Предзаказы',
    '/dashboard/crm': 'CRM система',
    '/dashboard/subscription': 'Подписка',
    '/dashboard/integrations': 'Интеграции',
    '/dashboard': 'Панель управления'
  };
  
  return moduleNames[pathname] || 'Панель управления';
};

const Header = ({
  toggleSidebar,
  isMobile = false,
  sidebarOpen = true
}: HeaderProps) => {
  const { user, signOut, loading, isDemo, exitDemoMode } = useAuth();
  const { isLargeDesktop, isExtraLargeDesktop } = useScreenSize();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      console.log('Header: Starting sign out process');
      
      if (isDemo) {
        console.log('Header: Exiting demo mode');
        exitDemoMode();
      } else {
        console.log('Header: Signing out authenticated user');
        await signOut();
      }
      
      // Navigate to auth page after successful sign out
      console.log('Header: Navigating to auth page');
      navigate("/auth", { replace: true });
      
    } catch (error) {
      console.error('Header: Error during sign out:', error);
      // Even if sign out fails, navigate to auth page
      navigate("/auth", { replace: true });
    }
  };

  const handleHelpClick = () => {
    const whatsappNumber = "+77082171960";
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}`;
    window.open(whatsappUrl, '_blank');
  };

  const headerHeight = isExtraLargeDesktop ? "h-24" : isLargeDesktop ? "h-20" : "h-16";
  const headerPadding = isExtraLargeDesktop ? "px-8" : isLargeDesktop ? "px-6" : "px-4";
  const currentModuleName = getModuleName(location.pathname);

  return (
    <header className={cn(
      "bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200/50 flex justify-between items-center",
      headerHeight,
      headerPadding,
      "py-3 md:py-4"
    )}>
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
        
        {/* Show title only on larger screens when sidebar is collapsed */}
        {!isMobile && !sidebarOpen && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <BarChart2 className="h-5 w-5 text-white" />
            </div>
            <div className={cn(
              "font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent",
              isLargeDesktop && "text-xl",
              isExtraLargeDesktop && "text-2xl"
            )}>
              Mark Bot
            </div>
          </div>
        )}

        {/* Breadcrumb for large screens */}
        {(isLargeDesktop || isExtraLargeDesktop) && (
          <div className="hidden lg:flex items-center gap-2 text-sm text-gray-500">
            <span>Панель управления</span>
            <span>/</span>
            <span className="text-gray-900 font-medium">{currentModuleName}</span>
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-2 md:gap-4">
        {/* Global Store Selector - only show in dashboard */}
        {(user || isDemo) && (
          <GlobalStoreSelector />
        )}

        {/* Notifications for large screens */}
        {(isLargeDesktop || isExtraLargeDesktop) && (
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
              3
            </Badge>
          </Button>
        )}

        {isDemo && (
          <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs md:text-sm">
            {isMobile ? "Демо" : "Демо режим"}
          </Badge>
        )}
        
        {!isDemo && <SubscriptionBadge />}
        
        {/* Help button for desktop */}
        {!isMobile && (
          <Button variant="outline" size="sm" className="hidden md:flex" onClick={handleHelpClick}>
            <HelpCircle className="h-4 w-4 mr-2" />
            Помощь
          </Button>
        )}
        
        {loading ? (
          <div className="w-16 md:w-20 h-8 md:h-9 bg-muted animate-pulse rounded"></div>
        ) : user || isDemo ? (
          <div className="flex gap-2">
            {/* User menu for large screens */}
            {(isLargeDesktop || isExtraLargeDesktop) && user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div className="hidden xl:block text-left">
                      <div className="text-sm font-medium">{user.email?.split('@')[0]}</div>
                      <div className="text-xs text-gray-500">Активный пользователь</div>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className="w-56 bg-white border border-gray-200 shadow-lg z-[9999]"
                  sideOffset={5}
                >
                  <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Профиль</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Настройки</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Выйти</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Compact user info for smaller screens */}
            {!(isLargeDesktop || isExtraLargeDesktop) && user && !isMobile && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span className="hidden lg:inline">{user.email}</span>
              </div>
            )}
            
            {/* Sign out button for mobile and when no large screen user menu */}
            {(isMobile || !(isLargeDesktop || isExtraLargeDesktop) || isDemo) && (
              <Button size="sm" variant="outline" onClick={handleSignOut}>
                <LogOut className="mr-1 md:mr-2 h-4 w-4" />
                <span className="hidden sm:inline">
                  {isDemo ? "Выйти из демо" : "Выход"}
                </span>
              </Button>
            )}
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

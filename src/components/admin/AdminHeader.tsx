
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/integration/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { Crown, Shield, LogOut, Menu } from "lucide-react";

interface AdminHeaderProps {
  toggleSidebar: () => void;
  isMobile: boolean;
}

const AdminHeader = ({ toggleSidebar, isMobile }: AdminHeaderProps) => {
  const { signOut } = useAuth();
  const { profile } = useProfile();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="h-8 w-8"
            >
              <Menu className="h-4 w-4" />
            </Button>
          )}
          
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-lg p-2">
              <Crown className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                Админ-панель
              </h1>
              <p className="text-sm text-gray-500">
                Управление системой Mark Bot
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Badge variant="destructive" className="flex items-center gap-1">
            <Shield className="h-3 w-3" />
            Администратор
          </Badge>
          
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900">
              {profile?.full_name || 'Администратор'}
            </div>
            <div className="text-xs text-gray-500">
              {profile?.company_name || 'Системный администратор'}
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleSignOut}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Выйти
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;

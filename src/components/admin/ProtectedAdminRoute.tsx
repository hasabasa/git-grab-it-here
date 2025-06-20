
import { useUserRole } from '@/hooks/useUserRole';
import LoadingScreen from '@/components/ui/loading-screen';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ShieldX } from 'lucide-react';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

export const ProtectedAdminRoute = ({ children }: ProtectedAdminRouteProps) => {
  const { isAdmin, loading } = useUserRole();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Alert className="max-w-md">
          <ShieldX className="h-4 w-4" />
          <AlertDescription>
            У вас нет прав доступа к этой странице. Требуются права администратора.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return <>{children}</>;
};

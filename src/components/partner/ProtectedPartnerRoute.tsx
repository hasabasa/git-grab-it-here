
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/integration/useAuth';
import { useUserRole } from '@/hooks/useUserRole';
import LoadingScreen from '@/components/ui/loading-screen';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ShieldX } from 'lucide-react';

interface ProtectedPartnerRouteProps {
  children: React.ReactNode;
}

export const ProtectedPartnerRoute = ({ children }: ProtectedPartnerRouteProps) => {
  const { user, loading: authLoading } = useAuth();
  const { isPartner, loading: roleLoading } = useUserRole();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('ProtectedPartnerRoute: Auth state - user:', user?.email, 'authLoading:', authLoading, 'isPartner:', isPartner, 'roleLoading:', roleLoading);
    
    if (!authLoading && !roleLoading) {
      if (!user) {
        console.log('ProtectedPartnerRoute: No user, redirecting to login');
        navigate('/partner/login', { replace: true });
      } else if (!isPartner) {
        console.log('ProtectedPartnerRoute: User is not a partner, redirecting to login');
        navigate('/partner/login', { replace: true });
      }
    }
  }, [user, isPartner, authLoading, roleLoading, navigate]);

  if (authLoading || roleLoading) {
    console.log('ProtectedPartnerRoute: Still loading...');
    return <LoadingScreen />;
  }

  if (!user) {
    console.log('ProtectedPartnerRoute: No user found');
    return null;
  }

  if (!isPartner) {
    console.log('ProtectedPartnerRoute: Access denied - not a partner');
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Alert className="max-w-md">
          <ShieldX className="h-4 w-4" />
          <AlertDescription>
            У вас нет прав доступа к партнерской панели. Требуются права партнера.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  console.log('ProtectedPartnerRoute: Access granted for partner:', user.email);
  return <>{children}</>;
};

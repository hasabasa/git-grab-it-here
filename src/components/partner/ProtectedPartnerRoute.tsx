
import { useEffect, useState, useRef } from 'react';
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
  const { isPartner, loading: roleLoading, error: roleError } = useUserRole();
  const navigate = useNavigate();
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const checkTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    console.log('ProtectedPartnerRoute: State check - user:', user?.email, 'authLoading:', authLoading, 'isPartner:', isPartner, 'roleLoading:', roleLoading, 'roleError:', roleError);
    
    // Очищаем предыдущий таймер
    if (checkTimeoutRef.current) {
      clearTimeout(checkTimeoutRef.current);
    }

    // Если все еще загружается, не предпринимаем действий
    if (authLoading || roleLoading) {
      console.log('ProtectedPartnerRoute: Still loading, waiting...');
      return;
    }

    // Если нет пользователя, перенаправляем на логин
    if (!user) {
      console.log('ProtectedPartnerRoute: No user, redirecting to partner login');
      setShouldRedirect(true);
      navigate('/partner/login', { replace: true });
      return;
    }

    // Если есть ошибка загрузки ролей, даем время на повторную проверку
    if (roleError) {
      console.log('ProtectedPartnerRoute: Role loading error, setting timeout for retry');
      checkTimeoutRef.current = setTimeout(() => {
        if (!isPartner) {
          console.log('ProtectedPartnerRoute: After retry timeout, user is not a partner, redirecting');
          setShouldRedirect(true);
          navigate('/partner/login', { replace: true });
        }
      }, 2000);
      return;
    }

    // Если пользователь не партнер, даем небольшую задержку на случай медленной загрузки ролей
    if (!isPartner) {
      console.log('ProtectedPartnerRoute: User is not a partner, setting timeout before redirect');
      checkTimeoutRef.current = setTimeout(() => {
        console.log('ProtectedPartnerRoute: Timeout reached, user still not a partner, redirecting');
        setShouldRedirect(true);
        navigate('/partner/login', { replace: true });
      }, 1500);
    } else {
      console.log('ProtectedPartnerRoute: User is a partner, access granted');
      setShouldRedirect(false);
    }

    return () => {
      if (checkTimeoutRef.current) {
        clearTimeout(checkTimeoutRef.current);
      }
    };
  }, [user, isPartner, authLoading, roleLoading, roleError, navigate]);

  // Показываем загрузку, если идет процесс аутентификации или загрузки ролей
  if (authLoading || roleLoading) {
    console.log('ProtectedPartnerRoute: Showing loading screen');
    return <LoadingScreen />;
  }

  // Показываем загрузку, если ожидаем редирект
  if (shouldRedirect) {
    console.log('ProtectedPartnerRoute: Redirect in progress');
    return <LoadingScreen />;
  }

  // Если нет пользователя, показываем загрузку (редирект уже запущен)
  if (!user) {
    console.log('ProtectedPartnerRoute: No user, showing loading');
    return <LoadingScreen />;
  }

  // Если есть ошибка загрузки ролей, показываем её
  if (roleError) {
    console.log('ProtectedPartnerRoute: Showing role error');
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Alert className="max-w-md">
          <ShieldX className="h-4 w-4" />
          <AlertDescription>
            Ошибка загрузки ролей пользователя: {roleError}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Если пользователь не партнер, показываем сообщение об отказе в доступе
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

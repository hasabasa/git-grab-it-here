
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PartnerStats } from '@/components/partner/PartnerStats';
import { useAuth } from '@/components/integration/useAuth';
import { useUserRole } from '@/hooks/useUserRole';
import { Instagram, LogOut, ExternalLink, Copy } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const PartnerDashboardPage = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const { isPartner, loading: roleLoading } = useUserRole();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    console.log('PartnerDashboard: Auth state - user:', user?.email, 'authLoading:', authLoading, 'isPartner:', isPartner, 'roleLoading:', roleLoading);
    
    if (!authLoading && !roleLoading) {
      if (!user) {
        console.log('PartnerDashboard: No user, redirecting to login');
        navigate('/partner/login');
      } else if (!isPartner) {
        console.log('PartnerDashboard: User is not a partner, redirecting to login');
        navigate('/partner/login');
      }
    }
  }, [user, isPartner, authLoading, roleLoading, navigate]);

  const handleSignOut = async () => {
    try {
      console.log('PartnerDashboard: Signing out');
      await signOut();
      navigate('/partner/login');
    } catch (error) {
      console.error('PartnerDashboard: Error signing out:', error);
    }
  };

  const copyReferralLink = () => {
    const referralLink = `${window.location.origin}/?ref=partner&utm_source=instagram`;
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Ссылка скопирована",
      description: "Реферальная ссылка скопирована в буфер обмена"
    });
  };

  if (authLoading || roleLoading) {
    console.log('PartnerDashboard: Still loading...');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!user || !isPartner) {
    console.log('PartnerDashboard: Access denied, redirecting...');
    return null;
  }

  console.log('PartnerDashboard: Rendering dashboard for user:', user.email);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg p-2">
              <Instagram className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Партнерская панель
              </h1>
              <p className="text-sm text-gray-500">
                Добро пожаловать, {user.user_metadata?.full_name || user.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={copyReferralLink} className="flex items-center gap-2">
              <Copy className="h-4 w-4" />
              Скопировать ссылку
            </Button>
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Выйти
            </Button>
          </div>
        </div>
      </header>

      <main className="p-6 max-w-7xl mx-auto">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ExternalLink className="h-5 w-5" />
                Ваши партнерские материалы
              </CardTitle>
              <CardDescription>
                Используйте эти материалы для привлечения новых пользователей
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Реферальная ссылка</h4>
                  <div className="flex gap-2">
                    <code className="flex-1 px-3 py-2 bg-gray-100 rounded text-sm">
                      {window.location.origin}/?ref=partner&utm_source=instagram
                    </code>
                    <Button variant="outline" size="sm" onClick={copyReferralLink}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Промокод</h4>
                  <div className="px-3 py-2 bg-purple-100 rounded text-sm font-mono">
                    PARTNER_{user.user_metadata?.instagram_username?.toUpperCase() || 'USERNAME'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <PartnerStats />
        </div>
      </main>
    </div>
  );
};

export default PartnerDashboardPage;

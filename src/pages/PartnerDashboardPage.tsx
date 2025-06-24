
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PartnerStats } from '@/components/partner/PartnerStats';
import { PromoCodeManager } from '@/components/partner/PromoCodeManager';
import { useAuth } from '@/components/integration/useAuth';
import { Instagram, LogOut, ExternalLink, Copy, BarChart, Gift, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const PartnerDashboardPage = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activePromoCode, setActivePromoCode] = useState<string>('');
  const [partnerCode, setPartnerCode] = useState<string>('');
  const [loading, setLoading] = useState(true);

  console.log('PartnerDashboard: Rendering for user:', user?.email);

  useEffect(() => {
    if (user) {
      loadPartnerData();
    }
  }, [user]);

  const loadPartnerData = async () => {
    setLoading(true);
    try {
      // Получаем данные партнера включая partner_code
      const { data: partner, error: partnerError } = await supabase
        .from('partners')
        .select('id, partner_code')
        .eq('user_id', user!.id)
        .single();

      if (partnerError) throw partnerError;
      
      console.log('Loaded partner data:', partner);
      setPartnerCode(partner.partner_code);
      
      // Загружаем активный промокод партнера
      const { data: activeCodes, error: codesError } = await supabase
        .from('promo_codes')
        .select('code')
        .eq('partner_id', partner.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1);

      if (codesError) throw codesError;
      
      if (activeCodes && activeCodes.length > 0) {
        setActivePromoCode(activeCodes[0].code);
      } else {
        // Если нет активного промокода, показываем код по умолчанию
        setActivePromoCode(partner.partner_code);
      }
    } catch (error) {
      console.error('Error loading partner data:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить данные партнера",
        variant: "destructive"
      });
      // В случае ошибки используем fallback
      setPartnerCode(`PARTNER_${user?.user_metadata?.instagram_username?.toUpperCase() || 'USERNAME'}`);
      setActivePromoCode(`PARTNER_${user?.user_metadata?.instagram_username?.toUpperCase() || 'USERNAME'}`);
    } finally {
      setLoading(false);
    }
  };

  const loadActivePromoCode = async () => {
    try {
      // Получаем ID партнера
      const { data: partner, error: partnerError } = await supabase
        .from('partners')
        .select('id')
        .eq('user_id', user!.id)
        .single();

      if (partnerError) throw partnerError;
      
      // Загружаем активный промокод партнера
      const { data: activeCodes, error: codesError } = await supabase
        .from('promo_codes')
        .select('code')
        .eq('partner_id', partner.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1);

      if (codesError) throw codesError;
      
      if (activeCodes && activeCodes.length > 0) {
        setActivePromoCode(activeCodes[0].code);
      } else {
        // Если нет активного промокода, показываем partner_code
        setActivePromoCode(partnerCode);
      }
    } catch (error) {
      console.error('Error loading active promo code:', error);
      // В случае ошибки показываем partner_code
      setActivePromoCode(partnerCode);
    }
  };

  const handleSignOut = async () => {
    try {
      console.log('PartnerDashboard: Starting partner sign out process');
      await signOut();
      console.log('PartnerDashboard: Partner signed out successfully, navigating to auth');
      navigate('/auth', { replace: true });
    } catch (error) {
      console.error('PartnerDashboard: Error signing out:', error);
      // Even if sign out fails, navigate to auth page
      navigate('/auth', { replace: true });
    }
  };

  const copyReferralLink = () => {
    if (!partnerCode) {
      toast({
        title: "Ошибка",
        description: "Код партнера еще загружается, попробуйте снова",
        variant: "destructive"
      });
      return;
    }
    
    const referralLink = `${window.location.origin}/?ref=${partnerCode}`;
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Ссылка скопирована",
      description: "Реферальная ссылка скопирована в буфер обмена"
    });
  };

  const getReferralLink = () => {
    if (!partnerCode) return 'Загрузка...';
    return `${window.location.origin}/?ref=${partnerCode}`;
  };

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
                Добро пожаловать, {user?.user_metadata?.full_name || user?.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              onClick={copyReferralLink} 
              className="flex items-center gap-2"
              disabled={loading || !partnerCode}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
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
                      {getReferralLink()}
                    </code>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={copyReferralLink}
                      disabled={loading || !partnerCode}
                    >
                      {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Активный промокод</h4>
                  <div className="px-3 py-2 bg-purple-100 rounded text-sm font-mono">
                    {loading ? 'Загрузка...' : activePromoCode}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="stats" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="stats" className="flex items-center gap-2">
                <BarChart className="h-4 w-4" />
                Статистика
              </TabsTrigger>
              <TabsTrigger value="promo-codes" className="flex items-center gap-2">
                <Gift className="h-4 w-4" />
                Промокоды
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="stats" className="mt-6">
              <PartnerStats />
            </TabsContent>
            
            <TabsContent value="promo-codes" className="mt-6">
              <PromoCodeManager onPromoCodeUpdate={loadActivePromoCode} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default PartnerDashboardPage;

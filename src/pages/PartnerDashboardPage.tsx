
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PartnerStats } from '@/components/partner/PartnerStats';
import { PromoCodeManager } from '@/components/partner/PromoCodeManager';
import { useAuth } from '@/components/integration/useAuth';
import { Instagram, LogOut, ExternalLink, Copy, BarChart, Gift, Loader2, Menu } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useMobileResponsive } from '@/hooks/use-mobile-responsive';

const PartnerDashboardPage = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activePromoCode, setActivePromoCode] = useState<string>('');
  const [partnerCode, setPartnerCode] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const { isMobile, isTablet, getMobileSpacing, getMobileFontSize } = useMobileResponsive();

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
        // Если нет активного промокода, оставляем пустым
        setActivePromoCode('');
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
      setActivePromoCode('');
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
        // Если нет активного промокода, оставляем пустым
        setActivePromoCode('');
      }
    } catch (error) {
      console.error('Error loading active promo code:', error);
      // В случае ошибки очищаем промокод
      setActivePromoCode('');
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
      {/* Mobile-optimized header */}
      <header className={`bg-white border-b border-gray-200 shadow-sm ${getMobileSpacing()}`}>
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
            <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg p-1.5 md:p-2">
              <Instagram className="h-4 w-4 md:h-6 md:w-6 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className={`font-semibold text-gray-900 truncate ${isMobile ? 'text-base' : 'text-xl'}`}>
                {isMobile ? 'Партнер' : 'Партнерская панель'}
              </h1>
              <p className={`text-gray-500 truncate ${isMobile ? 'text-xs' : 'text-sm'}`}>
                {user?.user_metadata?.full_name || user?.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 md:gap-3 flex-shrink-0">
            <Button 
              variant="outline" 
              size={isMobile ? "sm" : "default"}
              onClick={copyReferralLink} 
              className="flex items-center gap-1 md:gap-2"
              disabled={loading || !partnerCode}
            >
              {loading ? (
                <Loader2 className="h-3 w-3 md:h-4 md:w-4 animate-spin" />
              ) : (
                <Copy className="h-3 w-3 md:h-4 md:w-4" />
              )}
              {!isMobile && 'Скопировать'}
            </Button>
            <Button
              variant="outline"
              size={isMobile ? "sm" : "default"}
              onClick={handleSignOut}
              className="flex items-center gap-1 md:gap-2"
            >
              <LogOut className="h-3 w-3 md:h-4 md:w-4" />
              {!isMobile && 'Выйти'}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile-optimized main content */}
      <main className={`${getMobileSpacing()} max-w-7xl mx-auto`}>
        <div className="space-y-4 md:space-y-6">
          {/* Mobile-optimized referral link card */}
          <Card>
            <CardHeader className={isMobile ? "p-4 pb-3" : undefined}>
              <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-base' : 'text-lg'}`}>
                <ExternalLink className="h-4 w-4 md:h-5 md:w-5" />
                Ваша реферальная ссылка
              </CardTitle>
              <CardDescription className={isMobile ? "text-xs" : undefined}>
                Используйте эту ссылку для привлечения новых пользователей
              </CardDescription>
            </CardHeader>
            <CardContent className={isMobile ? "p-4 pt-0" : undefined}>
              <div className={`flex gap-2 ${isMobile ? 'flex-col space-y-2' : 'flex-row'}`}>
                <code className={`px-3 py-2 bg-gray-100 rounded text-xs md:text-sm break-all ${isMobile ? 'w-full' : 'flex-1'}`}>
                  {getReferralLink()}
                </code>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={copyReferralLink}
                  disabled={loading || !partnerCode}
                  className={isMobile ? 'w-full' : 'flex-shrink-0'}
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Copy className="h-4 w-4 mr-2" />
                  )}
                  Скопировать
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Mobile-optimized tabs */}
          <Tabs defaultValue="stats" className="w-full">
            <TabsList className={`grid w-full grid-cols-2 ${isMobile ? 'h-auto' : ''}`}>
              <TabsTrigger 
                value="stats" 
                className={`flex items-center gap-1 md:gap-2 ${isMobile ? 'py-3 text-xs' : ''}`}
              >
                <BarChart className="h-3 w-3 md:h-4 md:w-4" />
                Статистика
              </TabsTrigger>
              <TabsTrigger 
                value="promo-codes" 
                className={`flex items-center gap-1 md:gap-2 ${isMobile ? 'py-3 text-xs' : ''}`}
              >
                <Gift className="h-3 w-3 md:h-4 md:w-4" />
                Промокоды
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="stats" className="mt-4 md:mt-6">
              <PartnerStats />
            </TabsContent>
            
            <TabsContent value="promo-codes" className="mt-4 md:mt-6">
              <PromoCodeManager onPromoCodeUpdate={loadActivePromoCode} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default PartnerDashboardPage;

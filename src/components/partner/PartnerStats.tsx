
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Users, UserPlus, Gift, CreditCard, TrendingUp } from 'lucide-react';
import { useMobileResponsive } from '@/hooks/use-mobile-responsive';

interface PartnerStatsData {
  partner_id: string;
  instagram_username: string;
  partner_code: string;
  total_clicks: number;
  registrations: number;
  promo_usage: number;
  paid_conversions: number;
}

export const PartnerStats = () => {
  const [stats, setStats] = useState<PartnerStatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { isMobile, isTablet, getMobileSpacing, getMobileFontSize } = useMobileResponsive();

  useEffect(() => {
    loadPartnerStats();
  }, []);

  const loadPartnerStats = async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('Пользователь не авторизован');

      // Получаем ID партнера по user_id
      const { data: partner } = await supabase
        .from('partners')
        .select('id')
        .eq('user_id', user.user.id)
        .single();

      if (!partner) throw new Error('Партнер не найден');

      // Получаем статистику из представления
      const { data: statsData, error } = await supabase
        .from('partner_stats')
        .select('*')
        .eq('partner_id', partner.id)
        .single();

      if (error) throw error;
      setStats(statsData);
    } catch (error) {
      console.error('Error loading partner stats:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить статистику",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Загрузка статистики...</div>;
  }

  if (!stats) {
    return <div className="text-center py-8">Статистика недоступна</div>;
  }

  const conversionRate = stats.total_clicks > 0 
    ? (stats.registrations / stats.total_clicks * 100).toFixed(1) 
    : '0';
  const paymentRate = stats.registrations > 0 
    ? (stats.paid_conversions / stats.registrations * 100).toFixed(1) 
    : '0';

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Mobile-optimized header */}
      <div className={`flex items-center justify-between ${isMobile ? 'flex-col items-start space-y-2' : 'flex-row'}`}>
        <div>
          <h2 className={`font-bold ${isMobile ? 'text-xl' : 'text-2xl'}`}>
            @{stats.instagram_username}
          </h2>
          <p className={`text-muted-foreground ${isMobile ? 'text-sm' : ''}`}>
            Партнерский код: {stats.partner_code}
          </p>
        </div>
        <Badge 
          variant="default" 
          className={`bg-gradient-to-r from-pink-500 to-purple-600 ${isMobile ? 'text-xs' : ''}`}
        >
          Активный партнер
        </Badge>
      </div>

      {/* Mobile-optimized stats grid */}
      <div className={`grid gap-3 md:gap-4 ${
        isMobile 
          ? 'grid-cols-1' 
          : isTablet 
            ? 'grid-cols-2' 
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      }`}>
        <Card>
          <CardHeader className={`flex flex-row items-center justify-between space-y-0 ${isMobile ? 'pb-1' : 'pb-2'}`}>
            <CardTitle className={`font-medium ${isMobile ? 'text-sm' : 'text-sm'}`}>
              Регистрации
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className={isMobile ? 'pt-0' : undefined}>
            <div className={`font-bold ${isMobile ? 'text-xl' : 'text-2xl'}`}>
              {stats.total_clicks}
            </div>
            <p className={`text-muted-foreground ${isMobile ? 'text-xs' : 'text-xs'}`}>
              Всего кликов по реферальным ссылкам
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className={`flex flex-row items-center justify-between space-y-0 ${isMobile ? 'pb-1' : 'pb-2'}`}>
            <CardTitle className={`font-medium ${isMobile ? 'text-sm' : 'text-sm'}`}>
              Использования промокода
            </CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className={isMobile ? 'pt-0' : undefined}>
            <div className={`font-bold ${isMobile ? 'text-xl' : 'text-2xl'}`}>
              {stats.promo_usage}
            </div>
            <p className={`text-muted-foreground ${isMobile ? 'text-xs' : 'text-xs'}`}>
              Активаций промокода {stats.partner_code}
            </p>
          </CardContent>
        </Card>

        <Card className={isMobile ? '' : isTablet ? 'col-span-2' : ''}>
          <CardHeader className={`flex flex-row items-center justify-between space-y-0 ${isMobile ? 'pb-1' : 'pb-2'}`}>
            <CardTitle className={`font-medium ${isMobile ? 'text-sm' : 'text-sm'}`}>
              Оплаченные подписки
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className={isMobile ? 'pt-0' : undefined}>
            <div className={`font-bold ${isMobile ? 'text-xl' : 'text-2xl'}`}>
              {stats.paid_conversions}
            </div>
            <p className={`text-muted-foreground ${isMobile ? 'text-xs' : 'text-xs'}`}>
              Конверсия в оплату: {paymentRate}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Mobile-optimized efficiency card */}
      <Card>
        <CardHeader className={isMobile ? 'pb-3' : undefined}>
          <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-lg' : ''}`}>
            <TrendingUp className="h-4 w-4 md:h-5 md:w-5" />
            Эффективность
          </CardTitle>
        </CardHeader>
        <CardContent className={isMobile ? 'pt-0' : undefined}>
          <div className={`grid gap-4 ${
            isMobile 
              ? 'grid-cols-1 space-y-3' 
              : 'grid-cols-1 md:grid-cols-3'
          }`}>
            <div className="text-center">
              <div className={`font-bold text-blue-600 ${isMobile ? 'text-2xl' : 'text-3xl'}`}>
                {conversionRate}%
              </div>
              <p className={`text-muted-foreground ${isMobile ? 'text-xs' : 'text-sm'}`}>
                Конверсия в регистрацию
              </p>
            </div>
            <div className="text-center">
              <div className={`font-bold text-green-600 ${isMobile ? 'text-2xl' : 'text-3xl'}`}>
                {paymentRate}%
              </div>
              <p className={`text-muted-foreground ${isMobile ? 'text-xs' : 'text-sm'}`}>
                Конверсия в оплату
              </p>
            </div>
            <div className="text-center">
              <div className={`font-bold text-purple-600 ${isMobile ? 'text-2xl' : 'text-3xl'}`}>
                {stats.total_clicks > 0 
                  ? (stats.paid_conversions / stats.total_clicks * 100).toFixed(1) 
                  : '0'}%
              </div>
              <p className={`text-muted-foreground ${isMobile ? 'text-xs' : 'text-sm'}`}>
                Общая конверсия
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

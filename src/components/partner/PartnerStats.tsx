
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Users, UserPlus, Gift, CreditCard, TrendingUp } from 'lucide-react';

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
    ? ((stats.registrations / stats.total_clicks) * 100).toFixed(1)
    : '0';

  const paymentRate = stats.registrations > 0 
    ? ((stats.paid_conversions / stats.registrations) * 100).toFixed(1)
    : '0';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">@{stats.instagram_username}</h2>
          <p className="text-muted-foreground">Партнерский код: {stats.partner_code}</p>
        </div>
        <Badge variant="default" className="bg-gradient-to-r from-pink-500 to-purple-600">
          Активный партнер
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Переходы по ссылке</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total_clicks}</div>
            <p className="text-xs text-muted-foreground">
              Всего кликов по реферальным ссылкам
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Регистрации</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.registrations}</div>
            <p className="text-xs text-muted-foreground">
              Конверсия: {conversionRate}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Использования промокода</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.promo_usage}</div>
            <p className="text-xs text-muted-foreground">
              Активаций промокода {stats.partner_code}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Оплаченные подписки</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.paid_conversions}</div>
            <p className="text-xs text-muted-foreground">
              Конверсия в оплату: {paymentRate}%
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Эффективность
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{conversionRate}%</div>
              <p className="text-sm text-muted-foreground">Конверсия в регистрацию</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{paymentRate}%</div>
              <p className="text-sm text-muted-foreground">Конверсия в оплату</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {stats.total_clicks > 0 ? ((stats.paid_conversions / stats.total_clicks) * 100).toFixed(1) : '0'}%
              </div>
              <p className="text-sm text-muted-foreground">Общая конверсия</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

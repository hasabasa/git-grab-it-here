import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/integration/useAuth';
import { useToast } from '@/components/ui/use-toast';
import { Plus, CheckCircle, Clock, AlertCircle, Loader2, Info } from 'lucide-react';
import { useMobileResponsive } from '@/hooks/use-mobile-responsive';

interface PromoCode {
  id: string;
  code: string;
  bonus_days: number;
  max_usage: number | null;
  usage_count: number;
  is_active: boolean;
  expires_at: string | null;
  created_at: string;
}

interface PromoCodeManagerProps {
  onPromoCodeUpdate?: () => void;
}

export const PromoCodeManager = ({ onPromoCodeUpdate }: PromoCodeManagerProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { isMobile, isTablet, getMobileSpacing } = useMobileResponsive();
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [activating, setActivating] = useState<string | null>(null);
  const [newCode, setNewCode] = useState('');
  const bonusDays = 10; // Обновлено значение с 15 на 10
  const [maxUsage, setMaxUsage] = useState<number | ''>('');
  const [partnerId, setPartnerId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadPartnerData();
    }
  }, [user]);

  const loadPartnerData = async () => {
    try {
      // Получаем ID партнера
      const { data: partner, error: partnerError } = await supabase
        .from('partners')
        .select('id')
        .eq('user_id', user!.id)
        .single();

      if (partnerError) throw partnerError;
      
      setPartnerId(partner.id);
      
      // Загружаем промокоды партнера
      const { data: codes, error: codesError } = await supabase
        .from('promo_codes')
        .select('*')
        .eq('partner_id', partner.id)
        .order('created_at', { ascending: false });

      if (codesError) throw codesError;
      
      setPromoCodes(codes || []);
    } catch (error) {
      console.error('Error loading partner data:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить данные партнера",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createPromoCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerId || !newCode.trim()) return;

    setCreating(true);
    try {
      const { data, error } = await supabase.rpc('create_partner_promo_code', {
        p_partner_id: partnerId,
        p_code: newCode.trim(),
        p_bonus_days: bonusDays,
        p_max_usage: maxUsage === '' ? null : Number(maxUsage)
      });

      if (error) throw error;

      const response = data as { success: boolean; error?: string; message?: string };

      if (response.success) {
        toast({
          title: "Промокод создан",
          description: response.message
        });
        
        setNewCode('');
        setMaxUsage('');
        loadPartnerData(); // Перезагружаем список
        
        // Уведомляем родительский компонент об обновлении
        if (onPromoCodeUpdate) {
          onPromoCodeUpdate();
        }
      } else {
        toast({
          title: "Ошибка",
          description: response.error || 'Не удалось создать промокод',
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error creating promo code:', error);
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при создании промокода",
        variant: "destructive"
      });
    } finally {
      setCreating(false);
    }
  };

  const activatePromoCode = async (promoId: string) => {
    if (!partnerId) return;

    setActivating(promoId);
    try {
      const { data, error } = await supabase.rpc('activate_promo_code', {
        p_promo_id: promoId,
        p_partner_id: partnerId
      });

      if (error) throw error;

      const response = data as { success: boolean; error?: string; message?: string };

      if (response.success) {
        toast({
          title: "Промокод активирован",
          description: response.message
        });
        loadPartnerData(); // Перезагружаем список
        
        // Уведомляем родительский компонент об обновлении
        if (onPromoCodeUpdate) {
          onPromoCodeUpdate();
        }
      } else {
        toast({
          title: "Ошибка",
          description: response.error || 'Не удалось активировать промокод',
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error activating promo code:', error);
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при активации промокода",
        variant: "destructive"
      });
    } finally {
      setActivating(null);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Загрузка промокодов...</div>;
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Информационное уведомление */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription className={isMobile ? "text-sm" : undefined}>
          При создании нового промокода все ваши старые активные промокоды будут автоматически отключены. 
          Новый промокод создается в неактивном состоянии - не забудьте его активировать.
        </AlertDescription>
      </Alert>

      {/* Форма создания нового промокода */}
      <Card>
        <CardHeader className={isMobile ? "pb-3" : undefined}>
          <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-lg' : ''}`}>
            <Plus className="h-4 w-4 md:h-5 md:w-5" />
            Создать новый промокод
          </CardTitle>
        </CardHeader>
        <CardContent className={isMobile ? "pt-0" : undefined}>
          <form onSubmit={createPromoCode} className="space-y-4">
            <div className={`grid gap-4 ${
              isMobile 
                ? 'grid-cols-1' 
                : isTablet 
                  ? 'grid-cols-2' 
                  : 'grid-cols-1 md:grid-cols-3'
            }`}>
              <div className="space-y-2">
                <Label htmlFor="code" className={isMobile ? "text-sm" : undefined}>
                  Код промокода
                </Label>
                <Input
                  id="code"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                  placeholder="PROMO2024"
                  required
                  disabled={creating}
                  className={isMobile ? "h-11" : undefined}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bonus" className={isMobile ? "text-sm" : undefined}>
                  Бонусные дни
                </Label>
                <Input
                  id="bonus"
                  type="number"
                  value={bonusDays}
                  disabled
                  className={`bg-gray-50 text-gray-600 ${isMobile ? "h-11" : ""}`}
                />
                <p className={`text-gray-500 ${isMobile ? 'text-xs' : 'text-xs'}`}>
                  Фиксированное значение
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="max-usage" className={isMobile ? "text-sm" : undefined}>
                  Макс. использований
                </Label>
                <Input
                  id="max-usage"
                  type="number"
                  value={maxUsage}
                  onChange={(e) => setMaxUsage(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="Без ограничений"
                  min="1"
                  disabled={creating}
                  className={isMobile ? "h-11" : undefined}
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              disabled={creating || !newCode.trim()}
              className={isMobile ? "w-full h-11" : undefined}
              size={isMobile ? "default" : "default"}
            >
              {creating && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {creating ? 'Создание...' : 'Создать промокод'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Список промокодов */}
      <Card>
        <CardHeader className={isMobile ? "pb-3" : undefined}>
          <CardTitle className={isMobile ? "text-lg" : undefined}>
            Мои промокоды
          </CardTitle>
        </CardHeader>
        <CardContent className={isMobile ? "pt-0" : undefined}>
          {promoCodes.length === 0 ? (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className={isMobile ? "text-sm" : undefined}>
                У вас пока нет созданных промокодов
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-3 md:space-y-4">
              {promoCodes.map((promo) => (
                <div
                  key={promo.id}
                  className={`border rounded-lg ${
                    isMobile 
                      ? 'p-3 space-y-3' 
                      : 'p-4 flex items-center justify-between'
                  }`}
                >
                  <div className={isMobile ? "space-y-2" : "flex-1"}>
                    <div className={`flex items-center gap-3 ${isMobile ? 'flex-wrap' : 'mb-2'}`}>
                      <code className={`font-mono font-bold ${isMobile ? 'text-base' : 'text-lg'}`}>
                        {promo.code}
                      </code>
                      <Badge variant={promo.is_active ? "default" : "secondary"}>
                        {promo.is_active ? (
                          <>
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Активен
                          </>
                        ) : (
                          <>
                            <Clock className="h-3 w-3 mr-1" />
                            Неактивен
                          </>
                        )}
                      </Badge>
                    </div>
                    
                    <div className={`text-muted-foreground space-y-1 ${isMobile ? 'text-sm' : 'text-sm'}`}>
                      <div>Бонусные дни: {promo.bonus_days}</div>
                      <div>
                        Использований: {promo.usage_count}
                        {promo.max_usage && ` / ${promo.max_usage}`}
                      </div>
                      <div>Создан: {new Date(promo.created_at).toLocaleDateString('ru-RU')}</div>
                    </div>
                  </div>
                  
                  {!promo.is_active && (
                    <div className={isMobile ? "w-full" : "flex-shrink-0"}>
                      <Button
                        onClick={() => activatePromoCode(promo.id)}
                        variant="outline"
                        size={isMobile ? "default" : "sm"}
                        disabled={activating === promo.id}
                        className={isMobile ? "w-full h-11" : undefined}
                      >
                        {activating === promo.id ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <CheckCircle className="h-4 w-4 mr-2" />
                        )}
                        {activating === promo.id ? 'Активация...' : 'Активировать'}
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

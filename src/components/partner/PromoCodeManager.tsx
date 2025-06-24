
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
    <div className="space-y-6">
      {/* Информационное уведомление */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          При создании нового промокода все ваши старые активные промокоды будут автоматически отключены. 
          Новый промокод создается в неактивном состоянии - не забудьте его активировать.
        </AlertDescription>
      </Alert>

      {/* Форма создания нового промокода */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Создать новый промокод
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={createPromoCode} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="code">Код промокода</Label>
                <Input
                  id="code"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                  placeholder="PROMO2024"
                  required
                  disabled={creating}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bonus">Бонусные дни</Label>
                <Input
                  id="bonus"
                  type="number"
                  value={bonusDays}
                  disabled
                  className="bg-gray-50 text-gray-600"
                />
                <p className="text-xs text-gray-500">Фиксированное значение</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="max-usage">Макс. использований</Label>
                <Input
                  id="max-usage"
                  type="number"
                  value={maxUsage}
                  onChange={(e) => setMaxUsage(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="Без ограничений"
                  min="1"
                  disabled={creating}
                />
              </div>
            </div>
            
            <Button type="submit" disabled={creating || !newCode.trim()}>
              {creating && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {creating ? 'Создание...' : 'Создать промокод'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Список промокодов */}
      <Card>
        <CardHeader>
          <CardTitle>Мои промокоды</CardTitle>
        </CardHeader>
        <CardContent>
          {promoCodes.length === 0 ? (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                У вас пока нет созданных промокодов
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-4">
              {promoCodes.map((promo) => (
                <div
                  key={promo.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <code className="text-lg font-mono font-bold">{promo.code}</code>
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
                    
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>Бонусные дни: {promo.bonus_days}</div>
                      <div>
                        Использований: {promo.usage_count}
                        {promo.max_usage && ` / ${promo.max_usage}`}
                      </div>
                      <div>Создан: {new Date(promo.created_at).toLocaleDateString('ru-RU')}</div>
                    </div>
                  </div>
                  
                  {!promo.is_active && (
                    <Button
                      onClick={() => activatePromoCode(promo.id)}
                      variant="outline"
                      size="sm"
                      disabled={activating === promo.id}
                    >
                      {activating === promo.id ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <CheckCircle className="h-4 w-4 mr-2" />
                      )}
                      {activating === promo.id ? 'Активация...' : 'Активировать'}
                    </Button>
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

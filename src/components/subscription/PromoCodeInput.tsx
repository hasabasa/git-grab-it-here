
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/components/integration/useAuth';
import { useReferralConversion } from '@/hooks/useReferralConversion';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Gift, AlertCircle, CheckCircle } from 'lucide-react';

interface PromoCodeResponse {
  success: boolean;
  message?: string;
  error?: string;
  bonus_days?: number;
  new_end_date?: string;
}

export const PromoCodeInput = () => {
  const [promoCode, setPromoCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { user } = useAuth();
  const { recordConversion } = useReferralConversion();
  const { toast } = useToast();

  const handleApplyPromoCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !promoCode.trim()) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Вызываем функцию применения промокода
      const { data, error } = await supabase.rpc('apply_promo_code', {
        p_user_id: user.id,
        p_promo_code: promoCode.trim().toUpperCase()
      });

      if (error) {
        throw error;
      }

      const response = data as PromoCodeResponse;

      if (response.success) {
        setSuccess(response.message || 'Промокод применен успешно');
        setPromoCode('');
        
        // Записываем конверсию использования промокода
        await recordConversion(user.id, 'promo_code_usage', 0);
        
        toast({
          title: "Промокод применен",
          description: response.message || 'Промокод применен успешно',
        });
      } else {
        setError(response.error || 'Ошибка применения промокода');
        toast({
          title: "Ошибка",
          description: response.error || 'Ошибка применения промокода',
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error applying promo code:', error);
      const errorMessage = error instanceof Error ? error.message : 'Произошла ошибка';
      setError(errorMessage);
      toast({
        title: "Ошибка",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gift className="h-5 w-5" />
          Промокод
        </CardTitle>
        <CardDescription>
          Введите промокод для получения дополнительных дней подписки
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleApplyPromoCode} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="promo-code">Промокод</Label>
            <Input
              id="promo-code"
              type="text"
              placeholder="Введите промокод"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
              disabled={loading}
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <Button 
            type="submit" 
            disabled={loading || !promoCode.trim()}
            className="w-full"
          >
            {loading ? 'Применение...' : 'Применить промокод'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PromoCodeInput;

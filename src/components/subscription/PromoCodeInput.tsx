
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/integration/useAuth';
import { useReferralConversion } from '@/hooks/useReferralConversion';
import { useToast } from '@/components/ui/use-toast';
import { Gift, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export const PromoCodeInput = () => {
  const { user } = useAuth();
  const { recordConversion } = useReferralConversion();
  const { toast } = useToast();
  const [promoCode, setPromoCode] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const applyPromoCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !promoCode.trim()) return;

    setIsApplying(true);
    setMessage(null);

    try {
      console.log('Applying promo code:', promoCode);

      const { data, error } = await supabase.rpc('apply_promo_code', {
        p_user_id: user.id,
        p_promo_code: promoCode.trim().toUpperCase()
      });

      if (error) {
        console.error('Error applying promo code:', error);
        throw error;
      }

      const result = data as { success: boolean; error?: string; message?: string; bonus_days?: number };

      if (result.success) {
        console.log('Promo code applied successfully:', result);
        
        setMessage({ type: 'success', text: result.message || 'Промокод успешно применен!' });
        
        toast({
          title: "Промокод применен!",
          description: `Добавлено ${result.bonus_days} дней к подписке`
        });

        // Record promo code usage conversion
        try {
          // Get promo code ID for conversion tracking
          const { data: promoData } = await supabase
            .from('promo_codes')
            .select('id, partner_id')
            .eq('code', promoCode.trim().toUpperCase())
            .single();

          if (promoData) {
            console.log('Recording promo code conversion:', promoData);
            await recordConversion(user.id, 'promo_code_usage', 0, promoData.id);
            console.log('Promo code conversion recorded successfully');
          }
        } catch (conversionError) {
          console.error('Error recording promo code conversion:', conversionError);
          // Don't fail the promo code application if conversion recording fails
        }

        setPromoCode('');
      } else {
        console.error('Promo code application failed:', result.error);
        setMessage({ type: 'error', text: result.error || 'Не удалось применить промокод' });
      }
    } catch (error) {
      console.error('Error in applyPromoCode:', error);
      setMessage({ type: 'error', text: 'Произошла ошибка при применении промокода' });
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-lg font-semibold">
        <Gift className="h-5 w-5 text-purple-600" />
        Промокод
      </div>
      
      <form onSubmit={applyPromoCode} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="promo-code">Введите промокод</Label>
          <div className="flex gap-2">
            <Input
              id="promo-code"
              type="text"
              placeholder="PROMO2024"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
              disabled={isApplying}
              className="flex-1"
            />
            <Button type="submit" disabled={isApplying || !promoCode.trim()}>
              {isApplying && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {isApplying ? 'Применение...' : 'Применить'}
            </Button>
          </div>
        </div>

        {message && (
          <Alert variant={message.type === 'error' ? 'destructive' : 'default'}>
            {message.type === 'error' ? (
              <AlertCircle className="h-4 w-4" />
            ) : (
              <CheckCircle className="h-4 w-4" />
            )}
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}
      </form>
    </div>
  );
};


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/integration/useAuth';
import { useReferralConversion } from '@/hooks/useReferralConversion';
import { Gift, Loader2 } from 'lucide-react';

const PromoCodeInput = () => {
  const { user } = useAuth();
  const { recordConversion } = useReferralConversion();
  const { toast } = useToast();
  const [promoCode, setPromoCode] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  const handleApplyPromoCode = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Ошибка",
        description: "Необходимо войти в систему для применения промокода",
        variant: "destructive"
      });
      return;
    }

    if (!promoCode.trim()) {
      toast({
        title: "Ошибка",
        description: "Введите промокод",
        variant: "destructive"
      });
      return;
    }

    setIsApplying(true);

    try {
      console.log('Applying promo code:', promoCode.trim().toUpperCase());
      
      const { data, error } = await supabase.rpc('apply_promo_code', {
        p_user_id: user.id,
        p_promo_code: promoCode.trim().toUpperCase()
      });

      console.log('Promo code application result:', data, error);

      if (error) {
        console.error('Error applying promo code:', error);
        throw error;
      }

      const response = data as { success: boolean; error?: string; message?: string; bonus_days?: number };

      if (response.success) {
        // Get the promo code details for conversion tracking
        const { data: promoCodeData } = await supabase
          .from('promo_codes')
          .select('id, partner_id')
          .eq('code', promoCode.trim().toUpperCase())
          .single();

        // Record conversion for promo code usage
        if (promoCodeData?.id) {
          await recordConversion(user.id, 'promo_code_usage', 0, promoCodeData.id);
        }

        toast({
          title: "Промокод применен!",
          description: response.message || `Добавлено ${response.bonus_days || 0} дней к подписке`
        });
        
        setPromoCode('');
        
        // Reload the page to refresh subscription status
        window.location.reload();
      } else {
        toast({
          title: "Ошибка применения промокода",
          description: response.error || 'Промокод недействителен',
          variant: "destructive"
        });
      }
    } catch (error: any) {
      console.error('Error applying promo code:', error);
      toast({
        title: "Ошибка",
        description: error.message || 'Произошла ошибка при применении промокода',
        variant: "destructive"
      });
    } finally {
      setIsApplying(false);
    }
  };

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
        <form onSubmit={handleApplyPromoCode} className="flex gap-2">
          <Input
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
            placeholder="ВВЕДИТЕ ПРОМОКОД"
            className="uppercase"
            disabled={isApplying}
          />
          <Button type="submit" disabled={isApplying || !promoCode.trim()}>
            {isApplying ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Применение...
              </>
            ) : (
              'Применить'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PromoCodeInput;

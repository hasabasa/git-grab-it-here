
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export const useReferralConversion = () => {
  const { toast } = useToast();

  const recordConversion = async (
    userId: string,
    conversionType: 'registration' | 'promo_code_usage' | 'subscription_payment',
    amount?: number,
    promoCodeId?: string
  ) => {
    try {
      // Получаем данные реферала из localStorage
      const referralData = localStorage.getItem('referral_data');
      if (!referralData) {
        console.log('No referral data found');
        return;
      }

      const parsed = JSON.parse(referralData);
      console.log('Recording conversion:', { conversionType, userId, referralData: parsed });

      // Находим партнера по коду
      const { data: partner, error: partnerError } = await supabase
        .from('partners')
        .select('id, commission_rate')
        .eq('partner_code', parsed.partner_code)
        .single();

      if (partnerError || !partner) {
        console.error('Partner not found:', partnerError);
        return;
      }

      // Вычисляем комиссию
      const commissionRate = partner.commission_rate || 10;
      const commissionEarned = amount ? (amount * commissionRate / 100) : 0;

      // Записываем конверсию
      const { error: conversionError } = await supabase
        .from('referral_conversions')
        .insert({
          partner_id: partner.id,
          user_id: userId,
          promo_code_id: promoCodeId,
          referral_click_id: parsed.click_id,
          conversion_type: conversionType,
          amount: amount || 0,
          commission_earned: commissionEarned,
          status: 'confirmed',
          notes: `Conversion from ${parsed.utm_source || 'unknown source'}`
        });

      if (conversionError) {
        console.error('Error recording conversion:', conversionError);
      } else {
        console.log('Conversion recorded successfully');
        
        // Очищаем данные реферала только после успешной записи
        if (conversionType === 'registration') {
          // Не очищаем данные после регистрации, так как могут быть дополнительные конверсии
          console.log('Registration conversion recorded, keeping referral data for future conversions');
        }
      }
    } catch (error) {
      console.error('Error in recordConversion:', error);
    }
  };

  return {
    recordConversion
  };
};


import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useReferralTracking = () => {
  useEffect(() => {
    const trackReferral = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const partnerCode = urlParams.get('ref') || urlParams.get('partner');
      
      if (partnerCode) {
        console.log('Tracking referral for partner:', partnerCode);
        
        try {
          // Вызываем Edge Function для записи клика
          const { data, error } = await supabase.functions.invoke('track-referral', {
            body: {
              partner_code: partnerCode,
              url: window.location.href,
              utm_source: urlParams.get('utm_source'),
              utm_medium: urlParams.get('utm_medium'),
              utm_campaign: urlParams.get('utm_campaign'),
              utm_content: urlParams.get('utm_content'),
              utm_term: urlParams.get('utm_term'),
            }
          });

          if (error) {
            console.error('Error tracking referral:', error);
          } else {
            console.log('Referral tracked successfully:', data);
            
            // Сохраняем информацию в localStorage для дальнейшего использования при регистрации
            const referralData = {
              partner_code: partnerCode,
              utm_source: urlParams.get('utm_source'),
              utm_medium: urlParams.get('utm_medium'),
              utm_campaign: urlParams.get('utm_campaign'),
              utm_content: urlParams.get('utm_content'),
              utm_term: urlParams.get('utm_term'),
              click_id: data?.clickId,
              timestamp: new Date().toISOString()
            };
            
            localStorage.setItem('referral_data', JSON.stringify(referralData));
          }
        } catch (error) {
          console.error('Error calling track-referral function:', error);
        }
      }
    };

    trackReferral();
  }, []);

  const getReferralData = () => {
    const stored = localStorage.getItem('referral_data');
    return stored ? JSON.parse(stored) : null;
  };

  const clearReferralData = () => {
    localStorage.removeItem('referral_data');
  };

  return {
    getReferralData,
    clearReferralData
  };
};

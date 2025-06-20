
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface Partner {
  id: string;
  user_id: string;
  partner_code: string;
  instagram_username: string;
  company_name: string | null;
  contact_email: string | null;
  commission_rate: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const usePartners = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadPartners();
  }, []);

  const loadPartners = async () => {
    try {
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setPartners(data || []);
    } catch (error) {
      console.error('Error loading partners:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить список партнеров",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createPartner = async (partnerData: {
    email: string;
    password: string;
    fullName: string;
    instagramUsername: string;
    partnerCode: string;
  }) => {
    try {
      const { data, error } = await supabase.functions.invoke('create-partner', {
        body: partnerData,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!data.success) {
        throw new Error(data.error);
      }

      await loadPartners();
      
      toast({
        title: "Успех",
        description: "Партнер создан успешно. Учетные данные отправлены на email."
      });

      return { success: true };
    } catch (error) {
      console.error('Error creating partner:', error);
      toast({
        title: "Ошибка",
        description: error instanceof Error ? error.message : "Не удалось создать партнера",
        variant: "destructive"
      });
      return { success: false, error };
    }
  };

  const updatePartner = async (id: string, updates: Partial<Partner>) => {
    try {
      const { error } = await supabase
        .from('partners')
        .update(updates)
        .eq('id', id);
      
      if (error) throw error;
      
      await loadPartners();
      
      toast({
        title: "Успех",
        description: "Партнер обновлен"
      });
    } catch (error) {
      console.error('Error updating partner:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось обновить партнера",
        variant: "destructive"
      });
    }
  };

  return {
    partners,
    loading,
    createPartner,
    updatePartner,
    refetchPartners: loadPartners
  };
};

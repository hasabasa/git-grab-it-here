
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { CheckCircle, Loader } from 'lucide-react';

interface ConfirmPartnerEmailButtonProps {
  email: string;
  onConfirmed?: () => void;
}

export const ConfirmPartnerEmailButton = ({ email, onConfirmed }: ConfirmPartnerEmailButtonProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleConfirm = async () => {
    setLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('confirm-partner-email', {
        body: { email }
      });

      if (error) throw error;

      if (data.success) {
        toast({
          title: "Email подтвержден",
          description: `Email ${email} успешно подтвержден. Партнер может войти в систему.`
        });
        onConfirmed?.();
      } else {
        throw new Error(data.error || 'Неизвестная ошибка');
      }
    } catch (error) {
      console.error('Error confirming email:', error);
      toast({
        title: "Ошибка подтверждения",
        description: error instanceof Error ? error.message : 'Не удалось подтвердить email',
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleConfirm}
      disabled={loading}
      size="sm"
      variant="outline"
      className="flex items-center gap-2"
    >
      {loading ? (
        <Loader className="h-4 w-4 animate-spin" />
      ) : (
        <CheckCircle className="h-4 w-4" />
      )}
      {loading ? 'Подтверждение...' : 'Подтвердить Email'}
    </Button>
  );
};

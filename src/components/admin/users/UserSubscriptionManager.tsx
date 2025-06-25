
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface UserProfile {
  id: string;
  subscription_end_date: string | null;
  bonus_days: number | null;
}

interface UserSubscriptionManagerProps {
  user: UserProfile;
  onUpdate: () => void;
}

export const UserSubscriptionManager = ({ user, onUpdate }: UserSubscriptionManagerProps) => {
  const extendSubscription = async (days: number) => {
    try {
      let newEndDate: Date;
      if (user.subscription_end_date && new Date(user.subscription_end_date) > new Date()) {
        newEndDate = new Date(user.subscription_end_date);
      } else {
        newEndDate = new Date();
      }
      
      newEndDate.setDate(newEndDate.getDate() + days);

      const { error } = await supabase
        .from('profiles')
        .update({
          subscription_end_date: newEndDate.toISOString(),
          bonus_days: (user.bonus_days || 0) + days,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;
      
      toast.success(`Подписка продлена на ${days} дней`);
      onUpdate();
    } catch (error) {
      console.error('Error extending subscription:', error);
      toast.error('Ошибка продления подписки');
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => extendSubscription(7)}
      >
        +7 дней
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => extendSubscription(30)}
      >
        +30 дней
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => extendSubscription(365)}
      >
        +1 год
      </Button>
    </div>
  );
};

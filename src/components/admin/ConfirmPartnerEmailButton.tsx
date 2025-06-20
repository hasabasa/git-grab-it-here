
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

interface ConfirmPartnerEmailButtonProps {
  email: string;
  onConfirmed?: () => void;
}

export const ConfirmPartnerEmailButton = ({ email, onConfirmed }: ConfirmPartnerEmailButtonProps) => {
  return (
    <Button
      disabled
      size="sm"
      variant="outline"
      className="flex items-center gap-2 opacity-50"
      title="Email подтверждение отключено для всех пользователей"
    >
      <CheckCircle className="h-4 w-4" />
      Email подтвержден
    </Button>
  );
};

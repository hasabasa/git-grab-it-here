
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/components/integration/useAuth";
import { Smartphone, Shield } from "lucide-react";

interface PhoneVerificationProps {
  phone: string;
  onVerified: () => void;
  onBack: () => void;
}

const PhoneVerification = ({ phone, onVerified, onBack }: PhoneVerificationProps) => {
  const { verifyOtp } = useAuth();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otp || otp.length !== 6) {
      toast.error('Введите 6-значный код подтверждения');
      return;
    }

    setLoading(true);
    
    try {
      await verifyOtp(phone, otp);
      toast.success('Телефон успешно подтвержден!');
      onVerified();
    } catch (error: any) {
      console.error('OTP verification error:', error);
      toast.error(error.message || 'Ошибка подтверждения кода');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Подтверждение телефона
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center">
            <Smartphone className="h-12 w-12 mx-auto text-blue-600 mb-4" />
            <p className="text-sm text-gray-600 mb-2">
              SMS с кодом подтверждения отправлено на номер:
            </p>
            <p className="font-semibold text-lg">{phone}</p>
          </div>

          <form onSubmit={handleVerify} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">Код подтверждения</Label>
              <Input
                id="otp"
                type="text"
                placeholder="000000"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                maxLength={6}
                className="text-center text-lg tracking-widest"
                required
              />
              <p className="text-xs text-gray-500 text-center">
                Введите 6-значный код из SMS
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                onClick={onBack}
                variant="outline"
                className="flex-1"
                disabled={loading}
              >
                Назад
              </Button>
              <Button 
                type="submit" 
                className="flex-1"
                disabled={loading || !otp || otp.length !== 6}
              >
                {loading ? 'Проверка...' : 'Подтвердить'}
              </Button>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhoneVerification;

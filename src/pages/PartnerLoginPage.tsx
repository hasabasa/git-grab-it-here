
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/components/integration/useAuth';
import { useToast } from '@/components/ui/use-toast';
import { Instagram, LogIn, AlertCircle } from 'lucide-react';

const PartnerLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await signIn(email, password);
      
      if (result.error) {
        console.log('Login error:', result.error);
        
        if (result.error.message.includes('Invalid login credentials')) {
          setError('Неверный email или пароль. Проверьте правильность введенных данных.');
        } else {
          setError(`Ошибка входа: ${result.error.message}`);
        }
      } else {
        navigate('/partner/dashboard');
        toast({
          title: "Добро пожаловать!",
          description: "Вы успешно вошли в партнерскую панель"
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Произошла неожиданная ошибка при входе');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg p-3">
              <Instagram className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl">Партнерская панель</CardTitle>
              <CardDescription>
                Войдите в вашу партнерскую панель Mark Bot
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="partner@partners.internal"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" disabled={loading} className="w-full">
              <LogIn className="h-4 w-4 mr-2" />
              {loading ? 'Вход...' : 'Войти'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PartnerLoginPage;


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/components/integration/useAuth';
import { useUserRole } from '@/hooks/useUserRole';
import { useToast } from '@/components/ui/use-toast';
import { Instagram, LogIn, AlertCircle } from 'lucide-react';

const PartnerLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, signIn, loading: authLoading } = useAuth();
  const { isPartner, loading: roleLoading } = useUserRole();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Проверяем, авторизован ли уже пользователь как партнер
  useEffect(() => {
    console.log('PartnerLogin: Auth state check - user:', user?.email, 'authLoading:', authLoading, 'isPartner:', isPartner, 'roleLoading:', roleLoading);
    
    if (!authLoading && !roleLoading && user && isPartner) {
      console.log('PartnerLogin: User already logged in as partner, redirecting to dashboard');
      navigate('/partner/dashboard', { replace: true });
    }
  }, [user, isPartner, authLoading, roleLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('PartnerLogin: Starting login process with email:', email);
    setLoading(true);
    setError(null);

    try {
      const result = await signIn(email, password);
      console.log('PartnerLogin: SignIn result:', result);
      
      if (result.error) {
        console.log('PartnerLogin: Login error:', result.error);
        
        if (result.error.message.includes('Invalid login credentials')) {
          setError('Неверный email или пароль. Проверьте правильность введенных данных.');
        } else if (result.error.message.includes('Email not confirmed')) {
          setError('Email не подтвержден. Проверьте вашу почту и подтвердите регистрацию.');
        } else {
          setError(`Ошибка входа: ${result.error.message}`);
        }
      } else if (result.data?.user) {
        console.log('PartnerLogin: Login successful, user:', result.data.user.email);
        
        // Даем время на загрузку ролей
        setTimeout(() => {
          toast({
            title: "Вход выполнен",
            description: "Проверяем права доступа к партнерской панели..."
          });
        }, 500);
        
        // Редирект будет обработан в useEffect после загрузки ролей
      } else {
        console.log('PartnerLogin: No user data received');
        setError('Не удалось получить данные пользователя');
      }
    } catch (error) {
      console.error('PartnerLogin: Unexpected error:', error);
      setError('Произошла неожиданная ошибка при входе');
    } finally {
      setLoading(false);
    }
  };

  // Если пользователь уже авторизован, показываем загрузку
  if (!authLoading && !roleLoading && user && isPartner) {
    return <div className="flex items-center justify-center min-h-screen">Перенаправление...</div>;
  }

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
                disabled={loading}
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
                disabled={loading}
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" disabled={loading || authLoading} className="w-full">
              <LogIn className="h-4 w-4 mr-2" />
              {loading ? 'Вход...' : 'Войти'}
            </Button>
            
            {/* Отладочная информация (можно удалить в продакшене) */}
            {process.env.NODE_ENV === 'development' && (
              <div className="text-xs text-gray-500 space-y-1">
                <div>Auth Loading: {authLoading ? 'Yes' : 'No'}</div>
                <div>Role Loading: {roleLoading ? 'Yes' : 'No'}</div>
                <div>User: {user?.email || 'None'}</div>
                <div>Is Partner: {isPartner ? 'Yes' : 'No'}</div>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PartnerLoginPage;

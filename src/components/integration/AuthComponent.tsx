
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from './useAuth';
import { useReferralTracking } from '@/hooks/useReferralTracking';
import { useReferralConversion } from '@/hooks/useReferralConversion';
import { Mail, Lock, User, Building, Phone, AlertCircle, CheckCircle } from 'lucide-react';

export const AuthComponent = () => {
  const { user, signIn, signUp, loading } = useAuth();
  const { getReferralData } = useReferralTracking();
  const { recordConversion } = useReferralConversion();
  const [activeTab, setActiveTab] = useState('signin');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    companyName: '',
    phone: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Clear messages when switching tabs
  useEffect(() => {
    setError(null);
    setSuccess(null);
  }, [activeTab]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      console.log('Attempting sign in for:', formData.email);
      const result = await signIn(formData.email, formData.password);
      if (result.error) {
        console.error('Sign in error:', result.error);
        setError(result.error.message);
      } else {
        console.log('Sign in successful');
        setSuccess('Вход выполнен успешно!');
      }
    } catch (err) {
      console.error('Sign in exception:', err);
      setError('Произошла ошибка при входе');
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    console.log('Starting registration process');

    // Get referral data for user metadata
    const referralData = getReferralData();
    console.log('Referral data for registration:', referralData);
    
    const userData = {
      data: {
        full_name: formData.fullName,
        company_name: formData.companyName,
        phone: formData.phone,
        // Add referral data to user metadata
        referral_source: referralData?.partner_code || null,
        utm_source: referralData?.utm_source || null,
        utm_medium: referralData?.utm_medium || null,
        utm_campaign: referralData?.utm_campaign || null,
        utm_content: referralData?.utm_content || null,
        utm_term: referralData?.utm_term || null,
      }
    };

    console.log('User data for registration:', userData);

    try {
      const result = await signUp(formData.email, formData.password, userData);
      
      if (result.error) {
        console.error('Registration error:', result.error);
        setError(result.error.message);
      } else {
        console.log('Registration successful:', result.data);
        setSuccess('Регистрация прошла успешно! Проверьте почту для подтверждения.');
        
        // Record registration conversion if referral data exists
        if (referralData && result.data?.user?.id) {
          console.log('Recording registration conversion for user:', result.data.user.id);
          try {
            await recordConversion(result.data.user.id, 'registration');
            console.log('Registration conversion recorded successfully');
          } catch (conversionError) {
            console.error('Error recording registration conversion:', conversionError);
            // Don't fail the registration if conversion recording fails
          }
        } else {
          console.log('No referral data or user ID for conversion recording');
        }
        
        // Clear form
        setFormData({
          email: '',
          password: '',
          fullName: '',
          companyName: '',
          phone: ''
        });
      }
    } catch (err) {
      console.error('Registration exception:', err);
      setError('Произошла ошибка при регистрации');
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (user) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Добро пожаловать!</h2>
        <p className="text-gray-600">Вы успешно авторизованы.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Вход</TabsTrigger>
          <TabsTrigger value="signup">Регистрация</TabsTrigger>
        </TabsList>

        <TabsContent value="signin">
          <Card>
            <CardHeader>
              <CardTitle>Войти в систему</CardTitle>
              <CardDescription>
                Введите свои учетные данные для входа
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signin-password">Пароль</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="signin-password"
                      type="password"
                      placeholder="Ваш пароль"
                      value={formData.password}
                      onChange={(e) => updateFormData('password', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Вход...' : 'Войти'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Создать аккаунт</CardTitle>
              <CardDescription>
                Заполните форму для регистрации
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-fullname">Полное имя</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="signup-fullname"
                      type="text"
                      placeholder="Иван Иванов"
                      value={formData.fullName}
                      onChange={(e) => updateFormData('fullName', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-company">Компания</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="signup-company"
                      type="text"
                      placeholder="Название компании"
                      value={formData.companyName}
                      onChange={(e) => updateFormData('companyName', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-phone">Телефон</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="signup-phone"
                      type="tel"
                      placeholder="+7 (700) 123-45-67"
                      value={formData.phone}
                      onChange={(e) => updateFormData('phone', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Пароль</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Минимум 6 символов"
                      value={formData.password}
                      onChange={(e) => updateFormData('password', e.target.value)}
                      className="pl-10"
                      minLength={6}
                      required
                    />
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Регистрация...' : 'Зарегистрироваться'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthComponent;

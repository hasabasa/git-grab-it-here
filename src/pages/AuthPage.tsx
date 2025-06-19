
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "@/components/integration/useAuth";
import { ArrowLeft, Mail, Lock, User, Building, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signUp, enterDemoMode } = useAuth();
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    companyName: ''
  });

  const from = location.state?.from?.pathname || '/dashboard';

  const formatPhoneNumber = (phone: string) => {
    // Remove all non-digits
    const cleaned = phone.replace(/\D/g, '');
    
    // Add +7 if starts with 7 or 8, or if empty
    if (cleaned.startsWith('8')) {
      return '+7' + cleaned.substring(1);
    } else if (cleaned.startsWith('7')) {
      return '+' + cleaned;
    } else if (cleaned.length > 0) {
      return '+7' + cleaned;
    }
    return '+7';
  };

  const validatePhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        if (formData.password !== formData.confirmPassword) {
          toast.error('Пароли не совпадают');
          return;
        }
        
        if (formData.password.length < 6) {
          toast.error('Пароль должен содержать минимум 6 символов');
          return;
        }

        if (!validatePhone(formData.phone)) {
          toast.error('Введите корректный номер телефона');
          return;
        }

        if (!formData.fullName.trim()) {
          toast.error('Введите ваше полное имя');
          return;
        }

        const formattedPhone = formatPhoneNumber(formData.phone);
        
        const userData = {
          fullName: formData.fullName,
          companyName: formData.companyName,
          phone: formattedPhone
        };

        await signUp(formData.email, formData.password, userData);
        toast.success('Регистрация успешна! Проверьте email для подтверждения.');
      } else {
        await signIn(formData.email, formData.password);
        toast.success('Добро пожаловать!');
        navigate(from, { replace: true });
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast.error(error.message || 'Ошибка аутентификации');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoMode = async () => {
    setLoading(true);
    try {
      await enterDemoMode();
      toast.success('Демо режим активирован');
      navigate('/dashboard', { replace: true });
    } catch (error) {
      toast.error('Ошибка активации демо режима');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="h-4 w-4" />
            На главную
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            {isSignUp ? 'Регистрация' : 'Вход'}
          </h1>
          <p className="text-gray-600 mt-2">
            {isSignUp 
              ? 'Создайте аккаунт для доступа к платформе' 
              : 'Войдите в свой аккаунт'}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              {isSignUp ? 'Создать аккаунт' : 'Вход в систему'}
            </CardTitle>
            <CardDescription className="text-center">
              {isSignUp 
                ? 'Заполните форму для регистрации' 
                : 'Введите данные для входа'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Полное имя *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="fullName"
                        placeholder="Введите ваше полное имя"
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Название компании</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="companyName"
                        placeholder="Введите название компании (необязательно)"
                        value={formData.companyName}
                        onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Номер телефона *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+7 (xxx) xxx-xx-xx"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        required
                        className="pl-10"
                      />
                    </div>
                  </div>
                </>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Введите пароль"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                    className="pl-10"
                  />
                </div>
              </div>

              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Повторите пароль</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Повторите пароль"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      required
                      className="pl-10"
                    />
                  </div>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading}
              >
                {loading ? 'Загрузка...' : (isSignUp ? 'Создать аккаунт' : 'Войти')}
              </Button>
            </form>

            <div className="mt-4 text-center space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">или</span>
                </div>
              </div>

              <Button 
                onClick={handleDemoMode}
                variant="outline" 
                className="w-full"
                disabled={loading}
              >
                Попробовать демо режим
              </Button>

              <Button
                onClick={() => setIsSignUp(!isSignUp)}
                variant="link"
                className="w-full"
              >
                {isSignUp 
                  ? 'Уже есть аккаунт? Войти' 
                  : 'Нет аккаунта? Зарегистрироваться'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;

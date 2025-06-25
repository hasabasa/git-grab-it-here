
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Lock, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const checkTokenAndSetSession = async () => {
      try {
        // Проверяем наличие токенов в URL
        const accessToken = searchParams.get('access_token');
        const refreshToken = searchParams.get('refresh_token');
        const type = searchParams.get('type');
        
        console.log('Reset password URL params:', {
          hasAccessToken: !!accessToken,
          hasRefreshToken: !!refreshToken,
          type,
          allParams: Object.fromEntries(searchParams.entries())
        });

        if (!accessToken || !refreshToken) {
          console.error('Missing required tokens in URL');
          toast.error('Недействительная ссылка для сброса пароля. Отсутствуют необходимые токены.');
          navigate('/auth');
          return;
        }

        if (type !== 'recovery') {
          console.error('Invalid token type:', type);
          toast.error('Недействительный тип ссылки для сброса пароля.');
          navigate('/auth');
          return;
        }

        // Устанавливаем сессию с токенами из URL
        const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken
        });

        if (sessionError) {
          console.error('Error setting session:', sessionError);
          toast.error('Ошибка при установке сессии: ' + sessionError.message);
          navigate('/auth');
          return;
        }

        if (!sessionData.session) {
          console.error('No session returned after setting tokens');
          toast.error('Не удалось создать сессию для сброса пароля');
          navigate('/auth');
          return;
        }

        console.log('Session set successfully:', sessionData.session.user.email);
        setIsValidToken(true);
        
      } catch (error: any) {
        console.error('Unexpected error during token validation:', error);
        toast.error('Произошла ошибка при проверке ссылки сброса пароля');
        navigate('/auth');
      } finally {
        setIsCheckingToken(false);
      }
    };

    checkTokenAndSetSession();
  }, [searchParams, navigate]);

  const validatePasswords = () => {
    if (!newPassword || !confirmPassword) {
      toast.error('Заполните все поля');
      return false;
    }
    
    if (newPassword.length < 6) {
      toast.error('Пароль должен содержать минимум 6 символов');
      return false;
    }
    
    if (newPassword !== confirmPassword) {
      toast.error('Пароли не совпадают');
      return false;
    }
    
    return true;
  };

  const handleResetPassword = async () => {
    if (!validatePasswords()) return;
    
    setIsLoading(true);
    
    try {
      console.log('Attempting to update password...');
      
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) {
        console.error('Password update error:', error);
        throw error;
      }
      
      console.log('Password updated successfully:', data);
      toast.success('Пароль успешно изменен! Вы можете войти с новым паролем.');
      
      // Выходим из системы и перенаправляем на страницу входа
      await supabase.auth.signOut();
      
      setTimeout(() => {
        navigate('/auth');
      }, 2000);
      
    } catch (error: any) {
      console.error('Error resetting password:', error);
      toast.error(error.message || 'Ошибка при смене пароля');
    } finally {
      setIsLoading(false);
    }
  };

  // Показываем загрузку пока проверяем токен
  if (isCheckingToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Проверка ссылки...</CardTitle>
            <CardDescription className="text-center">
              Пожалуйста, подождите
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  // Показываем ошибку если токен недействителен
  if (!isValidToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Недействительная ссылка</CardTitle>
            <CardDescription className="text-center">
              Ссылка для сброса пароля недействительна или истекла
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              onClick={() => navigate('/auth')}
              className="w-full"
            >
              Вернуться к входу
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-center justify-center">
            <Lock className="h-5 w-5" />
            Сброс пароля
          </CardTitle>
          <CardDescription className="text-center">
            Введите новый пароль для вашего аккаунта
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="newPassword">Новый пароль</Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Введите новый пароль (минимум 6 символов)"
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Повторите пароль</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Повторите новый пароль"
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <Button 
            onClick={handleResetPassword} 
            disabled={isLoading} 
            className="w-full"
          >
            {isLoading ? 'Изменение пароля...' : 'Сменить пароль'}
          </Button>
          
          <div className="text-center">
            <Button
              variant="link"
              onClick={() => navigate('/auth')}
              className="text-sm text-gray-600"
            >
              Вернуться к входу
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;

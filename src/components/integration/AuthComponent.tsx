
import { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const AuthComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Проверяем текущую сессию пользователя
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      
      if (data.session) {
        setUser(data.session.user);
      }
      
      // Устанавливаем слушатель событий аутентификации
      const { data: authListener } = supabase.auth.onAuthStateChange(
        (event, session) => {
          if (session) {
            setUser(session.user);
          } else {
            setUser(null);
          }
        }
      );

      return () => {
        authListener.subscription.unsubscribe();
      };
    };

    checkSession();
  }, []);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      
      toast.success('Проверьте почту для подтверждения аккаунта');
    } catch (error: any) {
      toast.error(error.message || 'Ошибка при регистрации');
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      toast.success('Вход выполнен успешно');
    } catch (error: any) {
      toast.error(error.message || 'Ошибка входа');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success('Вы вышли из системы');
    } catch (error: any) {
      toast.error(error.message || 'Ошибка при выходе');
    }
  };

  if (user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Вы авторизованы</CardTitle>
          <CardDescription>Вы вошли как: {user.email}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={handleSignOut}>Выйти</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Вход / Регистрация</CardTitle>
        <CardDescription>
          Войдите или создайте аккаунт для использования всех возможностей приложения
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          onClick={handleSignUp} 
          variant="outline" 
          disabled={loading}
        >
          Регистрация
        </Button>
        <Button 
          onClick={handleSignIn}
          disabled={loading}
        >
          Вход
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AuthComponent;

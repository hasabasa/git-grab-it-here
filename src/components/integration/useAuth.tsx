
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Проверяем текущую сессию пользователя
    const getSession = async () => {
      setLoading(true);
      try {
        const { data } = await supabase.auth.getSession();
        setUser(data?.session?.user || null);
      } catch (error) {
        console.error('Error checking session:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    getSession();

    // Устанавливаем слушатель событий аутентификации
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return { 
    user, 
    signUp, 
    signIn, 
    signOut,
    loading,
    isSupabaseConfigured: true 
  };
};

export default useAuth;

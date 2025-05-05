
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from '@supabase/supabase-js';

export const useAuth = () => {
  // Создаем демо-пользователя по умолчанию
  const demoUser = {
    id: 'demo-user',
    email: 'demo@kaspi-price.kz',
    user_metadata: {
      name: 'Демо пользователь'
    },
    app_metadata: {
      role: 'demo'
    }
  } as User;

  const [user, setUser] = useState<User | null>(demoUser); // По умолчанию используем демо-пользователя
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false); // Убираем начальную загрузку
  const [isDemo, setIsDemo] = useState(true); // Флаг демо-режима

  useEffect(() => {
    // Set up auth listener first
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event);
        
        // Если пользователь авторизован, используем данные из сессии
        if (session?.user) {
          setSession(session);
          setUser(session.user);
          setIsDemo(false);
        } else {
          // В противном случае используем демо-пользователя
          setSession(null);
          setUser(demoUser);
          setIsDemo(true);
        }
        
        setLoading(false);
      }
    );

    // Then check current session
    const getSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        
        if (data?.session?.user) {
          setSession(data.session);
          setUser(data.session.user);
          setIsDemo(false);
        } else {
          // Если сессии нет, используем демо-пользователя
          setSession(null);
          setUser(demoUser);
          setIsDemo(true);
        }
      } catch (error) {
        console.error('Error checking session:', error);
        // В случае ошибки также используем демо-пользователя
        setUser(demoUser);
        setIsDemo(true);
      } finally {
        setLoading(false);
      }
    };
    
    getSession();

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
    
    // Возвращаемся к демо-пользователю после выхода
    setUser(demoUser);
    setIsDemo(true);
  };

  return { 
    user, 
    session,
    signUp, 
    signIn, 
    signOut,
    loading,
    isDemo, // Экспортируем флаг демо-режима
    isSupabaseConfigured: true 
  };
};

export default useAuth;

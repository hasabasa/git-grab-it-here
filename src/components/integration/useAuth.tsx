
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from '@supabase/supabase-js';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    // Set up auth listener first
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event);
        
        if (session?.user) {
          setSession(session);
          setUser(session.user);
          setIsDemo(false);
        } else {
          setSession(null);
          setUser(null);
          setIsDemo(false);
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
          setSession(null);
          setUser(null);
          setIsDemo(false);
        }
      } catch (error) {
        console.error('Error checking session:', error);
        setUser(null);
        setIsDemo(false);
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
  };

  return { 
    user, 
    session,
    signUp, 
    signIn, 
    signOut,
    loading,
    isDemo,
    isSupabaseConfigured: true 
  };
};

export default useAuth;

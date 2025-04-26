
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Check for environment variables and provide fallback values or handle missing values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create client only if we have the required values
const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isSupabaseConfigured, setIsSupabaseConfigured] = useState(Boolean(supabase));

  useEffect(() => {
    // Only proceed if Supabase is configured
    if (!supabase) {
      console.error('Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
      return;
    }

    // Correctly handle the Promise returned by getSession
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data?.session?.user || null);
    };
    
    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // All auth methods should check if Supabase is configured
  const signUp = async (email: string, password: string) => {
    if (!supabase) {
      throw new Error('Supabase is not configured');
    }
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  };

  const signIn = async (email: string, password: string) => {
    if (!supabase) {
      throw new Error('Supabase is not configured');
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signOut = async () => {
    if (!supabase) {
      throw new Error('Supabase is not configured');
    }
    await supabase.auth.signOut();
  };

  return { 
    user, 
    signUp, 
    signIn, 
    signOut,
    isSupabaseConfigured 
  };
};

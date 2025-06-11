
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from '@supabase/supabase-js';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    console.log("useAuth: Initializing auth state");
    
    // Check if demo mode is set in localStorage first
    const demoMode = localStorage.getItem('kaspi-demo-mode');
    console.log("Demo mode from localStorage:", demoMode);
    
    if (demoMode === 'true') {
      console.log("Demo mode detected - setting demo state immediately");
      setIsDemo(true);
      setUser(null);
      setSession(null);
      setLoading(false);
      return;
    }

    // Set up auth listener only if not in demo mode
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session?.user?.email);
        
        if (session?.user) {
          setSession(session);
          setUser(session.user);
          setIsDemo(false);
          localStorage.removeItem('kaspi-demo-mode');
        } else {
          setSession(null);
          setUser(null);
          // Only reset isDemo if we're not in demo mode
          if (localStorage.getItem('kaspi-demo-mode') !== 'true') {
            setIsDemo(false);
          }
        }
        
        setLoading(false);
      }
    );

    // Check current session only if not in demo mode
    const getSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        
        if (data?.session?.user) {
          setSession(data.session);
          setUser(data.session.user);
          setIsDemo(false);
          localStorage.removeItem('kaspi-demo-mode');
        } else {
          setSession(null);
          setUser(null);
          // Only reset isDemo if we're not in demo mode
          if (localStorage.getItem('kaspi-demo-mode') !== 'true') {
            setIsDemo(false);
          }
        }
      } catch (error) {
        console.error('Error checking session:', error);
        setUser(null);
        if (localStorage.getItem('kaspi-demo-mode') !== 'true') {
          setIsDemo(false);
        }
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
    console.log("Signing out and clearing demo mode");
    localStorage.removeItem('kaspi-demo-mode');
    setIsDemo(false);
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const enterDemoMode = () => {
    console.log("Entering demo mode - setting localStorage and state immediately");
    localStorage.setItem('kaspi-demo-mode', 'true');
    setIsDemo(true);
    setUser(null);
    setSession(null);
    setLoading(false);
    console.log("Demo mode state set: isDemo=true, loading=false");
  };

  const exitDemoMode = () => {
    console.log("Exiting demo mode");
    localStorage.removeItem('kaspi-demo-mode');
    setIsDemo(false);
  };

  return { 
    user, 
    session,
    signUp, 
    signIn, 
    signOut,
    loading,
    isDemo,
    enterDemoMode,
    exitDemoMode,
    isSupabaseConfigured: true 
  };
};

export default useAuth;

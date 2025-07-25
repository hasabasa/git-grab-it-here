
import { useState, useEffect, useRef } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from '@supabase/supabase-js';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);
  const isInitialized = useRef(false);

  useEffect(() => {
    // Prevent double initialization
    if (isInitialized.current) {
      console.log("useAuth: Already initialized, skipping");
      return;
    }

    console.log("useAuth: Starting initialization");
    isInitialized.current = true;
    
    // Check demo mode from localStorage immediately
    const checkDemoMode = () => {
      const demoMode = localStorage.getItem('kaspi-demo-mode');
      console.log("useAuth: Checking demo mode from localStorage:", demoMode);
      
      if (demoMode === 'true') {
        console.log("useAuth: Demo mode detected - setting state immediately");
        setIsDemo(true);
        setUser(null);
        setSession(null);
        setLoading(false);
        return true;
      }
      return false;
    };

    // If demo mode is active, don't set up auth listeners
    if (checkDemoMode()) {
      return;
    }

    // Set up auth state listener only if not in demo mode
    console.log("useAuth: Setting up auth listeners");
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("useAuth: Auth state changed:", event, session?.user?.email);
        
        // Don't process auth changes if we're in demo mode
        if (localStorage.getItem('kaspi-demo-mode') === 'true') {
          console.log("useAuth: Ignoring auth change - demo mode active");
          return;
        }
        
        if (session?.user) {
          setSession(session);
          setUser(session.user);
          setIsDemo(false);
          localStorage.removeItem('kaspi-demo-mode');
        } else {
          setSession(null);
          setUser(null);
          setIsDemo(false);
        }
        
        setLoading(false);
      }
    );

    // Check current session only if not in demo mode
    const getSession = async () => {
      try {
        // Double check demo mode before making auth calls
        if (localStorage.getItem('kaspi-demo-mode') === 'true') {
          console.log("useAuth: Demo mode active, skipping session check");
          return;
        }

        const { data } = await supabase.auth.getSession();
        
        if (data?.session?.user) {
          setSession(data.session);
          setUser(data.session.user);
          setIsDemo(false);
          localStorage.removeItem('kaspi-demo-mode');
        } else {
          setSession(null);
          setUser(null);
          setIsDemo(false);
        }
      } catch (error) {
        console.error('useAuth: Error checking session:', error);
        setUser(null);
        setSession(null);
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

  const signUp = async (email: string, password: string, options?: any) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: options?.data || {}
      }
    });
    
    return { data, error };
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    return { data, error };
  };

  const signOut = async () => {
    console.log("useAuth: Starting sign out process");
    
    try {
      // Clear demo mode first
      localStorage.removeItem('kaspi-demo-mode');
      setIsDemo(false);
      
      // Clear auth state immediately
      setUser(null);
      setSession(null);
      
      // Then call Supabase signOut
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("useAuth: Error during sign out:", error);
        throw error;
      }
      
      console.log("useAuth: Sign out completed successfully");
    } catch (error) {
      console.error("useAuth: Sign out failed:", error);
      throw error;
    }
  };

  const enterDemoMode = () => {
    console.log("useAuth: Entering demo mode - immediate state update");
    
    localStorage.setItem('kaspi-demo-mode', 'true');
    
    setIsDemo(true);
    setUser(null);
    setSession(null);
    setLoading(false);
    
    console.log("useAuth: Demo mode state updated - isDemo: true, loading: false");
    
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log("useAuth: Demo mode setup complete");
        resolve();
      }, 10);
    });
  };

  const exitDemoMode = () => {
    console.log("useAuth: Exiting demo mode");
    localStorage.removeItem('kaspi-demo-mode');
    setIsDemo(false);
  };

  const isDemoActive = () => {
    return isDemo || localStorage.getItem('kaspi-demo-mode') === 'true';
  };

  return { 
    user, 
    session,
    signUp, 
    signIn, 
    signOut,
    loading,
    isDemo: isDemoActive(),
    enterDemoMode,
    exitDemoMode,
    isSupabaseConfigured: true 
  };
};

export default useAuth;


import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/integration/useAuth';

interface UserProfile {
  id: string;
  full_name: string | null;
  company_name: string | null;
  phone: string | null;
  phone_verified: boolean | null;
  created_at: string;
  updated_at: string;
}

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadProfile();
    } else {
      setProfile(null);
      setLoading(false);
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();
      
      if (error) throw error;
      
      setProfile(data);
      return { success: true, data };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { success: false, error };
    }
  };

  return {
    profile,
    loading,
    updateProfile,
    refetchProfile: loadProfile
  };
};

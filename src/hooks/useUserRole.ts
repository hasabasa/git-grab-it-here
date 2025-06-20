
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/integration/useAuth';

export const useUserRole = () => {
  const { user } = useAuth();
  const [roles, setRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadUserRoles();
    } else {
      setRoles([]);
      setLoading(false);
    }
  }, [user]);

  const loadUserRoles = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      setRoles(data.map(r => r.role));
    } catch (error) {
      console.error('Error loading user roles:', error);
    } finally {
      setLoading(false);
    }
  };

  const hasRole = (role: string) => roles.includes(role);
  const isAdmin = hasRole('admin');
  const isPartner = hasRole('partner');

  return {
    roles,
    loading,
    hasRole,
    isAdmin,
    isPartner,
    refetchRoles: loadUserRoles
  };
};

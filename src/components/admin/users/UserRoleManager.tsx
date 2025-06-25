
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Trash2, Crown } from 'lucide-react';
import { toast } from 'sonner';

interface UserRoleManagerProps {
  userId: string;
  roles: string[];
  onRolesUpdate: () => void;
}

type UserRole = 'admin' | 'partner' | 'user';

export const UserRoleManager = ({ userId, roles, onRolesUpdate }: UserRoleManagerProps) => {
  const updateUserRole = async (role: string, action: 'add' | 'remove') => {
    try {
      const validRole = role as UserRole;
      
      if (action === 'add') {
        const { error } = await supabase
          .from('user_roles')
          .insert({ user_id: userId, role: validRole });
        
        if (error) throw error;
        toast.success(`Роль ${role} добавлена`);
      } else {
        const { error } = await supabase
          .from('user_roles')
          .delete()
          .eq('user_id', userId)
          .eq('role', validRole);
        
        if (error) throw error;
        toast.success(`Роль ${role} удалена`);
      }
      
      onRolesUpdate();
    } catch (error) {
      console.error('Error updating user role:', error);
      toast.error('Ошибка обновления роли');
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Select
          onValueChange={(role: UserRole) => updateUserRole(role, 'add')}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Добавить роль" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Администратор</SelectItem>
            <SelectItem value="partner">Партнер</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-1 flex-wrap">
        {roles.map((role) => (
          <Badge key={role} variant="secondary">
            {role === 'admin' && <Crown className="h-3 w-3 mr-1" />}
            {role}
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 ml-1"
              onClick={() => updateUserRole(role, 'remove')}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>
    </div>
  );
};

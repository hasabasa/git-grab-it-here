
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface UserProfile {
  id: string;
  full_name: string | null;
  company_name: string | null;
  phone: string | null;
}

interface UserProfileEditorProps {
  user: UserProfile | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: () => void;
}

export const UserProfileEditor = ({ user, open, onOpenChange, onUpdate }: UserProfileEditorProps) => {
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);

  const updateUserProfile = async (userId: string, updates: Partial<UserProfile>) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);

      if (error) throw error;
      
      toast.success('Профиль пользователя обновлен');
      onOpenChange(false);
      onUpdate();
    } catch (error) {
      console.error('Error updating user profile:', error);
      toast.error('Ошибка обновления профиля');
    }
  };

  if (!user || !editingUser) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактирование профиля</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="fullName">Полное имя</Label>
            <Input
              id="fullName"
              value={editingUser.full_name || ''}
              onChange={(e) => setEditingUser({
                ...editingUser,
                full_name: e.target.value
              })}
            />
          </div>
          <div>
            <Label htmlFor="companyName">Название компании</Label>
            <Input
              id="companyName"
              value={editingUser.company_name || ''}
              onChange={(e) => setEditingUser({
                ...editingUser,
                company_name: e.target.value
              })}
            />
          </div>
          <div>
            <Label htmlFor="phone">Телефон</Label>
            <Input
              id="phone"
              value={editingUser.phone || ''}
              onChange={(e) => setEditingUser({
                ...editingUser,
                phone: e.target.value
              })}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Отмена
            </Button>
            <Button
              onClick={() => updateUserProfile(editingUser.id, {
                full_name: editingUser.full_name,
                company_name: editingUser.company_name,
                phone: editingUser.phone
              })}
            >
              Сохранить
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};


import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Settings, Trash2 } from 'lucide-react';
import { UserRoleManager } from './UserRoleManager';
import { UserSubscriptionManager } from './UserSubscriptionManager';

interface UserProfile {
  id: string;
  full_name: string | null;
  company_name: string | null;
  phone: string | null;
  subscription_end_date: string | null;
  bonus_days: number | null;
  created_at: string;
  roles: string[];
}

interface UserActionsCellProps {
  user: UserProfile;
  deletingUser: string | null;
  onUserSelect: (user: UserProfile) => void;
  onEditUser: (user: UserProfile) => void;
  onDeleteUser: (userId: string) => void;
  onUpdate: () => void;
}

export const UserActionsCell = ({ 
  user, 
  deletingUser, 
  onUserSelect, 
  onEditUser, 
  onDeleteUser,
  onUpdate 
}: UserActionsCellProps) => {
  return (
    <div className="flex gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onUserSelect(user)}
          >
            <Settings className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Управление пользователем</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Роли</h4>
              <UserRoleManager
                userId={user.id}
                roles={user.roles}
                onRolesUpdate={onUpdate}
              />
            </div>

            <div>
              <h4 className="font-medium mb-2">Подписка</h4>
              <UserSubscriptionManager
                user={user}
                onUpdate={onUpdate}
              />
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => onEditUser(user)}
            >
              Редактировать профиль
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="destructive"
            size="sm"
            disabled={deletingUser === user.id}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить пользователя?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить. Пользователь "{user.full_name || user.id}" 
              и все связанные с ним данные будут удалены навсегда.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => onDeleteUser(user.id)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

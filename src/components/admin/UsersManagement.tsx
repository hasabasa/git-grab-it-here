
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { User, Settings, Crown, Calendar, Trash2 } from 'lucide-react';

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

const UsersManagement = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      // Загружаем профили пользователей
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Загружаем роли для каждого пользователя
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) throw rolesError;

      // Объединяем данные
      const usersWithRoles = profiles?.map(profile => ({
        ...profile,
        roles: userRoles?.filter(role => role.user_id === profile.id).map(role => role.role) || []
      })) || [];

      setUsers(usersWithRoles);
    } catch (error) {
      console.error('Error loading users:', error);
      toast.error('Ошибка загрузки пользователей');
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, role: string, action: 'add' | 'remove') => {
    try {
      if (action === 'add') {
        const { error } = await supabase
          .from('user_roles')
          .insert({ user_id: userId, role });
        
        if (error) throw error;
        toast.success(`Роль ${role} добавлена`);
      } else {
        const { error } = await supabase
          .from('user_roles')
          .delete()
          .eq('user_id', userId)
          .eq('role', role);
        
        if (error) throw error;
        toast.success(`Роль ${role} удалена`);
      }
      
      loadUsers();
    } catch (error) {
      console.error('Error updating user role:', error);
      toast.error('Ошибка обновления роли');
    }
  };

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
      setEditingUser(null);
      loadUsers();
    } catch (error) {
      console.error('Error updating user profile:', error);
      toast.error('Ошибка обновления профиля');
    }
  };

  const extendSubscription = async (userId: string, days: number) => {
    try {
      const user = users.find(u => u.id === userId);
      if (!user) return;

      let newEndDate: Date;
      if (user.subscription_end_date && new Date(user.subscription_end_date) > new Date()) {
        // Если подписка активна, продлеваем от текущей даты окончания
        newEndDate = new Date(user.subscription_end_date);
      } else {
        // Если подписка истекла, начинаем от сегодня
        newEndDate = new Date();
      }
      
      newEndDate.setDate(newEndDate.getDate() + days);

      const { error } = await supabase
        .from('profiles')
        .update({
          subscription_end_date: newEndDate.toISOString(),
          bonus_days: (user.bonus_days || 0) + days,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);

      if (error) throw error;
      
      toast.success(`Подписка продлена на ${days} дней`);
      loadUsers();
    } catch (error) {
      console.error('Error extending subscription:', error);
      toast.error('Ошибка продления подписки');
    }
  };

  const filteredUsers = users.filter(user =>
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone?.includes(searchTerm)
  );

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Не установлено';
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  const isSubscriptionActive = (endDate: string | null) => {
    if (!endDate) return false;
    return new Date(endDate) > new Date();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Управление пользователями
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <Input
              placeholder="Поиск по имени, компании или телефону..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
            <Badge variant="secondary">
              Всего пользователей: {users.length}
            </Badge>
          </div>

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Имя</TableHead>
                  <TableHead>Компания</TableHead>
                  <TableHead>Телефон</TableHead>
                  <TableHead>Роли</TableHead>
                  <TableHead>Подписка</TableHead>
                  <TableHead>Дата регистрации</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      {user.full_name || 'Не указано'}
                    </TableCell>
                    <TableCell>{user.company_name || '-'}</TableCell>
                    <TableCell>{user.phone || '-'}</TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {user.roles.map((role) => (
                          <Badge key={role} variant={role === 'admin' ? 'destructive' : 'secondary'}>
                            {role === 'admin' && <Crown className="h-3 w-3 mr-1" />}
                            {role}
                          </Badge>
                        ))}
                        {user.roles.length === 0 && (
                          <Badge variant="outline">user</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Badge 
                          variant={isSubscriptionActive(user.subscription_end_date) ? 'default' : 'destructive'}
                        >
                          {isSubscriptionActive(user.subscription_end_date) ? 'Активна' : 'Истекла'}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          до {formatDate(user.subscription_end_date)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {formatDate(user.created_at)}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedUser(user)}
                            >
                              <Settings className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Управление пользователем</DialogTitle>
                            </DialogHeader>
                            {selectedUser && (
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-medium mb-2">Роли</h4>
                                  <div className="space-y-2">
                                    <div className="flex gap-2">
                                      <Select
                                        onValueChange={(role) => updateUserRole(selectedUser.id, role, 'add')}
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
                                      {selectedUser.roles.map((role) => (
                                        <Badge key={role} variant="secondary">
                                          {role}
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-4 w-4 p-0 ml-1"
                                            onClick={() => updateUserRole(selectedUser.id, role, 'remove')}
                                          >
                                            <Trash2 className="h-3 w-3" />
                                          </Button>
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-medium mb-2">Подписка</h4>
                                  <div className="flex gap-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => extendSubscription(selectedUser.id, 7)}
                                    >
                                      +7 дней
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => extendSubscription(selectedUser.id, 30)}
                                    >
                                      +30 дней
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => extendSubscription(selectedUser.id, 365)}
                                    >
                                      +1 год
                                    </Button>
                                  </div>
                                </div>

                                <Button
                                  variant="outline"
                                  className="w-full"
                                  onClick={() => {
                                    setEditingUser(selectedUser);
                                    setSelectedUser(null);
                                  }}
                                >
                                  Редактировать профиль
                                </Button>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Диалог редактирования профиля */}
      <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Редактирование профиля</DialogTitle>
          </DialogHeader>
          {editingUser && (
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
                  onClick={() => setEditingUser(null)}
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
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersManagement;

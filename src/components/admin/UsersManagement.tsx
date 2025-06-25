
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { User, RefreshCw, Calendar, Crown } from 'lucide-react';
import { UserActionsCell } from './users/UserActionsCell';
import { UserProfileEditor } from './users/UserProfileEditor';
import { useUsersManagement } from '@/hooks/useUsersManagement';

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
  const { users, loading, refreshing, loadUsers, deleteUser } = useUsersManagement();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
  const [deletingUser, setDeletingUser] = useState<string | null>(null);

  const handleRefresh = () => {
    console.log('Manual refresh triggered');
    loadUsers();
  };

  const handleDeleteUser = async (userId: string) => {
    setDeletingUser(userId);
    await deleteUser(userId);
    setDeletingUser(null);
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
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                Обновить
              </Button>
              <Badge variant="secondary">
                Всего пользователей: {users.length}
              </Badge>
            </div>
          </div>

          {users.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Пользователи не найдены</p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefresh}
                className="mt-2"
              >
                Обновить список
              </Button>
            </div>
          ) : (
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
                        <UserActionsCell
                          user={user}
                          deletingUser={deletingUser}
                          onUserSelect={setSelectedUser}
                          onEditUser={setEditingUser}
                          onDeleteUser={handleDeleteUser}
                          onUpdate={loadUsers}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <UserProfileEditor
        user={editingUser}
        open={!!editingUser}
        onOpenChange={(open) => !open && setEditingUser(null)}
        onUpdate={loadUsers}
      />
    </div>
  );
};

export default UsersManagement;

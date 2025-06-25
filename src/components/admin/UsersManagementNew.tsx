
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
import { User, RefreshCw, Calendar, Plus } from 'lucide-react';

interface AuthUser {
  id: string;
  email: string;
  created_at: string;
  expires_at?: string;
  days_remaining?: number;
}

const UsersManagementNew = () => {
  const [users, setUsers] = useState<AuthUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [extendingUser, setExtendingUser] = useState<string | null>(null);

  useEffect(() => {
    loadUsers();
    
    // Автоматическое обновление каждые 30 секунд
    const interval = setInterval(() => {
      loadUsers(true);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const loadUsers = async (silent = false) => {
    try {
      if (!silent) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }

      console.log('Loading auth users...');
      
      // Получаем пользователей из auth.users через admin API
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) {
        console.error('Error loading auth users:', authError);
        throw authError;
      }

      console.log('Loaded auth users:', authUsers.users.length);

      // Получаем данные о подписках
      const { data: subscriptions, error: subsError } = await supabase
        .from('subscriptions')
        .select('user_id, expires_at');

      if (subsError) {
        console.error('Error loading subscriptions:', subsError);
        throw subsError;
      }

      console.log('Loaded subscriptions:', subscriptions?.length);

      // Объединяем данные
      const usersWithSubscriptions = authUsers.users.map(user => {
        const subscription = subscriptions?.find(sub => sub.user_id === user.id);
        let daysRemaining = 0;
        
        if (subscription?.expires_at) {
          const expiresAt = new Date(subscription.expires_at);
          const now = new Date();
          const diffTime = expiresAt.getTime() - now.getTime();
          daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        }

        return {
          id: user.id,
          email: user.email || 'Не указан',
          created_at: user.created_at,
          expires_at: subscription?.expires_at,
          days_remaining: daysRemaining
        };
      });

      console.log('Users with subscriptions:', usersWithSubscriptions.length);
      setUsers(usersWithSubscriptions);
      
      if (!silent) {
        toast.success(`Загружено ${usersWithSubscriptions.length} пользователей`);
      }
    } catch (error) {
      console.error('Error loading users:', error);
      toast.error('Ошибка загрузки пользователей: ' + (error as Error).message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    console.log('Manual refresh triggered');
    loadUsers();
  };

  const extendSubscription = async (userId: string, days: number) => {
    setExtendingUser(userId);
    try {
      const user = users.find(u => u.id === userId);
      if (!user) return;

      let newExpiresAt: Date;
      
      if (user.expires_at && new Date(user.expires_at) > new Date()) {
        // Если подписка активна, продлеваем от текущей даты окончания
        newExpiresAt = new Date(user.expires_at);
      } else {
        // Если подписка истекла, начинаем от сегодня
        newExpiresAt = new Date();
      }
      
      newExpiresAt.setDate(newExpiresAt.getDate() + days);

      // Обновляем или создаем запись в subscriptions
      const { error } = await supabase
        .from('subscriptions')
        .upsert({
          user_id: userId,
          expires_at: newExpiresAt.toISOString(),
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      
      toast.success(`Подписка продлена на ${days} дней`);
      loadUsers();
    } catch (error) {
      console.error('Error extending subscription:', error);
      toast.error('Ошибка продления подписки');
    } finally {
      setExtendingUser(null);
    }
  };

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id.includes(searchTerm)
  );

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'Не установлено';
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  const isSubscriptionActive = (daysRemaining: number) => {
    return daysRemaining > 0;
  };

  const getSubscriptionBadge = (daysRemaining: number) => {
    if (daysRemaining > 7) {
      return <Badge variant="default">Активна ({daysRemaining} дн.)</Badge>;
    } else if (daysRemaining > 0) {
      return <Badge variant="secondary">Истекает ({daysRemaining} дн.)</Badge>;
    } else {
      return <Badge variant="destructive">Истекла</Badge>;
    }
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
              placeholder="Поиск по email или user ID..."
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
                    <TableHead>Email</TableHead>
                    <TableHead>User ID</TableHead>
                    <TableHead>Дата регистрации</TableHead>
                    <TableHead>Статус подписки</TableHead>
                    <TableHead>Продление подписки</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        {user.email}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {user.id}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {formatDate(user.created_at)}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getSubscriptionBadge(user.days_remaining || 0)}
                        {user.expires_at && (
                          <div className="text-sm text-muted-foreground mt-1">
                            до {formatDate(user.expires_at)}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1 flex-wrap">
                          {[3, 5, 7, 10, 15, 20, 30, 365].map((days) => (
                            <Button
                              key={days}
                              variant="outline"
                              size="sm"
                              onClick={() => extendSubscription(user.id, days)}
                              disabled={extendingUser === user.id}
                              className="text-xs"
                            >
                              <Plus className="h-3 w-3 mr-1" />
                              {days === 365 ? '1г' : `${days}д`}
                            </Button>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersManagementNew;

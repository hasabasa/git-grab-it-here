
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { User, RefreshCw, Calendar, Clock } from 'lucide-react';

interface UserWithSubscription {
  id: string;
  email: string;
  full_name: string | null;
  company_name: string | null;
  created_at: string;
  subscription_end_date: string | null;
  bonus_days: number | null;
  expires_at?: string;
  days_remaining?: number;
}

const USERS_PER_PAGE = 10;

const UsersManagementNew = () => {
  const [users, setUsers] = useState<UserWithSubscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [extendingUser, setExtendingUser] = useState<string | null>(null);
  const [selectedDays, setSelectedDays] = useState<{ [userId: string]: string }>({});

  useEffect(() => {
    loadUsers();
    
    // Автоматическое обновление каждые 30 секунд
    const interval = setInterval(() => {
      loadUsers(true);
    }, 30000);

    return () => clearInterval(interval);
  }, [currentPage]);

  const loadUsers = async (silent = false) => {
    try {
      if (!silent) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }

      console.log('Loading users from auth and profiles...');
      
      // Получаем общее количество пользователей для пагинации
      const { count } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      setTotalUsers(count || 0);

      // Получаем пользователей с пагинацией
      const from = (currentPage - 1) * USERS_PER_PAGE;
      const to = from + USERS_PER_PAGE - 1;

      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .range(from, to);
      
      if (profilesError) {
        console.error('Error loading profiles:', profilesError);
        throw profilesError;
      }

      console.log('Loaded profiles:', profiles?.length);

      // Получаем email из auth.users для каждого пользователя
      const usersWithEmails = await Promise.all(
        (profiles || []).map(async (profile) => {
          try {
            const { data: authUser, error: authError } = await supabase.auth.admin.getUserById(profile.id);
            
            if (authError) {
              console.error('Error getting auth user:', authError);
              return {
                ...profile,
                email: 'Не удалось получить'
              };
            }

            return {
              ...profile,
              email: authUser.user?.email || 'Не указан'
            };
          } catch (error) {
            console.error('Error fetching email for user:', profile.id, error);
            return {
              ...profile,
              email: 'Ошибка загрузки'
            };
          }
        })
      );

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
      const usersWithSubscriptions = usersWithEmails.map(profile => {
        const subscription = subscriptions?.find(sub => sub.user_id === profile.id);
        let daysRemaining = 0;
        
        // Проверяем subscription_end_date из профиля или expires_at из подписки
        const endDate = subscription?.expires_at || profile.subscription_end_date;
        
        if (endDate) {
          const expiresAt = new Date(endDate);
          const now = new Date();
          const diffTime = expiresAt.getTime() - now.getTime();
          daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        }

        return {
          ...profile,
          expires_at: endDate,
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
    setCurrentPage(1);
    loadUsers();
  };

  const extendSubscription = async (userId: string) => {
    const days = selectedDays[userId];
    if (!days) {
      toast.error('Выберите количество дней для продления');
      return;
    }

    setExtendingUser(userId);
    try {
      const user = users.find(u => u.id === userId);
      if (!user) return;

      const daysNumber = parseInt(days);
      let newExpiresAt: Date;
      
      const currentEndDate = user.expires_at || user.subscription_end_date;
      
      if (currentEndDate && new Date(currentEndDate) > new Date()) {
        // Если подписка активна, продлеваем от текущей даты окончания
        newExpiresAt = new Date(currentEndDate);
      } else {
        // Если подписка истекла, начинаем от сегодня
        newExpiresAt = new Date();
      }
      
      newExpiresAt.setDate(newExpiresAt.getDate() + daysNumber);

      // Обновляем subscription_end_date в profiles
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          subscription_end_date: newExpiresAt.toISOString(),
          bonus_days: (user.bonus_days || 0) + daysNumber,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);

      if (profileError) throw profileError;

      // Также обновляем или создаем запись в subscriptions
      const { error: subscriptionError } = await supabase
        .from('subscriptions')
        .upsert({
          user_id: userId,
          expires_at: newExpiresAt.toISOString(),
          updated_at: new Date().toISOString()
        });

      if (subscriptionError) throw subscriptionError;
      
      toast.success(`Подписка продлена на ${daysNumber} дней`);
      
      // Сбрасываем выбранное значение
      setSelectedDays(prev => ({ ...prev, [userId]: '' }));
      
      loadUsers();
    } catch (error) {
      console.error('Error extending subscription:', error);
      toast.error('Ошибка продления подписки');
    } finally {
      setExtendingUser(null);
    }
  };

  const filteredUsers = users.filter(user =>
    (user.full_name && user.full_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    user.id.includes(searchTerm) ||
    (user.company_name && user.company_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPages = Math.ceil(totalUsers / USERS_PER_PAGE);

  const formatDate = (dateString: string | undefined | null) => {
    if (!dateString) return 'Не установлено';
    return new Date(dateString).toLocaleDateString('ru-RU');
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

  const dayOptions = [
    { value: '3', label: '3 дня' },
    { value: '5', label: '5 дней' },
    { value: '7', label: '7 дней' },
    { value: '10', label: '10 дней' },
    { value: '15', label: '15 дней' },
    { value: '20', label: '20 дней' },
    { value: '30', label: '30 дней' },
    { value: '365', label: '1 год' },
  ];

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
              placeholder="Поиск по имени, email, компании или user ID..."
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
                Всего пользователей: {totalUsers}
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
            <>
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Имя / Компания</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Дата регистрации</TableHead>
                      <TableHead>Статус подписки</TableHead>
                      <TableHead>Продление подписки</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          <div>
                            <div>{user.full_name || 'Не указано'}</div>
                            {user.company_name && (
                              <div className="text-sm text-muted-foreground">
                                {user.company_name}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {user.email}
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
                          <div className="flex gap-2 items-center">
                            <Select
                              value={selectedDays[user.id] || ''}
                              onValueChange={(value) => 
                                setSelectedDays(prev => ({ ...prev, [user.id]: value }))
                              }
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue placeholder="Выберите" />
                              </SelectTrigger>
                              <SelectContent>
                                {dayOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => extendSubscription(user.id)}
                              disabled={extendingUser === user.id || !selectedDays[user.id]}
                              className="flex items-center gap-1"
                            >
                              {extendingUser === user.id ? (
                                <div className="animate-spin rounded-full h-3 w-3 border-b border-current" />
                              ) : (
                                <Clock className="h-3 w-3" />
                              )}
                              Продлить
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {totalPages > 1 && (
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                    
                    {[...Array(totalPages)].map((_, index) => {
                      const page = index + 1;
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => setCurrentPage(page)}
                            isActive={currentPage === page}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersManagementNew;

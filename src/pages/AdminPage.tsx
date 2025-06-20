
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Crown, Users, BarChart3, Settings, Database, Shield } from "lucide-react";
// Fix imports - use named imports for components without default exports
import { ProtectedAdminRoute } from "@/components/admin/ProtectedAdminRoute";
import { CreatePartnerForm } from "@/components/admin/CreatePartnerForm";
import { PartnersTable } from "@/components/admin/PartnersTable";
import AdminStats from "@/components/admin/AdminStats";
import UsersManagement from "@/components/admin/UsersManagement";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <ProtectedAdminRoute>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Crown className="h-8 w-8 text-yellow-500" />
              Панель администратора
            </h1>
            <p className="text-muted-foreground mt-2">
              Управление пользователями, партнерами и системой
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium text-green-600">Режим администратора</span>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Обзор
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Пользователи
            </TabsTrigger>
            <TabsTrigger value="partners" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Партнеры
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Система
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Статистика системы
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AdminStats />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <UsersManagement />
          </TabsContent>

          <TabsContent value="partners" className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Создание нового партнера</CardTitle>
                </CardHeader>
                <CardContent>
                  <CreatePartnerForm />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Управление партнерами</CardTitle>
                </CardHeader>
                <CardContent>
                  <PartnersTable />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Системная информация
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">База данных</h3>
                      <p className="text-sm text-muted-foreground">
                        Supabase PostgreSQL
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-green-600">Подключено</span>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Аутентификация</h3>
                      <p className="text-sm text-muted-foreground">
                        Supabase Auth
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-green-600">Активно</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="font-medium mb-2">Доступные действия</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" disabled>
                        Очистить кэш
                      </Button>
                      <Button variant="outline" disabled>
                        Резервное копирование
                      </Button>
                      <Button variant="outline" disabled>
                        Системные логи
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Функции будут добавлены в следующих версиях
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedAdminRoute>
  );
};

export default AdminPage;

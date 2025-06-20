
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database } from "lucide-react";

const AdminSystemPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Системные настройки
          </h1>
          <p className="text-gray-600 mt-2">
            Конфигурация и управление системными параметрами
          </p>
        </div>
      </div>

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
  );
};

export default AdminSystemPage;

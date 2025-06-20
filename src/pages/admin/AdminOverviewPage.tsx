
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import AdminStats from "@/components/admin/AdminStats";

const AdminOverviewPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Обзор системы
          </h1>
          <p className="text-gray-600 mt-2">
            Основная статистика и показатели платформы Mark Bot
          </p>
        </div>
      </div>

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
    </div>
  );
};

export default AdminOverviewPage;

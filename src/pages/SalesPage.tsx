
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SalesChart from "@/components/sales/SalesChart";
import SalesStats from "@/components/sales/SalesStats";
import TopProducts from "@/components/sales/TopProducts";
import DateRangePicker from "@/components/sales/DateRangePicker";
import { mockSalesData } from "@/data/mockData";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/integration/useAuth";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const SalesPage = () => {
  const { user, loading: authLoading } = useAuth();
  const [dateRange, setDateRange] = useState<{from?: Date; to?: Date}>({});
  const [timeFrame, setTimeFrame] = useState("daily");
  const [salesData, setSalesData] = useState(mockSalesData);
  const [isLoading, setIsLoading] = useState(false);

  // Функция для получения данных о продажах
  const fetchSalesData = async () => {
    if (!user) {
      // В демо-режиме используем мок данные
      setSalesData(mockSalesData);
      return;
    }
    
    setIsLoading(true);
    try {
      // В реальном приложении здесь был бы запрос к API для получения данных о продажах
      // из системы Kaspi через Supabase Edge Function
      
      // Для демонстрации используем мок данные
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSalesData(mockSalesData);
      
    } catch (error) {
      console.error("Error fetching sales data:", error);
      toast.error("Ошибка при загрузке данных о продажах");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, [user]);

  const handleExport = (format: "excel" | "csv") => {
    if (!user) {
      toast.error("Для экспорта данных необходимо авторизоваться");
      return;
    }
    
    toast.success(`Экспорт данных в формате ${format} начат`);
    // Реализация экспорта данных будет добавлена позже
  };

  // Если идет загрузка аутентификации, показываем индикатор загрузки
  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Мои продажи</h1>
        
        <div className="flex items-center gap-3">
          <DateRangePicker
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
          />
          
          <Button variant="outline" onClick={() => handleExport("excel")} disabled={!user}>
            Экспорт в Excel
          </Button>
          
          <Button variant="outline" onClick={() => handleExport("csv")} disabled={!user}>
            Экспорт в CSV
          </Button>
        </div>
      </div>
      
      {!user && (
        <Alert className="bg-amber-50 border-amber-200">
          <AlertCircle className="h-4 w-4 text-amber-500" />
          <AlertDescription className="text-amber-700">
            Вы просматриваете демо-данные. Для работы с реальными данными требуется авторизация.
          </AlertDescription>
        </Alert>
      )}
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SalesStats salesData={salesData} dateRange={dateRange} />
          </div>
          
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Динамика продаж</CardTitle>
                <Tabs
                  defaultValue="daily"
                  value={timeFrame}
                  onValueChange={setTimeFrame}
                >
                  <TabsList>
                    <TabsTrigger value="daily">По дням</TabsTrigger>
                    <TabsTrigger value="weekly">По неделям</TabsTrigger>
                    <TabsTrigger value="monthly">По месяцам</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <SalesChart
                salesData={salesData}
                timeFrame={timeFrame}
                dateRange={dateRange}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Самые продаваемые товары</CardTitle>
              <CardDescription>Топ товаров по количеству и сумме продаж</CardDescription>
            </CardHeader>
            <CardContent>
              <TopProducts dateRange={dateRange} />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default SalesPage;

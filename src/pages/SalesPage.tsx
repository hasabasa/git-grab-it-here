
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
import { Info, Download, FileSpreadsheet } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const SalesPage = () => {
  const { user, loading: authLoading, isDemo } = useAuth();
  const isMobile = useIsMobile();
  const [dateRange, setDateRange] = useState<{from?: Date; to?: Date}>({});
  const [timeFrame, setTimeFrame] = useState("daily");
  const [salesData, setSalesData] = useState(mockSalesData);
  const [isLoading, setIsLoading] = useState(false);

  // Функция для получения данных о продажах
  const fetchSalesData = async () => {
    // В демо-режиме всегда используем мок данные
    setSalesData(mockSalesData);
    
    // Если не демо-режим и пользователь авторизован, пытаемся загрузить реальные данные
    if (!isDemo && user) {
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
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, [user, isDemo]);

  const handleExport = (format: "excel" | "csv") => {
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
    <div className="space-y-4 md:space-y-6">
      {/* Mobile-first header */}
      <div className="flex flex-col space-y-3 md:flex-row md:justify-between md:items-center md:space-y-0">
        <h1 className="text-2xl md:text-3xl font-bold">Мои продажи</h1>
        
        {/* Mobile-optimized controls */}
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-y-0 md:space-x-3">
          <div className="w-full md:w-auto">
            <DateRangePicker
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
            />
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size={isMobile ? "sm" : "default"}
              onClick={() => handleExport("excel")}
              className="flex-1 md:flex-none"
            >
              {isMobile ? (
                <FileSpreadsheet className="h-4 w-4" />
              ) : (
                <>
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Excel
                </>
              )}
            </Button>
            
            <Button 
              variant="outline" 
              size={isMobile ? "sm" : "default"}
              onClick={() => handleExport("csv")}
              className="flex-1 md:flex-none"
            >
              {isMobile ? (
                <Download className="h-4 w-4" />
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  CSV
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {isDemo && (
        <Alert className="bg-blue-50 border-blue-200">
          <Info className="h-4 w-4 text-blue-500" />
          <AlertDescription className="text-blue-700 text-sm">
            {isMobile 
              ? "Демо-данные. Подключите Kaspi для реальной статистики."
              : "Вы просматриваете демо-данные. Подключите свой магазин Kaspi для просмотра реальных данных."
            }
          </AlertDescription>
        </Alert>
      )}
      
      {isLoading ? (
        <div className="flex justify-center items-center h-48 md:h-64">
          <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 border-primary" />
        </div>
      ) : (
        <>
          {/* Mobile-optimized stats grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            <SalesStats salesData={salesData} dateRange={dateRange} />
          </div>
          
          {/* Mobile-optimized chart */}
          <Card>
            <CardHeader className="pb-3 md:pb-6">
              <div className="flex flex-col space-y-3 md:flex-row md:justify-between md:items-center md:space-y-0">
                <CardTitle className="text-lg md:text-xl">Динамика продаж</CardTitle>
                <Tabs
                  defaultValue="daily"
                  value={timeFrame}
                  onValueChange={setTimeFrame}
                  className="w-full md:w-auto"
                >
                  <TabsList className="grid w-full grid-cols-3 md:w-auto md:grid-cols-none">
                    <TabsTrigger value="daily" className="text-xs md:text-sm">
                      {isMobile ? "Дни" : "По дням"}
                    </TabsTrigger>
                    <TabsTrigger value="weekly" className="text-xs md:text-sm">
                      {isMobile ? "Недели" : "По неделям"}
                    </TabsTrigger>
                    <TabsTrigger value="monthly" className="text-xs md:text-sm">
                      {isMobile ? "Месяцы" : "По месяцам"}
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <SalesChart
                salesData={salesData}
                timeFrame={timeFrame}
                dateRange={dateRange}
              />
            </CardContent>
          </Card>
          
          {/* Mobile-optimized top products */}
          <Card>
            <CardHeader className="pb-3 md:pb-6">
              <CardTitle className="text-lg md:text-xl">Топ товары</CardTitle>
              <CardDescription className="text-sm">
                {isMobile 
                  ? "Лучшие по продажам" 
                  : "Самые продаваемые товары по количеству и сумме продаж"
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <TopProducts dateRange={dateRange} />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default SalesPage;

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SalesChart from "@/components/sales/SalesChart";
import SalesStats from "@/components/sales/SalesStats";
import TopProducts from "@/components/sales/TopProducts";
import DateRangePicker from "@/components/sales/DateRangePicker";
import { mockSalesData } from "@/data/mockData";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/integration/useAuth";
import { useStoreContext } from "@/contexts/StoreContext";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Download, FileSpreadsheet, TrendingUp, Calendar, Filter } from "lucide-react";
import { useScreenSize } from "@/hooks/use-screen-size";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

const SalesPage = () => {
  const { user, loading: authLoading, isDemo } = useAuth();
  const { selectedStoreId, selectedStore, stores } = useStoreContext();
  const { isMobile, isDesktop, isLargeDesktop, isExtraLargeDesktop } = useScreenSize();
  const [dateRange, setDateRange] = useState<{from?: Date; to?: Date}>({});
  const [timeFrame, setTimeFrame] = useState("daily");

  // Функция для получения данных о продажах с фильтрацией по магазину
  const fetchSalesData = async () => {
    // В демо-режиме всегда используем мок данные
    if (isDemo) {
      // Фильтруем мок данные если выбран конкретный магазин
      if (selectedStoreId && selectedStoreId !== 'all') {
        console.log('Demo mode: filtering mock data for store:', selectedStoreId);
        // В реальном приложении здесь была бы фильтрация мок данных по магазину
        return mockSalesData;
      }
      return mockSalesData;
    }
    
    // Если не демо-режим и пользователь авторизован, загружаем реальные данные
    if (!user) {
      throw new Error('User not authenticated');
    }

    console.log('Fetching sales data for store:', selectedStoreId || 'all stores');
    
    // Поскольку у нас нет реальной таблицы sales, используем мок данные
    // В реальном приложении здесь был бы запрос к таблице sales с фильтрацией
    try {
      // Имитируем загрузку данных с сервера
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (selectedStoreId && selectedStoreId !== 'all') {
        console.log('Filtering sales data for specific store:', selectedStoreId);
        // В реальном приложении:
        // const { data, error } = await supabase
        //   .from('sales')
        //   .select('*')
        //   .eq('store_id', selectedStoreId)
        //   .gte('date', dateRange.from?.toISOString())
        //   .lte('date', dateRange.to?.toISOString());
        
        return mockSalesData;
      } else {
        console.log('Fetching sales data for all user stores');
        // В реальном приложении:
        // const storeIds = stores.map(store => store.id);
        // const { data, error } = await supabase
        //   .from('sales')
        //   .select('*')
        //   .in('store_id', storeIds)
        //   .gte('date', dateRange.from?.toISOString())
        //   .lte('date', dateRange.to?.toISOString());
        
        return mockSalesData;
      }
    } catch (error) {
      console.error('Error in fetchSalesData:', error);
      // Fallback к мок данным в случае ошибки
      return mockSalesData;
    }
  };

  // React Query для загрузки данных о продажах
  const { 
    data: salesData = mockSalesData, 
    isLoading, 
    error,
    refetch 
  } = useQuery({
    queryKey: ['salesData', selectedStoreId, dateRange.from, dateRange.to, user?.id],
    queryFn: fetchSalesData,
    enabled: !authLoading && (isDemo || !!user), // Запрос только после инициализации auth
    staleTime: 5 * 60 * 1000, // 5 минут
    retry: 1
  });

  // Автоматическое обновление данных при смене магазина
  useEffect(() => {
    if (!authLoading && (isDemo || user)) {
      console.log('Store changed, refetching sales data for:', selectedStoreId);
      refetch();
    }
  }, [selectedStoreId, refetch, authLoading, isDemo, user]);

  const handleExport = (format: "excel" | "csv") => {
    const storeInfo = selectedStoreId && selectedStoreId !== 'all' 
      ? ` для магазина "${selectedStore?.name || 'Unknown'}"` 
      : ' для всех магазинов';
    toast.success(`Экспорт данных в формате ${format}${storeInfo} начат`);
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

  // Определяем заголовок и описание в зависимости от выбранного магазина
  const getPageTitle = () => {
    if (selectedStoreId === null || selectedStoreId === 'all') {
      return "Мои продажи";
    }
    return `Продажи магазина`;
  };

  const getPageDescription = () => {
    if (selectedStoreId === null || selectedStoreId === 'all') {
      return "Полная аналитика продаж по всем магазинам на Kaspi.kz";
    }
    return `Аналитика продаж для магазина "${selectedStore?.name || 'Выбранный магазин'}"`;
  };

  const getGridCols = () => {
    if (isExtraLargeDesktop) return "grid-cols-1 xl:grid-cols-4";
    if (isLargeDesktop) return "grid-cols-1 lg:grid-cols-3";
    return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
  };

  const getSpacing = () => {
    if (isExtraLargeDesktop) return "space-y-8";
    if (isLargeDesktop) return "space-y-6";
    return "space-y-4 md:space-y-6";
  };

  const getGap = () => {
    if (isExtraLargeDesktop) return "gap-6";
    if (isLargeDesktop) return "gap-6";
    return "gap-3 md:gap-6";
  };

  const getSelectSize = () => {
    if (isExtraLargeDesktop) return "text-base";
    if (isLargeDesktop) return "text-sm";
    return "text-xs md:text-sm";
  };

  const getSelectWidth = () => {
    if (isExtraLargeDesktop) return "w-48";
    if (isLargeDesktop) return "w-40";
    return "w-full md:w-36";
  };

  return (
    <div className={getSpacing()}>
      {/* Enhanced header for desktop */}
      <div className="flex flex-col space-y-4 md:space-y-6">
        <div className="flex flex-col space-y-4 lg:flex-row lg:justify-between lg:items-start lg:space-y-0">
          <div className="space-y-2">
            <h1 className={cn(
              "font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent",
              isExtraLargeDesktop ? "text-4xl" : isLargeDesktop ? "text-3xl" : "text-2xl md:text-3xl"
            )}>
              {getPageTitle()}
            </h1>
            {(isLargeDesktop || isExtraLargeDesktop) && (
              <p className="text-gray-600 text-lg">
                {getPageDescription()}
              </p>
            )}
          </div>
          
          {/* Enhanced controls for desktop */}
          <div className="flex flex-col space-y-3 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-4">
            <div className="flex items-center gap-3">
              {(isLargeDesktop || isExtraLargeDesktop) && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <span>Период:</span>
                </div>
              )}
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
                className="flex-1 lg:flex-none"
              >
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                {isMobile ? "Excel" : "Экспорт Excel"}
              </Button>
              
              <Button 
                variant="outline" 
                size={isMobile ? "sm" : "default"}
                onClick={() => handleExport("csv")}
                className="flex-1 lg:flex-none"
              >
                <Download className="h-4 w-4 mr-2" />
                {isMobile ? "CSV" : "Экспорт CSV"}
              </Button>
            </div>
          </div>
        </div>
        
        {isDemo && (
          <Alert className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <Info className="h-4 w-4 text-blue-500" />
            <AlertDescription className="text-blue-700 text-sm">
              {isMobile 
                ? "Демо-данные. Подключите Kaspi для реальной статистики."
                : "Вы просматриваете демонстрационные данные. Подключите свой магазин Kaspi.kz для просмотра реальных данных о продажах."
              }
            </AlertDescription>
          </Alert>
        )}

        {/* Отображение информации о выбранном магазине */}
        {selectedStoreId && selectedStoreId !== 'all' && selectedStore && (
          <Alert className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <Info className="h-4 w-4 text-green-500" />
            <AlertDescription className="text-green-700 text-sm">
              Отображаются данные для магазина: <strong>{selectedStore.name}</strong>
              {selectedStore.products_count && ` (${selectedStore.products_count} товаров)`}
            </AlertDescription>
          </Alert>
        )}
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-48 md:h-64">
          <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 border-primary" />
        </div>
      ) : error ? (
        <Alert className="bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
          <Info className="h-4 w-4 text-red-500" />
          <AlertDescription className="text-red-700 text-sm">
            Ошибка загрузки данных о продажах. Отображаются демонстрационные данные.
          </AlertDescription>
        </Alert>
      ) : (
        <>
          {/* Enhanced stats grid for desktop */}
          <div className={cn("grid", getGridCols(), getGap())}>
            <SalesStats salesData={salesData} dateRange={dateRange} />
            
            {/* Additional stat card for large screens */}
            {(isLargeDesktop || isExtraLargeDesktop) && (
              <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground font-medium">Конверсия</p>
                      <div className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                        12.5%
                      </div>
                      <p className="text-xs text-muted-foreground">Процент покупок</p>
                    </div>
                    <div className="p-2 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 shadow-lg">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* Chart section - now takes full width */}
          <Card>
            <CardHeader className="pb-3 md:pb-6">
              <div className="flex flex-col space-y-3 md:flex-row md:justify-between md:items-center md:space-y-0">
                <div className="space-y-1">
                  <CardTitle className="text-lg md:text-xl">Динамика продаж</CardTitle>
                  {(isLargeDesktop || isExtraLargeDesktop) && (
                    <CardDescription>
                      Детальная аналитика изменения продаж по выбранному периоду
                      {selectedStoreId && selectedStoreId !== 'all' && selectedStore && 
                        ` для магазина "${selectedStore.name}"`
                      }
                    </CardDescription>
                  )}
                </div>
                <Select
                  value={timeFrame}
                  onValueChange={setTimeFrame}
                >
                  <SelectTrigger className={cn(getSelectWidth(), "h-10")}>
                    <SelectValue placeholder="Выберите период" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                    <SelectItem value="daily" className={cn("cursor-pointer hover:bg-gray-50", getSelectSize())}>
                      {isMobile ? "По дням" : "Ежедневно"}
                    </SelectItem>
                    <SelectItem value="weekly" className={cn("cursor-pointer hover:bg-gray-50", getSelectSize())}>
                      {isMobile ? "По неделям" : "Еженедельно"}
                    </SelectItem>
                    <SelectItem value="monthly" className={cn("cursor-pointer hover:bg-gray-50", getSelectSize())}>
                      {isMobile ? "По месяцам" : "Ежемесячно"}
                    </SelectItem>
                  </SelectContent>
                </Select>
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
          
          {/* Top products section */}
          <Card>
            <CardHeader className="pb-3 md:pb-6">
              <div className="space-y-1">
                <CardTitle className="text-lg md:text-xl">Топ товары</CardTitle>
                <CardDescription className="text-sm">
                  {isMobile 
                    ? "Лучшие по продажам" 
                    : "Самые продаваемые товары по количеству и сумме продаж за выбранный период"
                  }
                  {selectedStoreId && selectedStoreId !== 'all' && selectedStore && 
                    ` для магазина "${selectedStore.name}"`
                  }
                </CardDescription>
              </div>
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

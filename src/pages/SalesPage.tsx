
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "lucide-react";
import SalesChart from "@/components/sales/SalesChart";
import SalesStats from "@/components/sales/SalesStats";
import TopProducts from "@/components/sales/TopProducts";
import DateRangePicker from "@/components/sales/DateRangePicker";
import { mockSalesData } from "@/data/mockData";

const SalesPage = () => {
  const [dateRange, setDateRange] = useState<{from?: Date; to?: Date}>({});
  const [timeFrame, setTimeFrame] = useState("daily");

  const handleExport = (format: "excel" | "csv") => {
    console.log(`Exporting data in ${format} format`);
    // Implementation would go here
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Мои продажи</h1>
        
        <div className="flex items-center gap-3">
          <DateRangePicker
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
          />
          
          <Button variant="outline" onClick={() => handleExport("excel")}>
            Экспорт в Excel
          </Button>
          
          <Button variant="outline" onClick={() => handleExport("csv")}>
            Экспорт в CSV
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SalesStats salesData={mockSalesData} dateRange={dateRange} />
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
            salesData={mockSalesData}
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
    </div>
  );
};

export default SalesPage;

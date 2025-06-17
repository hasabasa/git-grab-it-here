
import { Card, CardContent } from "@/components/ui/card";
import { SalesData } from "@/types";
import { filterDataByDateRange, calculateTotalSales, calculateAverageOrderValue, calculateTotalOrders } from "@/lib/salesUtils";
import { useIsMobile } from "@/hooks/use-mobile";

interface SalesStatsProps {
  salesData: SalesData[];
  dateRange: {
    from?: Date;
    to?: Date;
  };
}

const SalesStats = ({ salesData, dateRange }: SalesStatsProps) => {
  const isMobile = useIsMobile();
  const filteredData = filterDataByDateRange(salesData, dateRange);
  
  const totalSales = calculateTotalSales(filteredData);
  const averageOrderValue = calculateAverageOrderValue(filteredData);
  const totalOrders = calculateTotalOrders(filteredData);

  const stats = [
    {
      title: isMobile ? "Продажи" : "Всего продаж",
      value: `${totalSales.toLocaleString()} ₸`,
      description: isMobile ? "Общая сумма" : "Общая сумма заказов",
      trend: filteredData.length > 1 ? filteredData[filteredData.length - 1].amount > filteredData[filteredData.length - 2].amount : undefined,
    },
    {
      title: isMobile ? "Ср. чек" : "Средний чек",
      value: `${averageOrderValue.toLocaleString()} ₸`,
      description: isMobile ? "За заказ" : "Средняя сумма заказа",
    },
    {
      title: isMobile ? "Заказы" : "Кол-во заказов",
      value: totalOrders,
      description: isMobile ? "Всего" : "Общее количество заказов",
    }
  ];

  return (
    <>
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className={`${isMobile ? 'pt-4 p-4' : 'pt-6'}`}>
            <div className="flex flex-col space-y-1.5 md:space-y-2">
              <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                {stat.title}
              </p>
              <div className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold`}>
                {stat.value}
              </div>
              <p className={`${isMobile ? 'text-xs' : 'text-xs'} text-muted-foreground`}>
                {stat.description}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default SalesStats;

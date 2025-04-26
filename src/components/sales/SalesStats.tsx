
import { Card, CardContent } from "@/components/ui/card";
import { SalesData } from "@/types";
import { filterDataByDateRange, calculateTotalSales, calculateAverageOrderValue, calculateTotalOrders } from "@/lib/salesUtils";

interface SalesStatsProps {
  salesData: SalesData[];
  dateRange: {
    from?: Date;
    to?: Date;
  };
}

const SalesStats = ({ salesData, dateRange }: SalesStatsProps) => {
  const filteredData = filterDataByDateRange(salesData, dateRange);
  
  const totalSales = calculateTotalSales(filteredData);
  const averageOrderValue = calculateAverageOrderValue(filteredData);
  const totalOrders = calculateTotalOrders(filteredData);

  const stats = [
    {
      title: "Всего продаж",
      value: `${totalSales.toLocaleString()} ₸`,
      description: "Общая сумма заказов",
      trend: filteredData.length > 1 ? filteredData[filteredData.length - 1].amount > filteredData[filteredData.length - 2].amount : undefined,
    },
    {
      title: "Средний чек",
      value: `${averageOrderValue.toLocaleString()} ₸`,
      description: "Средняя сумма заказа",
    },
    {
      title: "Кол-во заказов",
      value: totalOrders,
      description: "Общее количество заказов",
    }
  ];

  return (
    <>
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="pt-6">
            <div className="flex flex-col space-y-2">
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default SalesStats;

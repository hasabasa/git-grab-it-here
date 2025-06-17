
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import { Card } from "@/components/ui/card";
import { SalesData } from "@/types";
import { formatDateForChart, filterDataByDateRange, aggregateDataByTimeFrame } from "@/lib/salesUtils";
import { useIsMobile } from "@/hooks/use-mobile";

interface SalesChartProps {
  salesData: SalesData[];
  timeFrame: string;
  dateRange: {
    from?: Date;
    to?: Date;
  };
}

const SalesChart = ({ salesData, timeFrame, dateRange }: SalesChartProps) => {
  const isMobile = useIsMobile();
  const filteredData = filterDataByDateRange(salesData, dateRange);
  const aggregatedData = aggregateDataByTimeFrame(filteredData, timeFrame);

  return (
    <div className={`${isMobile ? 'h-[250px]' : 'h-[400px]'}`}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={aggregatedData}
          margin={{
            top: 10,
            right: isMobile ? 10 : 30,
            left: isMobile ? 0 : 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tickFormatter={(date) => formatDateForChart(date, timeFrame)}
            fontSize={isMobile ? 10 : 12}
            interval={isMobile ? 'preserveStartEnd' : 'preserveStart'}
          />
          <YAxis 
            fontSize={isMobile ? 10 : 12}
            tickFormatter={(value) => isMobile ? `${(value / 1000).toFixed(0)}k` : value.toLocaleString()}
          />
          <Tooltip 
            labelFormatter={(date) => formatDateForChart(date, timeFrame)} 
            formatter={(value) => [`${value.toLocaleString()} ₸`, "Сумма"]}
            contentStyle={{
              fontSize: isMobile ? '12px' : '14px',
              padding: isMobile ? '8px' : '12px'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="amount" 
            stroke="#8884d8" 
            fill="#8884d8" 
            fillOpacity={0.3} 
            activeDot={{ r: isMobile ? 4 : 8 }} 
            strokeWidth={isMobile ? 1.5 : 2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;

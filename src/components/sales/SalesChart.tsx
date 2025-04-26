
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

interface SalesChartProps {
  salesData: SalesData[];
  timeFrame: string;
  dateRange: {
    from?: Date;
    to?: Date;
  };
}

const SalesChart = ({ salesData, timeFrame, dateRange }: SalesChartProps) => {
  const filteredData = filterDataByDateRange(salesData, dateRange);
  const aggregatedData = aggregateDataByTimeFrame(filteredData, timeFrame);

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={aggregatedData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={(date) => formatDateForChart(date, timeFrame)} />
          <YAxis />
          <Tooltip 
            labelFormatter={(date) => formatDateForChart(date, timeFrame)} 
            formatter={(value) => [`${value.toLocaleString()} ₸`, "Сумма"]}
          />
          <Area 
            type="monotone" 
            dataKey="amount" 
            stroke="#8884d8" 
            fill="#8884d8" 
            fillOpacity={0.3} 
            activeDot={{ r: 8 }} 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;

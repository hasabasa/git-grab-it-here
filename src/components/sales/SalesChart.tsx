
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
    <div className={`${isMobile ? 'h-[400px]' : 'h-[500px]'} p-2`}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={aggregatedData}
          margin={{
            top: 20,
            right: isMobile ? 20 : 30,
            left: isMobile ? 20 : 30,
            bottom: isMobile ? 40 : 20,
          }}
        >
          <defs>
            <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8}/>
              <stop offset="50%" stopColor="#6366f1" stopOpacity={0.4}/>
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="salesStroke" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1d4ed8" stopOpacity={1}/>
              <stop offset="100%" stopColor="#7c3aed" stopOpacity={1}/>
            </linearGradient>
          </defs>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#e2e8f0" 
            strokeOpacity={0.6}
            vertical={false}
          />
          <XAxis 
            dataKey="date" 
            tickFormatter={(date) => formatDateForChart(date, timeFrame)}
            fontSize={isMobile ? 14 : 16}
            interval={isMobile ? 'preserveStartEnd' : 'preserveStart'}
            stroke="#374151"
            strokeWidth={1.5}
            tickLine={{ stroke: '#9ca3af', strokeWidth: 1 }}
            axisLine={{ stroke: '#9ca3af', strokeWidth: 1.5 }}
            angle={isMobile ? -45 : 0}
            textAnchor={isMobile ? 'end' : 'middle'}
            height={isMobile ? 60 : 30}
            tick={{
              fontSize: isMobile ? 14 : 16,
              fontWeight: 500,
              fill: '#374151'
            }}
          />
          <YAxis 
            fontSize={isMobile ? 14 : 16}
            stroke="#374151"
            strokeWidth={1.5}
            tickLine={{ stroke: '#9ca3af', strokeWidth: 1 }}
            axisLine={{ stroke: '#9ca3af', strokeWidth: 1.5 }}
            tickFormatter={(value) => 
              value > 999999 
                ? `${(value / 1000000).toFixed(1)}M` 
                : value > 999 
                  ? `${(value / 1000).toFixed(0)}k` 
                  : value.toLocaleString()
            }
            tick={{
              fontSize: isMobile ? 14 : 16,
              fontWeight: 500,
              fill: '#374151'
            }}
            width={isMobile ? 60 : 80}
          />
          <Tooltip 
            labelFormatter={(date) => formatDateForChart(date, timeFrame)} 
            formatter={(value) => [`${value.toLocaleString()} ₸`, "Сумма"]}
            contentStyle={{
              fontSize: isMobile ? '15px' : '16px',
              padding: isMobile ? '12px' : '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.98)',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(10px)',
              fontWeight: 500
            }}
            labelStyle={{
              color: '#1f2937',
              fontWeight: '600',
              marginBottom: '6px',
              fontSize: isMobile ? '15px' : '16px'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="amount" 
            stroke="url(#salesStroke)"
            fill="url(#salesGradient)"
            strokeWidth={isMobile ? 3 : 3.5}
            activeDot={{ 
              r: isMobile ? 7 : 9,
              fill: '#1d4ed8',
              stroke: '#ffffff',
              strokeWidth: 3,
              filter: 'drop-shadow(0 4px 8px rgba(29, 78, 216, 0.3))'
            }}
            dot={{
              fill: '#3b82f6',
              stroke: '#ffffff',
              strokeWidth: 2,
              r: isMobile ? 4 : 5
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;

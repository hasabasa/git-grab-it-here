
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  Bar,
  BarChart,
  ComposedChart,
  TooltipProps
} from "recharts";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

interface NicheChartProps {
  data: any[];
}

const NicheChart = ({ data }: NicheChartProps) => {
  const [chartType, setChartType] = useState<'line' | 'area' | 'bar' | 'composed'>('line');

  const chartConfig = {
    demand: {
      label: "Продажи (шт)",
      theme: {
        light: "#8884d8",
        dark: "#a78bfa",
      },
    },
    supply: {
      label: "Продажи (₸)",
      theme: {
        light: "#82ca9d",
        dark: "#4ade80",
      },
    },
  };

  const renderChart = () => {
    switch (chartType) {
      case 'area':
        return (
          <AreaChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" orientation="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Area 
              yAxisId="left"
              type="monotone"
              dataKey="demand"
              name="Продажи (шт)"
              stroke="#8884d8"
              fill="#8884d8" 
              fillOpacity={0.3}
            />
            <Area 
              yAxisId="right"
              type="monotone"
              dataKey="supply"
              name="Продажи (₸)"
              stroke="#82ca9d"
              fill="#82ca9d" 
              fillOpacity={0.3}
            />
          </AreaChart>
        );
      case 'bar':
        return (
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="demand" name="Продажи (шт)" fill="#8884d8" />
            <Bar dataKey="supply" name="Продажи (₸)" fill="#82ca9d" />
          </BarChart>
        );
      case 'composed':
        return (
          <ComposedChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" orientation="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="demand" name="Продажи (шт)" fill="#8884d8" />
            <Line yAxisId="right" type="monotone" dataKey="supply" name="Продажи (₸)" stroke="#82ca9d" />
          </ComposedChart>
        );
      default:
        return (
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" orientation="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line 
              yAxisId="left" 
              type="monotone" 
              dataKey="demand" 
              name="Продажи (шт)" 
              stroke="#8884d8" 
              activeDot={{ r: 8 }} 
            />
            <Line 
              yAxisId="right" 
              type="monotone" 
              dataKey="supply" 
              name="Продажи (₸)" 
              stroke="#82ca9d" 
            />
          </LineChart>
        );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 justify-end">
        <Button 
          size="sm" 
          variant={chartType === 'line' ? "default" : "outline"}
          onClick={() => setChartType('line')}
        >
          Линейный
        </Button>
        <Button 
          size="sm" 
          variant={chartType === 'area' ? "default" : "outline"}
          onClick={() => setChartType('area')}
        >
          Область
        </Button>
        <Button 
          size="sm" 
          variant={chartType === 'bar' ? "default" : "outline"}
          onClick={() => setChartType('bar')}
        >
          Столбцы
        </Button>
        <Button 
          size="sm" 
          variant={chartType === 'composed' ? "default" : "outline"}
          onClick={() => setChartType('composed')}
        >
          Комбинированный
        </Button>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};

export default NicheChart;

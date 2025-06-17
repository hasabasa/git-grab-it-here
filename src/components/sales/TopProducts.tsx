
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { mockTopProducts } from "@/data/mockData";
import { useIsMobile } from "@/hooks/use-mobile";

interface TopProductsProps {
  dateRange: {
    from?: Date;
    to?: Date;
  };
}

const TopProducts = ({ dateRange }: TopProductsProps) => {
  const isMobile = useIsMobile();
  const [sortBy, setSortBy] = useState("quantity");
  
  // In a real app, you'd filter by date range here
  const products = mockTopProducts.sort((a, b) => {
    if (sortBy === "quantity") {
      return b.quantity - a.quantity;
    } else {
      return b.totalAmount - a.totalAmount;
    }
  }).slice(0, isMobile ? 5 : 8);

  const chartData = products.map((product, index) => ({
    name: product.name.length > (isMobile ? 10 : 18) 
      ? product.name.substring(0, isMobile ? 10 : 18) + "..." 
      : product.name,
    [sortBy === "quantity" ? "quantity" : "amount"]: sortBy === "quantity" ? product.quantity : product.totalAmount,
    index: index
  }));

  // Градиентные цвета для столбцов
  const barColors = [
    '#3b82f6', '#6366f1', '#8b5cf6', '#ec4899', 
    '#ef4444', '#f59e0b', '#10b981', '#06b6d4'
  ];

  return (
    <div>
      <Tabs defaultValue="quantity" value={sortBy} onValueChange={setSortBy} className="mb-4 md:mb-6">
        <TabsList className="w-full grid grid-cols-2 bg-gradient-to-r from-slate-100 to-slate-200 p-1 rounded-xl">
          <TabsTrigger 
            value="quantity" 
            className="text-xs md:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200"
          >
            {isMobile ? "Кол-во" : "По количеству"}
          </TabsTrigger>
          <TabsTrigger 
            value="amount" 
            className="text-xs md:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200"
          >
            {isMobile ? "Сумма" : "По сумме"}
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className={`${isMobile ? 'h-[350px]' : 'h-[550px]'}`}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{
              top: 5,
              right: 10,
              left: isMobile ? 75 : 130,
              bottom: 5,
            }}
          >
            <defs>
              {barColors.map((color, index) => (
                <linearGradient key={`gradient-${index}`} id={`barGradient-${index}`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={color} stopOpacity={0.8}/>
                  <stop offset="100%" stopColor={color} stopOpacity={1}/>
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#e2e8f0" 
              strokeOpacity={0.6}
              horizontal={false}
            />
            <XAxis 
              type="number" 
              fontSize={isMobile ? 10 : 13}
              tickFormatter={(value) => 
                sortBy === "amount" && value > 999
                  ? `${(value / 1000).toFixed(0)}k` 
                  : value.toLocaleString()
              }
              stroke="#64748b"
              strokeWidth={1}
              tickLine={{ stroke: '#cbd5e1', strokeWidth: 1 }}
              axisLine={{ stroke: '#cbd5e1', strokeWidth: 1 }}
            />
            <YAxis 
              type="category" 
              dataKey="name" 
              width={isMobile ? 75 : 130}
              fontSize={isMobile ? 9 : 12}
              stroke="#64748b"
              strokeWidth={1}
              tickLine={{ stroke: '#cbd5e1', strokeWidth: 0 }}
              axisLine={{ stroke: '#cbd5e1', strokeWidth: 1 }}
              tick={{ textAnchor: 'start', dx: 2 }}
            />
            <Tooltip
              formatter={(value) => {
                if (sortBy === "amount") {
                  return [`${value.toLocaleString()} ₸`, "Сумма"];
                }
                return [value, "Кол-во"];
              }}
              contentStyle={{
                fontSize: isMobile ? '11px' : '14px',
                padding: isMobile ? '6px 10px' : '12px 16px',
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.15)',
                backdropFilter: 'blur(10px)'
              }}
              labelStyle={{
                color: '#1e293b',
                fontWeight: '600',
                fontSize: isMobile ? '10px' : '14px'
              }}
              wrapperStyle={{
                zIndex: 1000
              }}
            />
            <Bar 
              dataKey={sortBy === "quantity" ? "quantity" : "amount"}
              radius={[0, isMobile ? 4 : 8, isMobile ? 4 : 8, 0]}
              barSize={isMobile ? 15 : 20}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={`url(#barGradient-${index % barColors.length})`}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TopProducts;

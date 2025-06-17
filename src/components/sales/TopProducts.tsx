
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
    name: product.name.length > (isMobile ? 8 : 18) 
      ? product.name.substring(0, isMobile ? 8 : 18) + "..." 
      : product.name,
    fullName: product.name,
    [sortBy === "quantity" ? "quantity" : "amount"]: sortBy === "quantity" ? product.quantity : product.totalAmount,
    index: index
  }));

  // Градиентные цвета для столбцов
  const barColors = [
    '#3b82f6', '#6366f1', '#8b5cf6', '#ec4899', 
    '#ef4444', '#f59e0b', '#10b981', '#06b6d4'
  ];

  return (
    <div className={`${isMobile ? 'space-y-3' : 'space-y-4'}`}>
      <Tabs defaultValue="quantity" value={sortBy} onValueChange={setSortBy} className={isMobile ? 'mb-3' : 'mb-4'}>
        <TabsList className={`${isMobile ? 'w-full grid grid-cols-2 h-9' : 'h-10'} bg-gradient-to-r from-slate-100 to-slate-200 p-1 rounded-xl`}>
          <TabsTrigger 
            value="quantity" 
            className={`${isMobile ? 'text-xs px-2' : 'px-4'} data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200`}
          >
            {isMobile ? "Кол-во" : "По количеству"}
          </TabsTrigger>
          <TabsTrigger 
            value="amount" 
            className={`${isMobile ? 'text-xs px-2' : 'px-4'} data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200`}
          >
            {isMobile ? "Сумма" : "По сумме"}
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className={`${isMobile ? 'h-[350px] -mx-2' : 'h-[550px]'} ${isMobile ? 'p-1' : 'p-2'}`}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{
              top: isMobile ? 5 : 10,
              right: isMobile ? 10 : 30,
              left: isMobile ? 5 : 130,
              bottom: isMobile ? 5 : 10,
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
              fontSize={isMobile ? 9 : 13}
              tickFormatter={(value) => 
                sortBy === "amount" 
                  ? isMobile 
                    ? `${(value / 1000).toFixed(0)}k` 
                    : `${value.toLocaleString()}`
                  : isMobile 
                    ? value > 999 ? `${(value / 1000).toFixed(0)}k` : value.toString()
                    : value.toLocaleString()
              }
              stroke="#64748b"
              strokeWidth={1}
              tickLine={{ stroke: '#cbd5e1', strokeWidth: 1 }}
              axisLine={{ stroke: '#cbd5e1', strokeWidth: 1 }}
              interval={0}
            />
            <YAxis 
              type="category" 
              dataKey="name" 
              width={isMobile ? 0 : 130}
              fontSize={isMobile ? 0 : 12}
              stroke="#64748b"
              strokeWidth={1}
              tickLine={{ stroke: '#cbd5e1', strokeWidth: 1 }}
              axisLine={{ stroke: '#cbd5e1', strokeWidth: 1 }}
              tick={isMobile ? false : { textAnchor: 'start', dx: 5 }}
              hide={isMobile}
            />
            <Tooltip
              formatter={(value, name, props) => {
                if (sortBy === "amount") {
                  return [`${value.toLocaleString()} ₸`, "Сумма"];
                }
                return [value, "Кол-во"];
              }}
              labelFormatter={(label, payload) => {
                if (isMobile && payload && payload[0]) {
                  return payload[0].payload.fullName;
                }
                return label;
              }}
              contentStyle={{
                fontSize: isMobile ? '10px' : '14px',
                padding: isMobile ? '6px 8px' : '12px 16px',
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                border: 'none',
                borderRadius: isMobile ? '8px' : '12px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(10px)',
                maxWidth: isMobile ? '200px' : 'none'
              }}
              labelStyle={{
                color: '#1e293b',
                fontWeight: '600',
                fontSize: isMobile ? '10px' : '14px'
              }}
            />
            <Bar 
              dataKey={sortBy === "quantity" ? "quantity" : "amount"}
              radius={[0, isMobile ? 4 : 8, isMobile ? 4 : 8, 0]}
              minPointSize={isMobile ? 2 : 5}
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

      {isMobile && (
        <div className="mt-3 space-y-1 text-xs">
          <div className="font-medium text-gray-700 mb-2">Товары:</div>
          {products.slice(0, 5).map((product, index) => (
            <div key={product.name} className="flex items-center gap-2 py-1">
              <div 
                className="w-3 h-3 rounded-sm flex-shrink-0"
                style={{ backgroundColor: barColors[index % barColors.length] }}
              />
              <span className="text-gray-600 truncate flex-1">
                {product.name}
              </span>
              <span className="font-medium text-gray-900 text-right">
                {sortBy === "quantity" 
                  ? `${product.quantity} шт`
                  : `${product.totalAmount.toLocaleString()} ₸`
                }
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopProducts;


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
  
  // В реальном приложении здесь была бы фильтрация по диапазону дат
  const products = mockTopProducts.sort((a, b) => {
    if (sortBy === "quantity") {
      return b.quantity - a.quantity;
    } else {
      return b.totalAmount - a.totalAmount;
    }
  }).slice(0, isMobile ? 5 : 10);

  const chartData = products.map((product, index) => ({
    name: isMobile 
      ? product.name.length > 15 ? product.name.substring(0, 15) + "..." : product.name
      : product.name.length > 35 ? product.name.substring(0, 35) + "..." : product.name,
    fullName: product.name,
    [sortBy === "quantity" ? "quantity" : "amount"]: sortBy === "quantity" ? product.quantity : product.totalAmount,
    index: index
  }));

  // Цветовая схема для столбцов
  const barColors = [
    '#3b82f6', '#6366f1', '#8b5cf6', '#ec4899', 
    '#ef4444', '#f59e0b', '#10b981', '#06b6d4',
    '#f97316', '#84cc16'
  ];

  if (isMobile) {
    return (
      <div className="space-y-3">
        <Tabs defaultValue="quantity" value={sortBy} onValueChange={setSortBy} className="mb-3">
          <TabsList className="w-full grid grid-cols-2 h-9 bg-gradient-to-r from-slate-100 to-slate-200 p-1 rounded-xl">
            <TabsTrigger 
              value="quantity" 
              className="text-xs px-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200"
            >
              Кол-во
            </TabsTrigger>
            <TabsTrigger 
              value="amount" 
              className="text-xs px-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200"
            >
              Сумма
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="h-[350px] -mx-2 p-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 10, left: 5, bottom: 5 }}
            >
              <defs>
                {barColors.map((color, index) => (
                  <linearGradient key={`gradient-${index}`} id={`barGradient-${index}`} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor={color} stopOpacity={0.8}/>
                    <stop offset="100%" stopColor={color} stopOpacity={1}/>
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.6} horizontal={false} />
              <XAxis 
                type="number" 
                fontSize={9}
                tickFormatter={(value) => 
                  sortBy === "amount" 
                    ? `${(value / 1000).toFixed(0)}k` 
                    : value > 999 ? `${(value / 1000).toFixed(0)}k` : value.toString()
                }
                stroke="#64748b"
                strokeWidth={1}
                tickLine={{ stroke: '#cbd5e1', strokeWidth: 1 }}
                axisLine={{ stroke: '#cbd5e1', strokeWidth: 1 }}
                interval={0}
              />
              <YAxis type="category" dataKey="name" width={0} hide />
              <Tooltip
                formatter={(value, name, props) => {
                  if (sortBy === "amount") {
                    return [`${value.toLocaleString()} ₸`, "Сумма"];
                  }
                  return [value, "Кол-во"];
                }}
                labelFormatter={(label, payload) => {
                  if (payload && payload[0]) {
                    return payload[0].payload.fullName;
                  }
                  return label;
                }}
                contentStyle={{
                  fontSize: '10px',
                  padding: '6px 8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.98)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(10px)',
                  maxWidth: '200px'
                }}
                labelStyle={{ color: '#1e293b', fontWeight: '600', fontSize: '10px' }}
              />
              <Bar 
                dataKey={sortBy === "quantity" ? "quantity" : "amount"}
                radius={[0, 4, 4, 0]}
                minPointSize={2}
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
      </div>
    );
  }

  // Десктопная версия
  return (
    <div className="space-y-6">
      {/* Tabs для переключения между количеством и суммой */}
      <div className="flex justify-between items-center">
        <Tabs defaultValue="quantity" value={sortBy} onValueChange={setSortBy}>
          <TabsList className="bg-gradient-to-r from-slate-100 to-slate-200 p-1 rounded-xl">
            <TabsTrigger 
              value="quantity" 
              className="px-6 py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200"
            >
              По количеству
            </TabsTrigger>
            <TabsTrigger 
              value="amount" 
              className="px-6 py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200"
            >
              По сумме
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Основной контент в две колонки */}
      <div className="grid grid-cols-3 gap-8 h-[500px]">
        {/* График */}
        <div className="col-span-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 180, bottom: 20 }}
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
                fontSize={13}
                tickFormatter={(value) => 
                  sortBy === "amount" 
                    ? `${value.toLocaleString()}`
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
                width={180}
                fontSize={13}
                stroke="#64748b"
                strokeWidth={1}
                tickLine={{ stroke: '#cbd5e1', strokeWidth: 1 }}
                axisLine={{ stroke: '#cbd5e1', strokeWidth: 1 }}
                tick={{ textAnchor: 'end', dx: -5 }}
              />
              <Tooltip
                formatter={(value, name, props) => {
                  if (sortBy === "amount") {
                    return [`${value.toLocaleString()} ₸`, "Сумма"];
                  }
                  return [value, "Количество"];
                }}
                labelFormatter={(label, payload) => {
                  if (payload && payload[0]) {
                    return payload[0].payload.fullName;
                  }
                  return label;
                }}
                contentStyle={{
                  fontSize: '14px',
                  padding: '12px 16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.98)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(10px)'
                }}
                labelStyle={{ color: '#1e293b', fontWeight: '600', fontSize: '14px' }}
              />
              <Bar 
                dataKey={sortBy === "quantity" ? "quantity" : "amount"}
                radius={[0, 8, 8, 0]}
                minPointSize={5}
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

        {/* Список товаров */}
        <div className="col-span-1 space-y-3 overflow-y-auto pr-2">
          <h4 className="font-semibold text-lg text-gray-800 mb-4">Топ-{products.length} товаров</h4>
          {products.map((product, index) => (
            <div 
              key={product.name} 
              className="flex items-start gap-4 p-4 bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-center">
                <div 
                  className="w-4 h-4 rounded-md shadow-sm"
                  style={{ backgroundColor: barColors[index % barColors.length] }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">#{index + 1}</span>
                  <span className="text-lg font-bold text-gray-900">
                    {sortBy === "quantity" 
                      ? `${product.quantity} шт`
                      : `${product.totalAmount.toLocaleString()} ₸`
                    }
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                  {product.name}
                </p>
                <div className="mt-2 text-xs text-gray-500">
                  {sortBy === "quantity" 
                    ? `Сумма: ${product.totalAmount.toLocaleString()} ₸`
                    : `Количество: ${product.quantity} шт`
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopProducts;

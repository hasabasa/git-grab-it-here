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
      : product.name.length > 25 ? product.name.substring(0, 25) + "..." : product.name,
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

  // Полностью переработанная десктопная версия
  return (
    <div className="space-y-4">
      {/* Заголовок и переключатели */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
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
      </div>

      {/* Основной контент в две колонки */}
      <div className="grid grid-cols-12 gap-6 h-[500px]">
        {/* График - занимает 8 колонок */}
        <div className="col-span-8 bg-white rounded-lg border border-gray-200 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
              barCategoryGap="20%"
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
                fontSize={12}
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
                width={10}
                fontSize={12}
                stroke="#64748b"
                strokeWidth={1}
                tickLine={false}
                axisLine={false}
                tick={false}
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
                  fontSize: '13px',
                  padding: '12px 16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.98)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                  backdropFilter: 'blur(10px)',
                  maxWidth: '300px'
                }}
                labelStyle={{ color: '#1e293b', fontWeight: '600', fontSize: '13px' }}
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

        {/* Список товаров - занимает 4 колонки */}
        <div className="col-span-4 bg-white rounded-lg border border-gray-200 p-4 overflow-y-auto">
          <h4 className="font-semibold text-lg text-gray-800 mb-6 sticky top-0 bg-white pb-4 border-b border-gray-100 z-10 -mx-4 px-4 pt-1">
            Топ-{products.length} товаров
          </h4>
          <div className="space-y-3">
            {products.map((product, index) => (
              <div 
                key={product.name} 
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 border border-gray-100"
              >
                <div className="flex items-center justify-center pt-1">
                  <div 
                    className="w-4 h-4 rounded-sm shadow-sm"
                    style={{ backgroundColor: barColors[index % barColors.length] }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-900 bg-white px-2 py-1 rounded-full border">
                      #{index + 1}
                    </span>
                    <span className="text-lg font-bold text-gray-900">
                      {sortBy === "quantity" 
                        ? `${product.quantity}`
                        : `${(product.totalAmount / 1000).toFixed(0)}k ₸`
                      }
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed mb-2 line-clamp-2">
                    {product.name}
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-500 pt-1 border-t border-gray-200">
                    <span>
                      {sortBy === "quantity" 
                        ? `Сумма: ${(product.totalAmount / 1000).toFixed(0)}k ₸`
                        : `Количество: ${product.quantity} шт`
                      }
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopProducts;


import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
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
  }).slice(0, isMobile ? 5 : 10);

  const chartData = products.map((product) => ({
    name: product.name.length > (isMobile ? 15 : 20) 
      ? product.name.substring(0, isMobile ? 15 : 20) + "..." 
      : product.name,
    [sortBy === "quantity" ? "quantity" : "amount"]: sortBy === "quantity" ? product.quantity : product.totalAmount,
  }));

  return (
    <div>
      <Tabs defaultValue="quantity" value={sortBy} onValueChange={setSortBy} className="mb-4 md:mb-6">
        <TabsList className={`${isMobile ? 'w-full grid grid-cols-2' : ''}`}>
          <TabsTrigger value="quantity" className={isMobile ? 'text-xs' : ''}>
            {isMobile ? "Кол-во" : "По количеству"}
          </TabsTrigger>
          <TabsTrigger value="amount" className={isMobile ? 'text-xs' : ''}>
            {isMobile ? "Сумма" : "По сумме"}
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className={`${isMobile ? 'h-[250px]' : 'h-[400px]'}`}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{
              top: 5,
              right: isMobile ? 10 : 30,
              left: isMobile ? 60 : 100,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              type="number" 
              fontSize={isMobile ? 10 : 12}
              tickFormatter={(value) => 
                sortBy === "amount" && isMobile 
                  ? `${(value / 1000).toFixed(0)}k` 
                  : value.toLocaleString()
              }
            />
            <YAxis 
              type="category" 
              dataKey="name" 
              width={isMobile ? 60 : 100}
              fontSize={isMobile ? 9 : 12}
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
                padding: isMobile ? '6px' : '12px'
              }}
            />
            <Bar 
              dataKey={sortBy === "quantity" ? "quantity" : "amount"} 
              fill="#8884d8" 
              radius={[0, isMobile ? 2 : 4, isMobile ? 2 : 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TopProducts;


import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { mockTopProducts } from "@/data/mockData";

interface TopProductsProps {
  dateRange: {
    from?: Date;
    to?: Date;
  };
}

const TopProducts = ({ dateRange }: TopProductsProps) => {
  const [sortBy, setSortBy] = useState("quantity");
  
  // In a real app, you'd filter by date range here
  const products = mockTopProducts.sort((a, b) => {
    if (sortBy === "quantity") {
      return b.quantity - a.quantity;
    } else {
      return b.totalAmount - a.totalAmount;
    }
  }).slice(0, 10);

  const chartData = products.map((product) => ({
    name: product.name.length > 20 ? product.name.substring(0, 20) + "..." : product.name,
    [sortBy === "quantity" ? "quantity" : "amount"]: sortBy === "quantity" ? product.quantity : product.totalAmount,
  }));

  return (
    <div>
      <Tabs defaultValue="quantity" value={sortBy} onValueChange={setSortBy} className="mb-6">
        <TabsList>
          <TabsTrigger value="quantity">По количеству</TabsTrigger>
          <TabsTrigger value="amount">По сумме</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{
              top: 5,
              right: 30,
              left: 100,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" width={100} />
            <Tooltip
              formatter={(value) => {
                if (sortBy === "amount") {
                  return [`${value.toLocaleString()} ₸`, "Сумма"];
                }
                return [value, "Кол-во"];
              }}
            />
            <Bar 
              dataKey={sortBy === "quantity" ? "quantity" : "amount"} 
              fill="#8884d8" 
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TopProducts;

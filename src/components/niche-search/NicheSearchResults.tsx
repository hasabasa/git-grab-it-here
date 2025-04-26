
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface NicheSearchResultsProps {
  results: any;
}

const NicheSearchResults = ({ results }: NicheSearchResultsProps) => {
  const stats = [
    {
      label: "Кол-во продавцов",
      value: results.sellersCount,
      icon: "👥",
      color: "bg-blue-100 text-blue-800",
    },
    {
      label: "Самая низкая цена",
      value: `${results.lowestPrice.toLocaleString()} ₸`,
      icon: "💰",
      color: "bg-green-100 text-green-800",
    },
    {
      label: "Общий объем продаж",
      value: `${results.totalSales.toLocaleString()} ₸`,
      icon: "📊",
      color: "bg-purple-100 text-purple-800",
    },
    {
      label: "Конкуренция",
      value: results.competition,
      icon: "🥊",
      color: 
        results.competition === "Высокая" ? "bg-red-100 text-red-800" :
        results.competition === "Средняя" ? "bg-yellow-100 text-yellow-800" :
        "bg-green-100 text-green-800",
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <h2 className="text-2xl font-bold">{results.name}</h2>
        <Badge className="text-sm">{results.category}</Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-4 flex items-center space-x-4">
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <span className="text-xl">{stat.icon}</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-xl font-bold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NicheSearchResults;


import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface UnitEconomicsResultsProps {
  results: {
    costPrice: number;
    sellingPrice: number;
    commission: number;
    commissionPercent: number;
    deliveryCost: number;
    profit: number;
  };
}

const UnitEconomicsResults = ({ results }: UnitEconomicsResultsProps) => {
  const isProfitable = results.profit > 0;

  const items = [
    { label: "Себестоимость", value: results.costPrice, color: "text-gray-700" },
    { label: "Цена продажи", value: results.sellingPrice, color: "text-gray-700" },
    { 
      label: "Комиссия Kaspi", 
      value: results.commission, 
      percent: results.commissionPercent, 
      color: "text-rose-600"
    },
    { 
      label: "Стоимость доставки", 
      value: results.deliveryCost, 
      color: "text-amber-600"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-gray-600">{item.label}</span>
            <div className="text-right">
              <span className={item.color}>{item.value.toLocaleString()} ₸</span>
              {item.percent !== undefined && (
                <span className="text-sm text-gray-500 ml-1">({item.percent}%)</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-900">Чистая прибыль</span>
          <motion.span
            key={results.profit}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`font-semibold text-xl ${
              isProfitable ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {results.profit.toLocaleString()} ₸
          </motion.span>
        </div>
      </div>

      <Card className={`border-l-4 ${
        isProfitable 
          ? results.profit > results.costPrice * 0.3
            ? "border-l-emerald-500 bg-emerald-50"
            : "border-l-amber-500 bg-amber-50"
          : "border-l-red-500 bg-red-50"
      }`}>
        <CardContent className="p-4">
          <p className={`${
            isProfitable 
              ? results.profit > results.costPrice * 0.3
                ? "text-emerald-600"
                : "text-amber-600"
              : "text-red-600"
          }`}>
            {isProfitable 
              ? results.profit > results.costPrice * 0.3
                ? "Отличная прибыль! Продукт имеет высокую рентабельность."
                : "Средняя прибыль. Рассмотрите возможности для повышения маржинальности."
              : "Внимание! Данный товар не приносит прибыли. Рассмотрите другие варианты или измените параметры."
            }
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UnitEconomicsResults;

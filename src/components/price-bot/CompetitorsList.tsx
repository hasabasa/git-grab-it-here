
import { useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { mockCompetitors } from "@/data/mockData";
import { Competitor } from "@/types";

interface CompetitorsListProps {
  productId: number;
}

const CompetitorsList = ({ productId }: CompetitorsListProps) => {
  const [competitors, setCompetitors] = useState(
    mockCompetitors.filter(comp => comp.productId === productId)
  );

  const handleSetPrice = (competitorId: number) => {
    console.log("Setting price based on competitor:", competitorId);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {competitors.length > 0 ? (
          competitors.map((competitor) => (
            <motion.div
              key={competitor.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-4 shadow-sm border"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{competitor.name}</h3>
                    <Badge variant="secondary">{competitor.rating.toFixed(1)} ★</Badge>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {competitor.delivery ? "С доставкой" : "Без доставки"} • {competitor.seller}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <div className="flex items-center gap-1">
                      <span className="text-xl font-semibold">{competitor.price.toLocaleString()} ₸</span>
                      {competitor.priceChange > 0 ? (
                        <ArrowUp className="h-4 w-4 text-red-500" />
                      ) : competitor.priceChange < 0 ? (
                        <ArrowDown className="h-4 w-4 text-green-500" />
                      ) : null}
                    </div>
                    {competitor.priceChange !== 0 && (
                      <div className="text-xs text-gray-500">
                        {Math.abs(competitor.priceChange).toLocaleString()} ₸
                      </div>
                    )}
                  </div>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button size="sm" onClick={() => handleSetPrice(competitor.id)}>
                          Стать дешевле
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Установить цену на 1₸ ниже</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            Конкуренты не найдены
          </div>
        )}
      </div>
    </div>
  );
};

export default CompetitorsList;

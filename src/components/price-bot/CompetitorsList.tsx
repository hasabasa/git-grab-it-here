
import { useState, useEffect } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { mockCompetitors } from "@/data/mockData";
import { Competitor } from "@/types";
import { toast } from "sonner";
import { fetchCompetitors, updateProductPrice } from "@/lib/salesUtils";

interface CompetitorsListProps {
  productId: number;
}

const CompetitorsList = ({ productId }: CompetitorsListProps) => {
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null); // В реальном приложении получаем из хранилища

  useEffect(() => {
    // Загрузка конкурентов при изменении выбранного товара
    const loadCompetitors = async () => {
      setIsLoading(true);
      try {
        // Для демонстрации используем мок данные
        const mockData = mockCompetitors.filter(comp => comp.productId === productId);
        setCompetitors(mockData);
        
        // В реальном приложении используем API
        /*
        if (!apiKey) {
          toast.error("API ключ не найден. Пожалуйста, подключите магазин Kaspi");
          return;
        }
        const result = await fetchCompetitors(productId, apiKey);
        setCompetitors(result.data);
        */
      } catch (error) {
        console.error("Error loading competitors:", error);
        toast.error("Ошибка при загрузке конкурентов");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCompetitors();
  }, [productId]);

  const handleSetPrice = async (competitorId: number) => {
    const competitor = competitors.find(c => c.id === competitorId);
    if (!competitor) return;
    
    try {
      // Устанавливаем цену на 1 тенге ниже, чем у конкурента
      const newPrice = competitor.price - 1;
      
      // Для демонстрации показываем уведомление
      toast.success(`Цена обновлена до ${newPrice.toLocaleString()} ₸`);
      
      // В реальном приложении отправляем запрос на обновление цены
      /*
      if (!apiKey) {
        toast.error("API ключ не найден. Пожалуйста, подключите магазин Kaspi");
        return;
      }
      await updateProductPrice(productId, newPrice, apiKey);
      */
      
      // Обновляем UI, чтобы показать, что цена изменилась
      // Этот код для демонстрации, в реальном приложении нужно обновить данные из API
      const updatedCompetitors = competitors.map(c => {
        if (c.id === competitor.id) {
          return { ...c, priceChange: -1 };
        }
        return c;
      });
      setCompetitors(updatedCompetitors);
    } catch (error) {
      console.error("Error updating price:", error);
      toast.error("Ошибка при обновлении цены");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

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

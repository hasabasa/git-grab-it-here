
import { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { mockProducts } from "@/data/mockData";

interface PriceBotSettingsProps {
  productId: string;
  onSave: (settings: any) => void;
}

const PriceBotSettings = ({ productId, onSave }: PriceBotSettingsProps) => {
  const product = mockProducts.find(p => p.id === productId);
  
  const [strategy, setStrategy] = useState("become-first");
  const [minProfit, setMinProfit] = useState(2000);
  const [isActive, setIsActive] = useState(product?.botActive || false);

  // Синхронизируем локальное состояние с данными продукта
  useEffect(() => {
    if (product) {
      setIsActive(product.botActive || product.bot_active || false);
      setMinProfit(product.minProfit || product.min_profit || 2000);
    }
  }, [product]);

  const handleSave = () => {
    onSave({
      productId,
      strategy,
      minProfit,
      isActive,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Стратегия бота</h3>
        <RadioGroup value={strategy} onValueChange={setStrategy} className="space-y-3">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="become-first" id="become-first" />
            <Label htmlFor="become-first" className="font-normal">🥇 Стань первым (на 1 тг дешевле)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="equal-price" id="equal-price" />
            <Label htmlFor="equal-price" className="font-normal">⚖️ Равная цена с конкурентом</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Настройки прибыли</h3>
        
        <div className="space-y-2">
          <Label htmlFor="min-profit">Минимальная прибыль (₸)</Label>
          <Input 
            id="min-profit" 
            type="number" 
            value={minProfit} 
            onChange={(e) => setMinProfit(parseInt(e.target.value))} 
          />
          <p className="text-sm text-gray-500">Бот не опустит цену ниже этого значения прибыли</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Активация бота</h3>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="bot-active" 
            checked={isActive} 
            onCheckedChange={setIsActive} 
          />
          <Label htmlFor="bot-active">Бот активен</Label>
        </div>
      </div>

      <Button onClick={handleSave} className="w-full">Сохранить настройки</Button>
    </div>
  );
};

export default PriceBotSettings;

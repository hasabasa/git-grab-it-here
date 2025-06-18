
import { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Product } from "@/types";

interface PriceBotSettingsProps {
  product: Product;
  onSave: (settings: any) => void;
}

const PriceBotSettings = ({ product, onSave }: PriceBotSettingsProps) => {
  const [strategy, setStrategy] = useState("become-first");
  const [minProfit, setMinProfit] = useState(2000);
  const [isActive, setIsActive] = useState(false);

  // Инициализация состояния при изменении продукта
  useEffect(() => {
    console.log('PriceBotSettings: Initializing for product:', product.id);
    console.log('Product bot state:', product.botActive || product.bot_active);
    
    const botActiveState = product.botActive || product.bot_active || false;
    setIsActive(botActiveState);
    setMinProfit(product.minProfit || product.min_profit || 2000);
  }, [product.id]); // Зависит только от ID продукта

  const handleSave = () => {
    console.log('PriceBotSettings: handleSave called with:');
    console.log('- productId:', product.id);
    console.log('- strategy:', strategy);
    console.log('- minProfit:', minProfit);
    console.log('- isActive:', isActive);
    
    onSave({
      productId: product.id,
      strategy,
      minProfit,
      isActive,
    });
  };

  const handleSwitchChange = (checked: boolean) => {
    console.log('PriceBotSettings: Switch changed to:', checked);
    setIsActive(checked);
  };

  console.log('PriceBotSettings render - isActive:', isActive, 'productId:', product.id);

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
            onCheckedChange={handleSwitchChange}
          />
          <Label htmlFor="bot-active">
            {isActive ? 'Бот активен' : 'Бот выключен'}
          </Label>
        </div>
      </div>

      <Button onClick={handleSave} className="w-full">Сохранить настройки</Button>
    </div>
  );
};

export default PriceBotSettings;

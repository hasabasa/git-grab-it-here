
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockProducts } from "@/data/mockData";

interface PriceBotSettingsProps {
  productId: string;
  onSave: (settings: any) => void;
}

const PriceBotSettings = ({ productId, onSave }: PriceBotSettingsProps) => {
  const product = mockProducts.find(p => p.id === productId);
  
  const [strategy, setStrategy] = useState("become-first");
  const [minProfit, setMinProfit] = useState(2000);
  const [maxProfit, setMaxProfit] = useState(10000);
  const [step, setStep] = useState(1);
  const [updateFrequency, setUpdateFrequency] = useState("immediate");
  const [isActive, setIsActive] = useState(product?.botActive || false);

  const handleSave = () => {
    onSave({
      productId,
      strategy,
      minProfit,
      maxProfit,
      step,
      updateFrequency,
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
        
        <div className="grid gap-4">
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
          
          <div className="space-y-2">
            <Label htmlFor="max-profit">Максимальная прибыль (₸)</Label>
            <Input 
              id="max-profit" 
              type="number" 
              value={maxProfit} 
              onChange={(e) => setMaxProfit(parseInt(e.target.value))} 
            />
            <p className="text-sm text-gray-500">Бот не поднимет цену выше этого значения прибыли</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Дополнительные настройки</h3>
        
        <div className="space-y-2">
          <Label htmlFor="step">Шаг изменения цены (₸)</Label>
          <Input 
            id="step" 
            type="number" 
            value={step} 
            onChange={(e) => setStep(parseInt(e.target.value))} 
            min={1}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="frequency">Частота обновления</Label>
          <Select value={updateFrequency} onValueChange={setUpdateFrequency}>
            <SelectTrigger id="frequency">
              <SelectValue placeholder="Выберите частоту обновления" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="immediate">Немедленная реакция</SelectItem>
              <SelectItem value="hourly">Каждый час</SelectItem>
              <SelectItem value="daily">Раз в день</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
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

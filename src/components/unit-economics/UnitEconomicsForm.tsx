
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { FileText } from "lucide-react";

interface UnitEconomicsFormProps {
  data: {
    costPrice: number;
    sellingPrice: number;
    category: string;
    weight: number;
    deliveryScope: string;
    paymentType: string;
  };
  onChange: (data: any) => void;
}

const UnitEconomicsForm = ({ data, onChange }: UnitEconomicsFormProps) => {
  const handleInputChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const categories = [
    "Автотовары", "Аксессуары", "Аптека", "Бытовая техника",
    "Детские товары", "Книги/Досуг", "Канцелярия", "Компьютеры",
    "Красота и здоровье", "Мебель", "Обувь", "Одежда",
    "Продукты", "ТВ, Аудио, Видео", "Телефоны", "Дом и дача",
    "Животные", "Украшения", "Электроника", "Косметика", "Ремонт", "Спорт"
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="costPrice">
            Себестоимость товара (₸)
          </Label>
          <Input
            id="costPrice"
            type="number"
            value={data.costPrice}
            onChange={(e) => handleInputChange("costPrice", Number(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sellingPrice">
            Цена продажи на Kaspi (₸)
          </Label>
          <Input
            id="sellingPrice"
            type="number"
            value={data.sellingPrice}
            onChange={(e) => handleInputChange("sellingPrice", Number(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Категория товара</Label>
          <Select 
            value={data.category} 
            onValueChange={(value) => handleInputChange("category", value)}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Выберите категорию" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Категории</SelectLabel>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="weight">Вес товара (кг)</Label>
          <Input
            id="weight"
            type="number"
            min="0.1"
            step="0.1"
            value={data.weight}
            onChange={(e) => handleInputChange("weight", Number(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="deliveryScope">Зона доставки</Label>
          <Select 
            value={data.deliveryScope} 
            onValueChange={(value) => handleInputChange("deliveryScope", value)}
          >
            <SelectTrigger id="deliveryScope">
              <SelectValue placeholder="Выберите зону доставки" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="По городу">По городу</SelectItem>
              <SelectItem value="По Казахстану">По Казахстану</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="paymentType">Тип оплаты</Label>
          <Select 
            value={data.paymentType} 
            onValueChange={(value) => handleInputChange("paymentType", value)}
          >
            <SelectTrigger id="paymentType">
              <SelectValue placeholder="Выберите тип оплаты" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Gold">Gold (обычная оплата)</SelectItem>
              <SelectItem value="Red">Kaspi Red</SelectItem>
              <SelectItem value="Kredit">Kaspi Kredit</SelectItem>
              <SelectItem value="Installment">Рассрочка 0-0-12 / 0-0-24</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center mt-6 text-sm text-blue-600 cursor-pointer">
              <FileText className="w-4 h-4 mr-1" />
              <span>Информация о комиссиях Kaspi</span>
            </div>
          </TooltipTrigger>
          <TooltipContent className="max-w-md">
            <p>
              Комиссии рассчитываются в соответствии с официальными тарифами Kaspi.
              В зависимости от категории товара и типа оплаты, применяются разные комиссии.
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default UnitEconomicsForm;

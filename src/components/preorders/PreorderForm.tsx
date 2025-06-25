
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, X } from "lucide-react";
import { toast } from "sonner";

interface PreorderProduct {
  article: string;
  name: string;
  brand: string;
  price: number;
  warehouse1: boolean;
  warehouse3: boolean;
  warehouse4: boolean;
  warehouse5: boolean;
  deliveryDays: number;
}

interface PreorderFormData {
  products: PreorderProduct[];
}

interface PreorderFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (products: PreorderProduct[]) => void;
}

const PreorderForm = ({ isOpen, onClose, onSubmit }: PreorderFormProps) => {
  const { control, handleSubmit, watch, formState: { errors } } = useForm<PreorderFormData>({
    defaultValues: {
      products: [{
        article: "",
        name: "",
        brand: "",
        price: 0,
        warehouse1: false,
        warehouse3: false,
        warehouse4: false,
        warehouse5: false,
        deliveryDays: 1
      }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products"
  });

  const watchedProducts = watch("products");

  const validateWarehouses = (index: number) => {
    const product = watchedProducts[index];
    return product.warehouse1 || product.warehouse3 || product.warehouse4 || product.warehouse5;
  };

  const onFormSubmit = (data: PreorderFormData) => {
    // Validate that each product has at least one warehouse selected
    for (let i = 0; i < data.products.length; i++) {
      if (!validateWarehouses(i)) {
        toast.error(`Товар ${i + 1}: выберите хотя бы один склад`);
        return;
      }
    }

    onSubmit(data.products);
    onClose();
    toast.success(`Добавлено ${data.products.length} товар(ов) в предзаказ`);
  };

  const addProduct = () => {
    append({
      article: "",
      name: "",
      brand: "",
      price: 0,
      warehouse1: false,
      warehouse3: false,
      warehouse4: false,
      warehouse5: false,
      deliveryDays: 1
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-lg shadow-xl p-6 mx-4 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Добавить предзаказ</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          {fields.map((field, index) => (
            <Card key={field.id} className="border-2">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Товар {index + 1}</CardTitle>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`article-${index}`}>Артикул *</Label>
                    <Input
                      id={`article-${index}`}
                      {...control.register(`products.${index}.article`, { required: "Артикул обязателен" })}
                      placeholder="Введите артикул"
                    />
                    {errors.products?.[index]?.article && (
                      <p className="text-sm text-red-500 mt-1">{errors.products[index]?.article?.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor={`name-${index}`}>Название товара *</Label>
                    <Input
                      id={`name-${index}`}
                      {...control.register(`products.${index}.name`, { required: "Название обязательно" })}
                      placeholder="Введите название товара"
                    />
                    {errors.products?.[index]?.name && (
                      <p className="text-sm text-red-500 mt-1">{errors.products[index]?.name?.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor={`brand-${index}`}>Бренд</Label>
                    <Input
                      id={`brand-${index}`}
                      {...control.register(`products.${index}.brand`)}
                      placeholder="Введите бренд (необязательно)"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`price-${index}`}>Цена *</Label>
                    <Input
                      id={`price-${index}`}
                      type="number"
                      step="0.01"
                      {...control.register(`products.${index}.price`, { 
                        required: "Цена обязательна",
                        min: { value: 0.01, message: "Цена должна быть больше 0" }
                      })}
                      placeholder="0.00"
                    />
                    {errors.products?.[index]?.price && (
                      <p className="text-sm text-red-500 mt-1">{errors.products[index]?.price?.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor={`deliveryDays-${index}`}>Срок доставки (дни) *</Label>
                    <Input
                      id={`deliveryDays-${index}`}
                      type="number"
                      {...control.register(`products.${index}.deliveryDays`, { 
                        required: "Срок доставки обязателен",
                        min: { value: 1, message: "Минимум 1 день" }
                      })}
                      placeholder="1"
                    />
                    {errors.products?.[index]?.deliveryDays && (
                      <p className="text-sm text-red-500 mt-1">{errors.products[index]?.deliveryDays?.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">Склады *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                    {[1, 3, 4, 5].map((warehouseNum) => (
                      <div key={warehouseNum} className="flex items-center space-x-2">
                        <Checkbox
                          id={`warehouse${warehouseNum}-${index}`}
                          {...control.register(`products.${index}.warehouse${warehouseNum}` as any)}
                        />
                        <Label htmlFor={`warehouse${warehouseNum}-${index}`}>
                          Склад {warehouseNum}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {!validateWarehouses(index) && watchedProducts[index] && (
                    <p className="text-sm text-red-500 mt-1">Выберите хотя бы один склад</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-between items-center pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={addProduct}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Добавить товар
            </Button>

            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={onClose}>
                Отмена
              </Button>
              <Button type="submit">
                Добавить предзаказ
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PreorderForm;

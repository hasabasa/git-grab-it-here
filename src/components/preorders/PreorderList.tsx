
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

export interface PreorderItem {
  id: string;
  article: string;
  name: string;
  brand: string;
  price: number;
  warehouses: Array<{ id: number; quantity: number }>;
  deliveryDays: number;
  status: "processing" | "added" | "rejected";
  createdAt: Date;
  rejectionReason?: string;
}

interface PreorderListProps {
  items: PreorderItem[];
  onResubmit: (id: string) => void;
}

const PreorderList = ({ items, onResubmit }: PreorderListProps) => {
  const getStatusBadge = (status: PreorderItem["status"]) => {
    switch (status) {
      case "processing":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">В обработке</Badge>;
      case "added":
        return <Badge variant="default" className="bg-green-100 text-green-800">Добавлено</Badge>;
      case "rejected":
        return <Badge variant="destructive">Отклонено</Badge>;
    }
  };

  const formatWarehouseInfo = (warehouses: Array<{ id: number; quantity: number }>) => {
    return warehouses.map(wh => `Склад ${wh.id} (${wh.quantity} шт.)`).join(", ");
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'KZT',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Предзаказы не найдены</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="border rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-muted-foreground">
                Артикул: {item.article} • Бренд: {item.brand}
              </p>
              <p className="text-sm font-medium">{formatPrice(item.price)}</p>
            </div>
            <div className="flex items-center gap-2">
              {getStatusBadge(item.status)}
              {item.status === "rejected" && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onResubmit(item.id)}
                  className="flex items-center gap-1"
                >
                  <RotateCcw className="h-3 w-3" />
                  Повторить
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div>
              <span className="font-medium">Склады: </span>
              <span className="text-muted-foreground">
                {formatWarehouseInfo(item.warehouses)}
              </span>
            </div>
            <div>
              <span className="font-medium">Срок доставки: </span>
              <span className="text-muted-foreground">{item.deliveryDays} дн.</span>
            </div>
          </div>

          {item.rejectionReason && (
            <div className="bg-red-50 border border-red-200 rounded p-3">
              <p className="text-sm text-red-800">
                <span className="font-medium">Причина отклонения: </span>
                {item.rejectionReason}
              </p>
            </div>
          )}

          <div className="text-xs text-muted-foreground">
            Создано {formatDistanceToNow(item.createdAt, { addSuffix: true, locale: ru })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PreorderList;

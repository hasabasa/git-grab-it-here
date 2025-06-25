
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { Clock, CheckCircle, XCircle, RefreshCw, Package, MapPin } from "lucide-react";
import { toast } from "sonner";

export interface PreorderItem {
  id: string;
  article: string;
  name: string;
  brand: string;
  price: number;
  warehouses: number[];
  deliveryDays: number;
  status: "processing" | "rejected" | "added";
  createdAt: Date;
  rejectionReason?: string;
}

interface PreorderListProps {
  items: PreorderItem[];
  onResubmit: (id: string) => void;
}

const ITEMS_PER_PAGE = 10;

const PreorderList = ({ items, onResubmit }: PreorderListProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = items.slice(startIndex, endIndex);

  const getStatusConfig = (status: PreorderItem["status"]) => {
    switch (status) {
      case "processing":
        return {
          label: "В обработке",
          icon: Clock,
          variant: "secondary" as const,
          className: "bg-yellow-100 text-yellow-800"
        };
      case "rejected":
        return {
          label: "Отклонено",
          icon: XCircle,
          variant: "destructive" as const,
          className: "bg-red-100 text-red-800"
        };
      case "added":
        return {
          label: "Добавлен в магазин",
          icon: CheckCircle,
          variant: "default" as const,
          className: "bg-green-100 text-green-800"
        };
      default:
        return {
          label: status,
          icon: Clock,
          variant: "secondary" as const,
          className: "bg-gray-100 text-gray-800"
        };
    }
  };

  const groupedItems = {
    processing: currentItems.filter(item => item.status === "processing"),
    rejected: currentItems.filter(item => item.status === "rejected"),
    added: currentItems.filter(item => item.status === "added")
  };

  const handleResubmit = (id: string) => {
    onResubmit(id);
    toast.success("Товар отправлен на повторную обработку");
  };

  const renderProductCard = (item: PreorderItem) => {
    const statusConfig = getStatusConfig(item.status);
    const StatusIcon = statusConfig.icon;

    return (
      <Card key={item.id} className="mb-4">
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <Badge className={statusConfig.className}>
                  <StatusIcon className="h-3 w-3 mr-1" />
                  {statusConfig.label}
                </Badge>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p><span className="font-medium">Артикул:</span> {item.article}</p>
                {item.brand && <p><span className="font-medium">Бренд:</span> {item.brand}</p>}
                <p><span className="font-medium">Цена:</span> {item.price.toLocaleString()} ₸</p>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3" />
                  <span className="font-medium">Склады:</span>
                  {item.warehouses.map(warehouse => (
                    <Badge key={warehouse} variant="outline" className="text-xs">
                      Склад {warehouse}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <Package className="h-3 w-3" />
                  <span className="font-medium">Срок доставки:</span> {item.deliveryDays} дн.
                </div>
                <p className="text-xs text-gray-500">
                  Добавлен: {item.createdAt.toLocaleDateString('ru-RU')} в {item.createdAt.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              {item.rejectionReason && (
                <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
                  <p className="text-sm text-red-700">
                    <span className="font-medium">Причина отклонения:</span> {item.rejectionReason}
                  </p>
                </div>
              )}
            </div>
            {item.status === "rejected" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleResubmit(item.id)}
                className="ml-4"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Отправить повторно
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderSection = (title: string, items: PreorderItem[], icon: React.ReactNode) => {
    if (items.length === 0) return null;

    return (
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          {icon}
          <h2 className="text-xl font-semibold">{title}</h2>
          <Badge variant="secondary">{items.length}</Badge>
        </div>
        <div className="space-y-3">
          {items.map(renderProductCard)}
        </div>
      </div>
    );
  };

  if (items.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Предзаказов пока нет</h3>
          <p className="text-gray-500">Добавьте ваш первый предзаказ, нажав кнопку "Добавить предзаказ"</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center gap-2 text-blue-700">
          <Clock className="h-5 w-5" />
          <p className="font-medium">Время обработки предзаказа составляет до 24 часов</p>
        </div>
        <p className="text-sm text-blue-600 mt-1">
          Вы получите уведомление о статусе каждого товара после проверки модераторами
        </p>
      </div>

      {renderSection(
        "В обработке", 
        groupedItems.processing, 
        <Clock className="h-5 w-5 text-yellow-600" />
      )}

      {renderSection(
        "Отклонено", 
        groupedItems.rejected, 
        <XCircle className="h-5 w-5 text-red-600" />
      )}

      {renderSection(
        "Добавлен в магазин", 
        groupedItems.added, 
        <CheckCircle className="h-5 w-5 text-green-600" />
      )}

      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => setCurrentPage(page)}
                    isActive={currentPage === page}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default PreorderList;

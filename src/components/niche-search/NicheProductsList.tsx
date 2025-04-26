
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

interface NicheProductsListProps {
  products: any[];
}

const NicheProductsList = ({ products }: NicheProductsListProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Фильтруем товары по поисковому запросу
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          className="pl-10"
          placeholder="Поиск товаров..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="space-y-3">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-lg">{product.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{product.category}</Badge>
                        <Badge variant={
                          product.competition === "Высокая" ? "destructive" :
                          product.competition === "Средняя" ? "secondary" : "default"
                        }>
                          {product.competition}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Продажи</p>
                      <p className="font-bold text-lg">{product.totalSales.toLocaleString()} ₸</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Цена от</p>
                      <p className="font-medium">{product.lowestPrice.toLocaleString()} ₸</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Продавцов</p>
                      <p className="font-medium">{product.sellersCount}</p>
                    </div>
                    <div className="space-y-1 md:text-right md:col-span-1">
                      <p className="text-sm text-muted-foreground">Потенциальная прибыль</p>
                      <p className="font-medium">{Math.round(product.totalSales * 0.15).toLocaleString()} ₸</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="text-center p-10">
            <p className="text-gray-500">По вашему запросу ничего не найдено.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NicheProductsList;

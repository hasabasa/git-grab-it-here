
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types";

interface ProductListProps {
  products: Product[];
  activeProductId: number | null;
  onProductSelect: (productId: number) => void;
}

const ProductList = ({ products, activeProductId, onProductSelect }: ProductListProps) => {
  if (products.length === 0) {
    return <div className="text-center py-6 text-gray-500">Товары не найдены</div>;
  }

  return (
    <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
      {products.map((product) => (
        <motion.div
          key={product.id}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => onProductSelect(product.id)}
          className={`p-3 rounded-xl cursor-pointer transition-all ${
            activeProductId === product.id
              ? 'bg-primary text-primary-foreground'
              : 'bg-card hover:bg-gray-100'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-lg bg-gray-200 mr-3 overflow-hidden">
                {product.image && (
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <div>
                <div className="font-medium line-clamp-2">{product.name}</div>
                <div className="text-sm mt-1 flex items-center">
                  <span className={activeProductId === product.id ? 'text-primary-foreground' : 'text-gray-500'}>
                    {product.price.toLocaleString()} ₸
                  </span>
                  <Badge 
                    variant={product.botActive ? 'default' : 'outline'} 
                    className="ml-2 text-xs"
                  >
                    {product.botActive ? 'Активен' : 'Пауза'}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductList;

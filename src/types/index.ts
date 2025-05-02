export interface KaspiStore {
  id: string;
  merchant_id: string;
  merchantId?: string; // для совместимости со старым кодом
  name: string;
  api_key?: string;
  products_count: number;
  productsCount?: number; // для совместимости со старым кодом
  last_sync?: string | null;
  lastSync?: string | null; // для совместимости со старым кодом
  is_active: boolean;
  isActive?: boolean; // для совместимости со старым кодом
  user_id: string;
  userId?: string; // для совместимости со старым кодом
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  image_url?: string;
  botActive?: boolean;
  bot_active?: boolean;
  minProfit?: number;
  min_profit?: number;
  maxProfit?: number;
  max_profit?: number;
  storeName?: string;
  store_id?: string;
  category?: string;
  kaspi_product_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Competitor {
  id: string;
  product_id: string;
  productId?: string;
  name: string;
  price: number;
  priceChange?: number;
  price_change?: number;
  rating?: number;
  delivery?: boolean;
  has_delivery?: boolean;
  seller?: string;
  seller_name?: string;
  created_at?: string;
  updated_at?: string;
}

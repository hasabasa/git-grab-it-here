
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

// Adding missing interfaces based on error messages

export interface SalesData {
  date: string;
  count: number;
  amount: number;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  client: string;
  type: string;
  reminderType: string;
  dueDate?: string;
  status: "pending" | "completed" | "overdue";
  createdAt: string;
}

export interface Niche {
  name: string;
  category: string;
  sellersCount: number;
  lowestPrice: number;
  totalSales: number;
  competition: string;
  chartData: {
    month: string;
    demand: number;
    supply: number;
  }[];
}

export interface KaspiCommission {
  category: string;
  commission: string;
}

export interface DeliveryRate {
  city: string;
  rate: number;
}

// Новые интерфейсы для модуля WhatsApp
export interface WhatsAppContact {
  id: string;
  name: string;
  phone: string;
  company?: string;
  tags: string[];
  lastMessage?: string;
  lastMessageDate?: string;
  status: "active" | "inactive";
  createdAt: string;
}

export interface MessageTemplate {
  id: string;
  name: string;
  content: string;
  category: string;
  isDefault: boolean;
}

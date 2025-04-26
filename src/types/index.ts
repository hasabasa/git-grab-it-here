
export interface KaspiStore {
  id: string;
  merchantId: string;
  name: string;
  userId: string; // Добавляем привязку к пользователю
  productsCount: number;
  lastSync: string;
  isActive: boolean;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
  category: string;
  botActive: boolean;
  minProfit?: number;
  maxProfit?: number;
}

export interface Competitor {
  id: number;
  productId: number;
  name: string;
  price: number;
  priceChange: number;
  rating: number;
  delivery: boolean;
  seller: string;
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

export interface SalesData {
  date: string;
  count: number;
  amount: number;
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
  range: string;
  rate: number;
}

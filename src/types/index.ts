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

export interface SalesData {
  date: string;
  count: number;
  amount: number;
}

export interface TopProduct {
  id: number;
  name: string;
  quantity: number;
  totalAmount: number;
  averagePrice: number;
}

export interface KaspiCommission {
  category: string;
  commission: number | string;
}

export interface DeliveryRate {
  weight: string;
  cityRate: number;
  countryRate: number;
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
  competition: "Низкая" | "Средняя" | "Высокая";
  chartData: Array<{
    month: string;
    demand: number;
    supply: number;
  }>;
}

export interface KaspiStore {
  id: string;
  merchantId: string;
  name: string;
  productsCount: number;
  lastSync: string;
  isActive: boolean;
}

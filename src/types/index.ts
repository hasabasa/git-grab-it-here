
export interface KaspiStore {
  id: string;
  merchantId: string;
  name: string;
  userId: string; // Добавляем привязку к пользователю
  productsCount: number;
  lastSync: string;
  isActive: boolean;
}

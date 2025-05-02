
import { Product, Competitor, Task, Niche, SalesData } from "@/types";

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "iPhone 13 128GB",
    price: 385000,
    image: "https://resources.cdn-kaspi.kz/shop/medias/sys_master/images/images/h49/hc0/46392662523934/apple-iphone-13-128gb-cernyj-102298404-1-Container.jpg",
    category: "Телефоны",
    botActive: true,
    minProfit: 5000,
    maxProfit: 25000,
  },
  {
    id: "2",
    name: "Samsung Galaxy S21 FE",
    price: 297000,
    image: "https://resources.cdn-kaspi.kz/shop/medias/sys_master/images/images/h00/h18/62349965877278/samsung-galaxy-s21-fe-sm-g990-44900-256gb-zelenyj-103993386-1.jpg",
    category: "Телефоны",
    botActive: false,
  },
  {
    id: "3",
    name: "Apple Watch Series 7",
    price: 195000,
    image: "https://resources.cdn-kaspi.kz/shop/medias/sys_master/images/images/h1a/h69/63158968057886/apple-watch-series-7-41-mm-cernyj-102582811-1.jpg",
    category: "Аксессуары",
    botActive: true,
    minProfit: 3000,
    maxProfit: 15000,
  },
  {
    id: "4",
    name: "MacBook Air M1 13.3 2020",
    price: 499900,
    image: "https://resources.cdn-kaspi.kz/shop/medias/sys_master/images/images/h65/h0f/33125684084766/apple-macbook-air-2020-13-3-mgn63-seryj-100797845-1-Container.jpg",
    category: "Компьютеры",
    botActive: false,
  },
  {
    id: "5",
    name: "AirPods Pro",
    price: 89990,
    image: "https://resources.cdn-kaspi.kz/shop/medias/sys_master/images/images/hb6/h3d/46637140508702/apple-airpods-pro-belyj-4804718-1-Container.jpg",
    category: "Аксессуары",
    botActive: true,
    minProfit: 2000,
    maxProfit: 10000,
  }
];

export const mockCompetitors: Competitor[] = [
  {
    id: "101",
    product_id: "1",
    productId: "1",
    name: "iPhone 13 128GB Черный",
    price: 387500,
    priceChange: 2500,
    rating: 5.0,
    delivery: true,
    seller: "MediaMarket",
  },
  {
    id: "102",
    product_id: "1",
    productId: "1",
    name: "iPhone 13 128GB Черный",
    price: 390000,
    priceChange: 0,
    rating: 4.9,
    delivery: true,
    seller: "iPoint",
  },
  {
    id: "103",
    product_id: "1",
    productId: "1",
    name: "iPhone 13 128GB Черный",
    price: 384000,
    priceChange: -1000,
    rating: 4.7,
    delivery: false,
    seller: "Digital Store",
  },
  {
    id: "104",
    product_id: "3",
    productId: "3",
    name: "Apple Watch Series 7 41mm",
    price: 199000,
    priceChange: 0,
    rating: 4.9,
    delivery: true,
    seller: "Apple City",
  },
  {
    id: "105",
    product_id: "3",
    productId: "3",
    name: "Apple Watch Series 7 41mm",
    price: 193000,
    priceChange: -2000,
    rating: 4.5,
    delivery: true,
    seller: "iCenter",
  },
  {
    id: "106",
    product_id: "5",
    productId: "5",
    name: "AirPods Pro",
    price: 92000,
    priceChange: 2010,
    rating: 4.8,
    delivery: true,
    seller: "AppleWorld",
  }
];

export const mockSalesData: SalesData[] = [
  { date: "2023-03-01", count: 5, amount: 1500000 },
  { date: "2023-03-02", count: 3, amount: 950000 },
  { date: "2023-03-03", count: 7, amount: 2100000 },
  { date: "2023-03-04", count: 2, amount: 780000 },
  { date: "2023-03-05", count: 4, amount: 1200000 },
  { date: "2023-03-06", count: 6, amount: 1750000 },
  { date: "2023-03-07", count: 3, amount: 900000 },
  { date: "2023-03-08", count: 8, amount: 2400000 },
  { date: "2023-03-09", count: 5, amount: 1500000 },
  { date: "2023-03-10", count: 4, amount: 1350000 },
  { date: "2023-03-11", count: 6, amount: 1800000 },
  { date: "2023-03-12", count: 3, amount: 950000 },
  { date: "2023-03-13", count: 5, amount: 1650000 },
  { date: "2023-03-14", count: 7, amount: 2050000 }
];

export const mockTopProducts = [
  { id: 1, name: "iPhone 13 128GB", quantity: 25, totalAmount: 9625000, averagePrice: 385000 },
  { id: 2, name: "Samsung Galaxy S21 FE", quantity: 18, totalAmount: 5346000, averagePrice: 297000 },
  { id: 3, name: "MacBook Air M1", quantity: 12, totalAmount: 5998800, averagePrice: 499900 },
  { id: 4, name: "AirPods Pro", quantity: 30, totalAmount: 2699700, averagePrice: 89990 },
  { id: 5, name: "Apple Watch Series 7", quantity: 15, totalAmount: 2925000, averagePrice: 195000 },
  { id: 6, name: "iPad Air", quantity: 10, totalAmount: 2490000, averagePrice: 249000 },
  { id: 7, name: "Samsung Galaxy Tab S7", quantity: 8, totalAmount: 1752000, averagePrice: 219000 },
  { id: 8, name: "Sony PlayStation 5", quantity: 5, totalAmount: 1745000, averagePrice: 349000 },
  { id: 9, name: "Xiaomi Mi Robot Vacuum", quantity: 7, totalAmount: 889000, averagePrice: 127000 },
  { id: 10, name: "JBL Charge 5", quantity: 12, totalAmount: 779880, averagePrice: 64990 }
];

export const mockGoldCommissions = [
  { category: "Автотовары", commission: "12%" },
  { category: "Аксессуары", commission: "12-15%" },
  { category: "Аптека", commission: "7-12%" },
  { category: "Бытовая техника", commission: "12%" },
  { category: "Детские товары", commission: "12%" },
  { category: "Книги/Досуг", commission: "12%" },
  { category: "Канцелярия", commission: "12%" },
  { category: "Компьютеры", commission: "12%" },
  { category: "Красота и здоровье", commission: "12%" },
  { category: "Мебель", commission: "12%" },
  { category: "Обувь", commission: "12%" },
  { category: "Одежда", commission: "12%" },
  { category: "Продукты", commission: "7%" },
  { category: "ТВ, Аудио, Видео", commission: "12-15%" },
  { category: "Телефоны", commission: "12-15%" },
  { category: "Дом и дача", commission: "12%" },
  { category: "Животные", commission: "7-12%" },
  { category: "Украшения", commission: "15%" },
  { category: "Электроника", commission: "12-15%" },
];

export const mockRedKreditCommissions = [
  { category: "Автотовары", commission: "7%/7%" },
  { category: "Аксессуары", commission: "10%/10%" },
  { category: "Аптека", commission: "5%/5%" },
  { category: "Косметика", commission: "10%/10%" },
  { category: "Мебель", commission: "7%/7%" },
  { category: "Продукты", commission: "5%/5%" },
  { category: "Ремонт", commission: "7%/7%" },
  { category: "Спорт", commission: "10%/10%" },
  { category: "Дом", commission: "10%/10%" },
  { category: "Электроника", commission: "7%/7%" },
  { category: "Одежда", commission: "10%/10%" },
  { category: "Обувь", commission: "10%/10%" },
  { category: "Украшения", commission: "10%/10%" },
  { category: "Прочее", commission: "12.5%/12.5%" },
];

export const mockInstallmentCommissions = [
  { category: "Все категории", commission: "15%" }
];

export const mockTasks: Task[] = [
  {
    id: 1,
    title: "Позвонить клиенту после доставки",
    description: "Узнать о впечатлениях от товара и сервиса доставки",
    client: "Асан Мухамедов",
    type: "call",
    reminderType: "none",
    dueDate: "2023-03-15T10:00:00Z",
    status: "completed",
    createdAt: "2023-03-13T12:00:00Z"
  },
  {
    id: 2,
    title: "Напомнить о брошенной корзине",
    description: "Клиент добавил iPhone 13 Pro, но не завершил покупку",
    client: "Мадина Алиева",
    type: "followup",
    reminderType: "whatsapp",
    dueDate: "2023-03-16T14:00:00Z",
    status: "pending",
    createdAt: "2023-03-14T09:30:00Z"
  },
  {
    id: 3,
    title: "Предложить кросс-продажу",
    description: "Предложить чехол и защитное стекло к недавно купленному смартфону",
    client: "Руслан Жанибеков",
    type: "crosssell",
    reminderType: "telegram",
    dueDate: "2023-03-14T16:00:00Z",
    status: "overdue",
    createdAt: "2023-03-12T11:15:00Z"
  },
  {
    id: 4,
    title: "Позвонить клиенту после доставки",
    description: "Проверить удовлетворенность заказом MacBook Air",
    client: "Гульнара Сатпаева",
    type: "call",
    reminderType: "none",
    dueDate: "2023-03-17T11:30:00Z",
    status: "pending",
    createdAt: "2023-03-15T08:45:00Z"
  },
  {
    id: 5,
    title: "Обработать возврат",
    description: "Клиент запросил возврат наушников из-за дефекта",
    client: "Арман Искаков",
    type: "custom",
    reminderType: "push",
    dueDate: "2023-03-15T13:00:00Z",
    status: "pending",
    createdAt: "2023-03-14T15:20:00Z"
  }
];

export const mockNiches: Niche[] = [
  {
    name: "iPhone 13",
    category: "Смартфоны",
    sellersCount: 42,
    lowestPrice: 379000,
    totalSales: 168000000,
    competition: "Высокая",
    chartData: [
      { month: "Октябрь", demand: 1800, supply: 40 },
      { month: "Ноябрь", demand: 2200, supply: 45 },
      { month: "Декабрь", demand: 3500, supply: 50 },
      { month: "Январь", demand: 3000, supply: 47 },
      { month: "Февраль", demand: 2700, supply: 44 },
      { month: "Март", demand: 2500, supply: 42 }
    ]
  },
  {
    name: "Беспроводные наушники",
    category: "Аксессуары",
    sellersCount: 86,
    lowestPrice: 5990,
    totalSales: 43500000,
    competition: "Высокая",
    chartData: [
      { month: "Октябрь", demand: 2200, supply: 70 },
      { month: "Ноябрь", demand: 2500, supply: 76 },
      { month: "Декабрь", demand: 3600, supply: 82 },
      { month: "Январь", demand: 3200, supply: 85 },
      { month: "Февраль", demand: 2900, supply: 86 },
      { month: "Март", demand: 2700, supply: 86 }
    ]
  },
  {
    name: "Робот-пылесос",
    category: "Бытовая техника",
    sellersCount: 38,
    lowestPrice: 49990,
    totalSales: 28500000,
    competition: "Средняя",
    chartData: [
      { month: "Октябрь", demand: 800, supply: 32 },
      { month: "Ноябрь", demand: 950, supply: 34 },
      { month: "Декабрь", demand: 1200, supply: 36 },
      { month: "Январь", demand: 1100, supply: 37 },
      { month: "Февраль", demand: 950, supply: 38 },
      { month: "Март", demand: 900, supply: 38 }
    ]
  },
  {
    name: "Массажный пистолет",
    category: "Красота и здоровье",
    sellersCount: 23,
    lowestPrice: 12990,
    totalSales: 6800000,
    competition: "Низкая",
    chartData: [
      { month: "Октябрь", demand: 300, supply: 15 },
      { month: "Ноябрь", demand: 350, supply: 18 },
      { month: "Декабрь", demand: 450, supply: 20 },
      { month: "Январь", demand: 520, supply: 22 },
      { month: "Февраль", demand: 580, supply: 23 },
      { month: "Март", demand: 600, supply: 23 }
    ]
  }
];

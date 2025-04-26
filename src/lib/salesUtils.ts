
import { SalesData } from "@/types";
import { format, isAfter, isBefore, parseISO, startOfMonth, startOfWeek, startOfDay } from "date-fns";
import { ru } from "date-fns/locale";

// Format date for chart display
export const formatDateForChart = (dateString: string, timeFrame: string) => {
  const date = new Date(dateString);
  
  switch (timeFrame) {
    case "daily":
      return format(date, "d MMM", { locale: ru });
    case "weekly":
      return `${format(date, "d MMM", { locale: ru })}`;
    case "monthly":
      return format(date, "MMM yyyy", { locale: ru });
    default:
      return dateString;
  }
};

// Filter sales data by date range
export const filterDataByDateRange = (data: SalesData[], dateRange: { from?: Date; to?: Date }) => {
  if (!dateRange.from && !dateRange.to) return data;
  
  return data.filter(item => {
    const itemDate = new Date(item.date);
    
    if (dateRange.from && dateRange.to) {
      return isAfter(itemDate, dateRange.from) && isBefore(itemDate, dateRange.to);
    } else if (dateRange.from) {
      return isAfter(itemDate, dateRange.from);
    } else if (dateRange.to) {
      return isBefore(itemDate, dateRange.to);
    }
    
    return true;
  });
};

// Aggregate data by time frame (daily, weekly, monthly)
export const aggregateDataByTimeFrame = (data: SalesData[], timeFrame: string) => {
  if (!data.length) return [];
  
  const aggregated: Record<string, { date: string; count: number; amount: number }> = {};
  
  data.forEach(item => {
    const date = new Date(item.date);
    let key: string;
    
    switch (timeFrame) {
      case "weekly":
        key = format(startOfWeek(date, { weekStartsOn: 1 }), "yyyy-MM-dd");
        break;
      case "monthly":
        key = format(startOfMonth(date), "yyyy-MM");
        break;
      case "daily":
      default:
        key = format(startOfDay(date), "yyyy-MM-dd");
        break;
    }
    
    if (!aggregated[key]) {
      aggregated[key] = {
        date: key,
        count: 0,
        amount: 0
      };
    }
    
    aggregated[key].count += item.count;
    aggregated[key].amount += item.amount;
  });
  
  return Object.values(aggregated).sort((a, b) => a.date.localeCompare(b.date));
};

// Calculate total sales amount
export const calculateTotalSales = (data: SalesData[]) => {
  return data.reduce((sum, item) => sum + item.amount, 0);
};

// Calculate average order value
export const calculateAverageOrderValue = (data: SalesData[]) => {
  const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);
  const totalCount = data.reduce((sum, item) => sum + item.count, 0);
  
  return totalCount > 0 ? Math.round(totalAmount / totalCount) : 0;
};

// Calculate total orders count
export const calculateTotalOrders = (data: SalesData[]) => {
  return data.reduce((sum, item) => sum + item.count, 0);
};

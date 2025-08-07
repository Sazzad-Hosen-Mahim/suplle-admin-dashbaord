// src/types/adminAnalyticsTypes.ts

export interface TimePeriodStats {
  orders: number;
  sales: number;
}

export interface MonthlyStat {
  month: string;
  sales: number;
  orders: number;
}

export interface DayWiseWeekStat {
  date: string;
  sales: number;
  orders: number;
}

export interface AdminAnalyticsData {
  totalUsers: number;
  totalOrders: number;
  completedOrders: number;
  totalRestaurants: number;
  last12Months: TimePeriodStats;
  last6Months: TimePeriodStats;
  last30Days: TimePeriodStats;
  last7Days: TimePeriodStats;
  monthlyStats: MonthlyStat[];
  dayWiseWeekStats: DayWiseWeekStat[];
}

export interface AdminAnalyticsState {
  loading: boolean;
  error: string | null;
  data: AdminAnalyticsData | null;
}

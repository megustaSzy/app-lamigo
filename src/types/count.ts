export type Counts = {
  totalUsers: number;
  totalDestinations: number;
  totalCategories: number;
  totalRegions: number;
  totalOrders: number;
};

export type ChartItem = {
  name: string;
  value: number;
};

export type StatsData = {
  counts: Counts;
  chartData: ChartItem[];
};

export type StatsResponse = {
  status: number;
  message: string;
  data: StatsData;
};

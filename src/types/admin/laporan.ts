export interface DailyStat {
  date: string;
  orders: number;
  revenue: number;
}

export interface DestinationStat {
  destinationName: string;
  _count: {
    id: number;
  };
  _sum: {
    totalPrice: number;
    quantity: number;
  };
}

export interface PaymentMethodStat {
  paymentMethod: string;
  _count: {
    id: number;
  };
  _sum: {
    totalPrice: number;
  };
}

export interface PaymentStatusStat {
  paymentStatus: string;
  _count: {
    id: number;
  };
}

export interface TransactionItem {
  id: number;
  userName: string;
  destinationName: string;
  quantity: number;
  totalPrice: number;
  paymentMethod: string;
  paymentStatus: string;
  date: string;
}

export interface SalesReportResponse {
  status: number;
  message: string;
  data: {
    header: {
      startDate: string;
      endDate: string;
      generatedAt: string;
    };
    summary: {
      totalOrders: number;
      totalTickets: number;
      totalRevenue: number;
      avgOrderValue: number;
    };
    dailyStats: DailyStat[];
    byDestination: DestinationStat[];
    byPaymentMethod: PaymentMethodStat[];
    paymentStatus: PaymentStatusStat[];
    transactions: TransactionItem[];
  };
}

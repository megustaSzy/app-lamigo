export interface OrderData {
  id: number;
  userId: number;
  scheduleId: number;
  quantity: number;
  totalPrice: number;
  userName: string;
  userPhone: string;
  destinationName: string;
  destinationPrice: number;
  date: string;              
  time: string;
  ticketCode: string;
  ticketUrl: string | null;
  isPaid: boolean;
  paymentStatus: "pending" | "paid" | "failed";
  paymentMethod: string | null;
  transactionId: string | null;
  snapToken: string | null;
  snapRedirectUrl: string | null;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface OrderResponse {
  status: number;
  message: string;
  data: OrderData;
}

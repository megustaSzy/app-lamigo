// types/admin/admin-orders.ts

export type AdminOrderItem = {
  id: number;
  quantity: number;
  totalPrice: number;

  userEmail: string;
  userPhone: string;

  destinationName: string;
  pickupLocationName: string;

  date: string; // ISO string
  departureTime: string;
  returnTime: string;

  ticketCode: string;

  paymentStatus: "pending" | "paid" | "failed" | "expired";
  paymentMethod: "qris" | "bank_transfer" | "gopay" | "credit_card";
  isPaid: boolean;
};

export type AdminOrdersResponse = {
  status: number;
  message: string;
  data: {
    total_items: number;
    total_pages: number;
    current_page: number;
    limit: number;
    items: AdminOrderItem[];
  };
};

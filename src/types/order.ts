import { Ticket } from "@/types/ticket";

export interface OrderUser {
  id: number;
  name: string;
  email: string;
}

export interface OrderItem {
  id: number;
  name: string;
  qty: number;
  price: number;
}

export interface Order {
  id: number;
  user: OrderUser;
  items: OrderItem[];
  total: number;
  status: "PENDING" | "PAID" | "CANCELLED";
  createdAt: string;
}

export interface OrdersResponse {
  status: number;
  message: string;
  data: {
    items: Order[];
    total_items: number;
    total_pages: number;
    current_page: number;
    limit: number;
  };
}

export type OrdersMeResponse = {
  status: number;
  message: string;
  data: {
    total_items: number;
    total_pages: number;
    current_page: number;
    limit: number;
    items: Ticket[];
    links: {
      prev: string | null;
      next: string | null;
    };
  };
};

export type Ticket = {
  no: number;
  id: number;
  ticketCode: string;
  destinationName: string;
  pickupLocationName: string;
  date: string;
  departureTime: string;
  returnTime: string;
  quantity: number;
  totalPrice: number;
  paymentStatus: "paid" | "pending" | "failed" | "expired";
  isPaid: boolean;
  createdAt: string;
};

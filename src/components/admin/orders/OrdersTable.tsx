"use client";

import type { AdminOrderItem } from "@/types/admin/admin-orders";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Ticket,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Users,
  Banknote,
  CreditCard,
} from "lucide-react";

type Props = {
  orders: AdminOrderItem[];
};

export default function OrdersTable({ orders }: Props) {
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-gray-500 text-sm">Tidak ada pesanan</p>
      </div>
    );
  }

  const getPaymentStatusBadge = (status: string, isPaid: boolean) => {
    if (isPaid || status === "paid") {
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          Lunas
        </Badge>
      );
    }

    const statusMap = {
      pending: {
        label: "Pending",
        className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      },
      failed: {
        label: "Gagal",
        className: "bg-red-100 text-red-800 hover:bg-red-100",
      },
      expired: {
        label: "Kadaluarsa",
        className: "bg-gray-100 text-gray-800 hover:bg-gray-100",
      },
    };

    const config =
      statusMap[status as keyof typeof statusMap] || statusMap.pending;

    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getPaymentMethodLabel = (method: string) => {
    const methodMap = {
      qris: "QRIS",
      bank_transfer: "Transfer Bank",
      gopay: "GoPay",
      credit_card: "Kartu Kredit",
    };
    return methodMap[method as keyof typeof methodMap] || method;
  };

  return (
    <div className="overflow-x-auto rounded-lg border bg-white">
      <Table className="min-w-[1400px]">
        <TableHeader>
          <TableRow className="bg-gray-50 hover:bg-gray-50">
            <TableHead className="w-16 px-4 py-3 text-center font-semibold">
              No
            </TableHead>
            <TableHead className="px-4 py-3 text-center font-semibold min-w-[140px]">
              Ticket
            </TableHead>
            <TableHead className="px-4 py-3 text-center font-semibold min-w-[220px]">
              Email
            </TableHead>
            <TableHead className="px-4 py-3 text-center font-semibold min-w-[150px]">
              No HP
            </TableHead>
            <TableHead className="px-4 py-3 text-center font-semibold min-w-[180px]">
              Tujuan
            </TableHead>
            <TableHead className="px-4 py-3 text-center font-semibold min-w-[180px]">
              Pickup
            </TableHead>
            <TableHead className="px-4 py-3 text-center font-semibold min-w-[140px]">
              Tanggal
            </TableHead>
            <TableHead className="px-4 py-3 text-center font-semibold min-w-[160px]">
              Jam
            </TableHead>
            <TableHead className="w-20 px-4 py-3 text-center font-semibold">
              Qty
            </TableHead>
            <TableHead className="px-4 py-3 text-center font-semibold min-w-[160px]">
              Total
            </TableHead>
            <TableHead className="px-4 py-3 text-center font-semibold min-w-[160px]">
              Metode
            </TableHead>
            <TableHead className="w-32 px-4 py-3 text-center font-semibold">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders.map((o, index) => (
            <TableRow
              key={o.id}
              className="hover:bg-gray-50/60 transition-colors"
            >
              <TableCell className="px-4 py-3 text-center">
                <Badge variant="outline" className="font-normal">
                  {index + 1}
                </Badge>
              </TableCell>

              <TableCell className="px-4 py-3 text-center font-medium text-gray-900">
                <div className="flex items-center justify-center gap-2">
                  <Ticket className="h-4 w-4 text-blue-600 shrink-0" />
                  {o.ticketCode}
                </div>
              </TableCell>

              <TableCell className="px-4 py-3 text-center text-gray-600">
                <div className="flex items-center justify-center gap-2 max-w-[220px] mx-auto">
                  <Mail className="h-4 w-4 text-gray-400 shrink-0" />
                  <span className="truncate" title={o.userEmail}>
                    {o.userEmail}
                  </span>
                </div>
              </TableCell>

              <TableCell className="px-4 py-3 text-center text-gray-600 whitespace-nowrap">
                <div className="flex items-center justify-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400 shrink-0" />
                  {o.userPhone}
                </div>
              </TableCell>

              <TableCell className="px-4 py-3 text-center font-medium text-gray-900">
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="h-4 w-4 text-red-600 shrink-0" />
                  {o.destinationName}
                </div>
              </TableCell>

              <TableCell className="px-4 py-3 text-center text-gray-600">
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400 shrink-0" />
                  {o.pickupLocationName}
                </div>
              </TableCell>

              <TableCell className="px-4 py-3 text-center text-gray-600 whitespace-nowrap">
                <div className="flex items-center justify-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400 shrink-0" />
                  {new Date(o.date).toLocaleDateString("id-ID")}
                </div>
              </TableCell>

              <TableCell className="px-4 py-3 text-center text-gray-600">
                <div className="flex items-center justify-center gap-2 whitespace-nowrap">
                  <Clock className="h-4 w-4 text-gray-400 shrink-0" />
                  {o.departureTime} - {o.returnTime}
                </div>
              </TableCell>

              <TableCell className="px-4 py-3 text-center">
                <Badge variant="secondary" className="gap-1">
                  <Users className="h-3.5 w-3.5" />
                  {o.quantity}
                </Badge>
              </TableCell>

              <TableCell className="px-4 py-3 text-center">
                <div className="flex items-center justify-center gap-2">
                  <Banknote className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-gray-900">
                    Rp {o.totalPrice.toLocaleString("id-ID")}
                  </span>
                </div>
              </TableCell>

              <TableCell className="px-4 py-3 text-center text-gray-600">
                <div className="flex items-center justify-center gap-2">
                  <CreditCard className="h-4 w-4 text-gray-400 shrink-0" />
                  {getPaymentMethodLabel(o.paymentMethod)}
                </div>
              </TableCell>

              <TableCell className="px-4 py-3 text-center">
                {getPaymentStatusBadge(o.paymentStatus, o.isPaid)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ReportTable } from "./ReportTable";
import {
  Calendar,
  MapPin,
  CreditCard,
  CheckCircle,
  Receipt,
} from "lucide-react";

export function ReportTabs({ report, view, setView }: any) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="border-b">
        <div className="text-center md:text-left">
          <CardTitle className="text-gray-800">Detail Laporan</CardTitle>
          <CardDescription>
            Lihat breakdown berdasarkan kategori yang berbeda
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <Tabs value={view} onValueChange={setView}>
          {/* TABS LIST - Centered and Responsive */}
          <div className="flex justify-center mb-6">
            <TabsList className="inline-grid grid-cols-2 md:grid-cols-5 gap-1 w-full md:w-auto bg-gray-100 p-1">
              <TabsTrigger
                value="daily"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center gap-2 px-4"
              >
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Harian</span>
                <span className="sm:hidden">Daily</span>
              </TabsTrigger>

              <TabsTrigger
                value="destination"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center gap-2 px-4"
              >
                <MapPin className="h-4 w-4" />
                <span className="hidden sm:inline">Destinasi</span>
                <span className="sm:hidden">Dest</span>
              </TabsTrigger>

              <TabsTrigger
                value="paymentMethod"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center gap-2 px-4"
              >
                <CreditCard className="h-4 w-4" />
                <span className="hidden sm:inline">Metode</span>
                <span className="sm:hidden">Pay</span>
              </TabsTrigger>

              <TabsTrigger
                value="paymentStatus"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center gap-2 px-4"
              >
                <CheckCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Status</span>
                <span className="sm:hidden">Sts</span>
              </TabsTrigger>

              <TabsTrigger
                value="transactions"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center gap-2 px-4 col-span-2 md:col-span-1"
              >
                <Receipt className="h-4 w-4" />
                <span>Transaksi</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* TAB CONTENTS */}
          <TabsContent value="daily" className="mt-0">
            <ReportTable
              headers={["Tanggal", "Order", "Revenue"]}
              rows={report.dailyStats.map((d: any) => [
                new Date(d.date).toLocaleDateString("id-ID"),
                d.orders,
                `Rp ${d.revenue.toLocaleString("id-ID")}`,
              ])}
            />
          </TabsContent>

          <TabsContent value="destination" className="mt-0">
            <ReportTable
              headers={["Destinasi", "Order", "Tiket", "Revenue"]}
              rows={report.byDestination.map((d: any) => [
                d.destinationName,
                d._count.id,
                d._sum.quantity,
                `Rp ${d._sum.totalPrice.toLocaleString("id-ID")}`,
              ])}
            />
          </TabsContent>

          <TabsContent value="paymentMethod" className="mt-0">
            <ReportTable
              headers={["Metode", "Order", "Revenue"]}
              rows={report.byPaymentMethod.map((p: any) => [
                p.paymentMethod,
                p._count.id,
                `Rp ${p._sum.totalPrice.toLocaleString("id-ID")}`,
              ])}
            />
          </TabsContent>

          <TabsContent value="paymentStatus" className="mt-0">
            <ReportTable
              headers={["Status", "Jumlah"]}
              rows={report.paymentStatus.map((p: any) => [
                p.paymentStatus,
                p._count.id,
              ])}
            />
          </TabsContent>

          <TabsContent value="transactions" className="mt-0">
            <ReportTable
              headers={[
                "Tanggal",
                "User",
                "Destinasi",
                "Qty",
                "Total",
                "Metode",
                "Status",
              ]}
              rows={report.transactions.map((t: any) => [
                new Date(t.date).toLocaleDateString("id-ID"),
                t.userName,
                t.destinationName,
                t.quantity,
                `Rp ${t.totalPrice.toLocaleString("id-ID")}`,
                t.paymentMethod,
                t.paymentStatus,
              ])}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

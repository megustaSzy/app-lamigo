"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import NavBar from "@/app/components/NavBar";
import Footer from "@/app/components/Footer";
import { apiFetch } from "@/helpers/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Phone,
  MapPin,
  Ticket,
  Download,
} from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { TicketDetail } from "@/types/ticket-detail";
import Cookies from "js-cookie";

function DetailSkeleton() {
  return (
    <Card className="shadow-lg border-gray-200">
      <CardContent className="p-6 space-y-5">
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-56" />
          <Skeleton className="h-5 w-28 rounded-full" />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div className="flex flex-col items-center gap-3">
            <Skeleton className="w-44 h-44 rounded-xl" />
            <Skeleton className="h-4 w-40" />
          </div>

          <div className="space-y-3">
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="w-4 h-4 text-blue-600 mt-0.5" />
      <div>
        <p className="text-[11px] text-gray-500 leading-none">{label}</p>
        <p className="font-medium text-gray-900 leading-tight">{value}</p>
      </div>
    </div>
  );
}

export default function TicketDetailPage() {
  const { id } = useParams();
  const [ticket, setTicket] = useState<TicketDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await apiFetch<{ data: TicketDetail }>(
          `/api/orders/${id}/ticket`,
        );
        setTicket(res.data);
      } catch (err) {
        console.error("Gagal ambil detail tiket", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const handleDownloadPDF = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/orders/${id}/ticket/pdf`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        },
      );

      if (!res.ok) {
        throw new Error("Gagal download tiket");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `tiket-${ticket?.ticketCode}.pdf`;
      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download PDF gagal:", err);
      alert("Gagal mengunduh tiket.");
    }
  };

  return (
    <>
      <NavBar />

      <div className="bg-gradient-to-b from-blue-200 via-blue-100 to-blue-50 min-h-screen pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-6 space-y-5">
          {/* BACK */}
          <Link
            href="/tiket"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 hover:text-blue-800"
          >
            <ArrowLeft size={18} />
            Kembali ke Tiket Saya
          </Link>

          {loading && <DetailSkeleton />}

          {!loading && !ticket && (
            <Card className="shadow-lg border-gray-200">
              <CardContent className="p-10 flex flex-col items-center text-center gap-3">
                <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
                  <Ticket className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Tiket Tidak Ditemukan
                </h3>
                <p className="text-sm text-gray-500">
                  Tiket tidak tersedia atau telah dihapus.
                </p>
                <Button asChild className="mt-2 rounded-lg">
                  <Link href="/tiket">Kembali</Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {!loading && ticket && (
            <Card className="shadow-lg border border-gray-200 overflow-hidden">
              {/* HEADER */}
              <div className="bg-white border-b px-5 py-3 flex justify-between items-center">
                <div>
                  <h1 className="text-lg font-bold text-gray-900">
                    {ticket.destinationName}
                  </h1>
                  <p className="text-xs text-gray-500">E-Ticket Resmi</p>
                </div>

                {/* <Badge
                  className={
                    ticket.isPaid
                      ? "bg-green-100 text-green-700 border border-green-200"
                      : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                  }
                >
                  {ticket.isPaid ? "Sudah Dibayar" : "Belum Dibayar"}
                </Badge> */}
              </div>

              <CardContent className="p-5 space-y-5">
                {/* QR + INFO */}
                <div className="grid md:grid-cols-5 gap-5">
                  {/* QR */}
                  <div className="md:col-span-2 flex flex-col items-center gap-2">
                    <div className="border rounded-lg p-3">
                      <QRCodeCanvas
                        value={ticket.ticketCode}
                        size={160}
                        fgColor="#000000" // hitam
                      />
                    </div>
                    <p className="text-sm font-semibold tracking-widest">
                      {ticket.ticketCode}
                    </p>
                    <p className="text-xs text-gray-500">Scan saat check-in</p>
                  </div>

                  {/* INFO */}
                  <div className="md:col-span-3 space-y-4 text-sm">
                    <InfoRow
                      icon={MapPin}
                      label="Titik Keberangkatan"
                      value={ticket.pickupLocationName}
                    />
                    <InfoRow
                      icon={MapPin}
                      label="Tujuan"
                      value={ticket.destinationName}
                    />
                    <InfoRow
                      icon={Calendar}
                      label="Tanggal"
                      value={formatDate(ticket.date)}
                    />
                    <InfoRow
                      icon={Clock}
                      label="Jam Berangkat"
                      value={`${ticket.departureTime} WIB`}
                    />
                    <InfoRow
                      icon={Clock}
                      label="Jam Kepulangan"
                      value={`${ticket.returnTime} WIB`}
                    />
                    <InfoRow icon={User} label="Nama" value={ticket.userName} />
                    <InfoRow
                      icon={Phone}
                      label="No. Telepon"
                      value={ticket.userPhone}
                    />
                  </div>
                </div>

                {/* HARGA */}
                <div className="border-t pt-3 space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span>Harga Tiket</span>
                    <span>
                      Rp {ticket.destinationPrice.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Jumlah</span>
                    <span>{ticket.quantity} tiket</span>
                  </div>
                  <div className="flex justify-between font-bold border-t pt-2">
                    <span>Total</span>
                    <span className="text-blue-600">
                      Rp {ticket.totalPrice.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>

                {/* INFO PENTING */}
                <div className="border-t pt-3">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">
                    Informasi Penting
                  </h3>
                  <ul className="list-disc pl-4 space-y-0.5 text-xs text-gray-600">
                    <li>Datang 15 menit sebelum keberangkatan</li>
                    <li>Tunjukkan QR code saat check-in</li>
                    <li>Tiket tidak dapat direfund</li>
                    <li>Simpan tiket hingga perjalanan selesai</li>
                  </ul>
                </div>

                {/* FOOTER */}
                <div className="flex flex-col sm:flex-row justify-between gap-2 border-t pt-3">
                  <p className="text-xs text-gray-500">
                    Dipesan:{" "}
                    {new Date(ticket.createdAt).toLocaleString("id-ID")}
                  </p>

                  <Button
                    onClick={handleDownloadPDF}
                    className="rounded-lg gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Download size={16} />
                    Download Tiket
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

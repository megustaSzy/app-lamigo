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

type TicketDetail = {
  ticketCode: string;
  isPaid: boolean;
  userName: string;
  userPhone: string;
  destinationName: string;
  destinationPrice: number;
  quantity: number;
  totalPrice: number;
  date: string;
  departureTime: string;
  createdAt: string;
};

function DetailSkeleton() {
  return (
    <Card className="shadow-lg border-blue-100">
      <CardContent className="p-8 space-y-8">
        <div className="flex justify-between items-center">
          <Skeleton className="h-7 w-64" />
          <Skeleton className="h-6 w-32 rounded-full" />
        </div>

        <div className="grid sm:grid-cols-2 gap-8">
          <div className="flex flex-col items-center gap-4">
            <Skeleton className="w-52 h-52 rounded-2xl" />
            <Skeleton className="h-4 w-48" />
          </div>

          <div className="space-y-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={i} className="h-5 w-full" />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
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

  return (
    <>
      <NavBar />

      <div className="bg-gradient-to-b from-blue-200 via-blue-100 to-blue-50 min-h-screen pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          {/* BACK BUTTON */}
          <Link
            href="/tiket"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 hover:text-blue-900 transition-colors"
          >
            <ArrowLeft size={18} />
            Kembali ke Tiket Saya
          </Link>

          {/* LOADING STATE */}
          {loading && <DetailSkeleton />}

          {/* ERROR STATE */}
          {!loading && !ticket && (
            <Card className="shadow-lg border-blue-100">
              <CardContent className="p-12 flex flex-col items-center text-center gap-4">
                <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center">
                  <Ticket className="w-10 h-10 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Tiket Tidak Ditemukan
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Tiket yang Anda cari tidak tersedia atau telah dihapus.
                  </p>
                </div>
                <Button
                  asChild
                  className="mt-2 rounded-xl bg-blue-600 hover:bg-blue-700"
                >
                  <Link href="/tiket">Kembali ke Tiket Saya</Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* MAIN CONTENT */}
          {!loading && ticket && (
            <>
              {/* TICKET CARD */}
              <Card className="shadow-lg border-blue-100 overflow-hidden">
                {/* Header with gradient */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-2xl font-bold mb-1">
                        {ticket.destinationName}
                      </h1>
                      <p className="text-blue-100 text-sm">E-Ticket Digital</p>
                    </div>
                    <Badge
                      className={
                        ticket.isPaid
                          ? "bg-green-500 hover:bg-green-500 text-white"
                          : "bg-yellow-500 hover:bg-yellow-500 text-white"
                      }
                    >
                      {ticket.isPaid ? "✓ Sudah Dibayar" : "⏳ Belum Dibayar"}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-8">
                  {/* QR CODE & INFO SECTION */}
                  <div className="grid md:grid-cols-5 gap-8 items-start">
                    {/* QR CODE - 2 columns */}
                    <div className="md:col-span-2 flex flex-col items-center gap-4">
                      <div className="bg-white p-6 rounded-2xl shadow-md border-2 border-blue-100">
                        <QRCodeCanvas
                          value={ticket.ticketCode}
                          size={200}
                          bgColor="#ffffff"
                          fgColor="#1e40af"
                          level="H"
                          imageSettings={{
                            src: "",
                            x: undefined,
                            y: undefined,
                            height: 0,
                            width: 0,
                            excavate: true,
                          }}
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-medium text-gray-600 mb-1">
                          Kode Tiket
                        </p>
                        <p className="text-lg font-bold text-blue-700 tracking-wider">
                          {ticket.ticketCode}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          Tunjukkan QR code ini saat check-in
                        </p>
                      </div>
                    </div>

                    {/* TICKET INFO - 3 columns */}
                    <div className="md:col-span-3 space-y-5">
                      {/* Destination */}
                      <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
                        <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-600 font-medium mb-1">
                            Tujuan
                          </p>
                          <p className="text-base font-semibold text-gray-900">
                            {ticket.destinationName}
                          </p>
                        </div>
                      </div>

                      {/* Date & Time */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
                          <Calendar className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-gray-600 font-medium mb-1">
                              Tanggal Kunjungan
                            </p>
                            <p className="text-sm font-semibold text-gray-900">
                              {formatDate(ticket.date)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
                          <Clock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-gray-600 font-medium mb-1">
                              Waktu Keberangkatan
                            </p>
                            <p className="text-sm font-semibold text-gray-900">
                              {ticket.departureTime} WIB
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* User Info */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
                          <User className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-gray-600 font-medium mb-1">
                              Nama Pemesan
                            </p>
                            <p className="text-sm font-semibold text-gray-900">
                              {ticket.userName}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
                          <Phone className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-gray-600 font-medium mb-1">
                              No. Telepon
                            </p>
                            <p className="text-sm font-semibold text-gray-900">
                              {ticket.userPhone}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Price Info */}
                      <div className="border-t border-blue-100 pt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Harga per tiket</span>
                          <span className="font-medium text-gray-900">
                            Rp {ticket.destinationPrice.toLocaleString("id-ID")}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Jumlah tiket</span>
                          <span className="font-medium text-gray-900">
                            {ticket.quantity} tiket
                          </span>
                        </div>
                        <div className="flex justify-between text-base pt-2 border-t border-blue-100">
                          <span className="font-semibold text-gray-900">
                            Total Pembayaran
                          </span>
                          <span className="font-bold text-blue-700 text-lg">
                            Rp {ticket.totalPrice.toLocaleString("id-ID")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex justify-between items-center mt-8 pt-6 border-t border-blue-100">
                    <p className="text-xs text-gray-500">
                      Dipesan pada:{" "}
                      {new Date(ticket.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <Button className="rounded-xl bg-blue-600 hover:bg-blue-700 gap-2">
                      <Download size={16} />
                      Download Tiket
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* INFO CARD */}
              <Card className="shadow-md border-blue-100 bg-gradient-to-br from-blue-50 to-white">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    📋 Informasi Penting
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex gap-2">
                      <span className="text-blue-600">•</span>
                      <span>
                        Harap datang 15 menit sebelum waktu keberangkatan
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600">•</span>
                      <span>
                        Tunjukkan QR code dan identitas diri saat check-in
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600">•</span>
                      <span>
                        Tiket tidak dapat direfund setelah tanggal kunjungan
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600">•</span>
                      <span>
                        Simpan screenshot tiket ini untuk berjaga-jaga
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

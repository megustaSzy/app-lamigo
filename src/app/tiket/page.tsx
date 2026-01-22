"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { apiFetch } from "@/helpers/api";
import { TicketX } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Ticket } from "@/types/ticket";
import { OrdersMeResponse } from "@/types/order";
import Cookies from "js-cookie";

function TicketItemSkeleton() {
  return (
    <Card className="border-gray-200 shadow-sm">
      <CardContent className="p-4 flex justify-between items-center">
        {/* Kiri: Judul & Tanggal */}
        <div className="space-y-2">
          {/* Judul Destinasi */}
          <Skeleton className="h-5 w-48 rounded-md" />
          {/* Tanggal & Kode */}
          <div className="flex gap-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>

        {/* Kanan: Badge & Tombol */}
        <div className="flex items-center gap-3">
          {/* Badge Status */}
          <Skeleton className="h-6 w-24 rounded-full" />
          {/* Tombol Lihat */}
          <Skeleton className="h-9 w-20 rounded-xl" />
        </div>
      </CardContent>
    </Card>
  );
}

// Skeleton untuk State Belum Login (Besar & Vertikal)
function UnauthSkeleton() {
  return (
    <Card className="shadow-sm border-dashed">
      <CardContent className="p-14 flex flex-col items-center text-center gap-5">
        {/* Icon Circle */}
        <Skeleton className="w-20 h-20 rounded-full" />

        {/* Text Content */}
        <div className="space-y-3 w-full flex flex-col items-center">
          <Skeleton className="h-6 w-64" />
          <Skeleton className="h-4 w-80" />
          <Skeleton className="h-4 w-40" />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-4">
          <Skeleton className="h-10 w-36 rounded-xl" />
          <Skeleton className="h-10 w-36 rounded-xl" />
        </div>
      </CardContent>
    </Card>
  );
}

const statusMap: Record<string, Ticket["paymentStatus"]> = {
  "Sudah Dibayar": "paid",
  "Menunggu Konfirmasi": "pending",
  Gagal: "failed",
  Kedaluwarsa: "expired",
};

export default function TiketPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  // State untuk paginasi
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const PAGE_LIMIT = 5;

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const token = Cookies.get("accessToken");
    setIsUserLoggedIn(!!token);
  }, []);

  useEffect(() => {
    if (!isMounted) return; // Tunggu mount selesai

    setLoading(true);

    // Jika tidak ada token, set data kosong & stop loading
    if (!isUserLoggedIn) {
      setTickets([]);
      setTotalPages(1);
      setTimeout(() => setLoading(false), 500);
      return;
    }

    const fetchTickets = async () => {
      try {
        const res = await apiFetch<OrdersMeResponse>(
          `/api/orders/me?page=${page}&limit=${PAGE_LIMIT}`,
        );
        setTickets(res.data.items);
        setTotalPages(res.data.total_pages);
      } catch (error) {
        console.error("Gagal ambil tiket", error);
        setTickets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [page, isUserLoggedIn, isMounted]);

  // Reset page saat filter berubah
  useEffect(() => {
    setPage(1);
  }, [query, statusFilter]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tickets
      .filter((t) =>
        statusFilter === "all"
          ? true
          : t.paymentStatus === statusMap[statusFilter],
      )
      .filter(
        (t) =>
          !q ||
          t.destinationName.toLowerCase().includes(q) ||
          t.ticketCode.toLowerCase().includes(q) ||
          t.date.includes(q),
      );
  }, [tickets, query, statusFilter]);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("id-ID", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const statusBadge = (status: Ticket["paymentStatus"]) => {
    if (status === "paid")
      return "bg-green-50 text-green-700 hover:bg-green-50";
    if (status === "pending")
      return "bg-yellow-50 text-yellow-700 hover:bg-yellow-50";
    if (status === "failed") return "bg-red-50 text-red-700 hover:bg-red-50";
    return "bg-gray-100 text-gray-600 hover:bg-gray-100";
  };

  const statusLabel = (status: Ticket["paymentStatus"]) => {
    if (status === "paid") return "Sudah Dibayar";
    if (status === "pending") return "Menunggu Konfirmasi";
    if (status === "failed") return "Gagal";
    return "Kedaluwarsa";
  };

  if (!isMounted) {
    return (
      <>
        <NavBar />
        <div className="bg-linear-to-b via-blue-200 from-blue-200 to-blue-50 min-h-screen pt-28 pb-16">
          <div className="max-w-4xl mx-auto px-6">
            <h1 className="text-3xl font-semibold text-gray-900 mb-8">
              Tiket Saya
            </h1>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Input
                value=""
                disabled
                placeholder="Cari destinasi, kode, atau tanggal..."
                className="flex-1 p-3 rounded-xl border-gray-300 bg-white"
              />
              <Select disabled value="all">
                <SelectTrigger className="w-full sm:w-[240px] p-3 rounded-xl border-gray-300 bg-white">
                  <SelectValue placeholder="Semua Status" />
                </SelectTrigger>
              </Select>
            </div>

            <div className="space-y-4 min-h-[420px]">
              <UnauthSkeleton />
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar />

      <div className="bg-linear-to-b via-blue-200 from-blue-200 to-blue-50 min-h-screen pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl font-semibold text-gray-900 mb-8">
            Tiket Saya
          </h1>

          {/* SEARCH & FILTER */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari destinasi, kode, atau tanggal..."
              className="flex-1 p-3 rounded-xl border-gray-300 bg-white focus:ring-2 focus:ring-blue-300"
            />

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[240px] p-3 rounded-xl border-gray-300 bg-white focus:ring-2 focus:ring-blue-300">
                <SelectValue placeholder="Semua Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="Sudah Dibayar">Sudah Dibayar</SelectItem>
                <SelectItem value="Menunggu Konfirmasi">
                  Menunggu Konfirmasi
                </SelectItem>
                <SelectItem value="Gagal">Gagal</SelectItem>
                <SelectItem value="Kedaluwarsa">Kedaluwarsa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* CONTENT AREA */}
          <div className="space-y-4 min-h-[420px]">
            {loading && !isUserLoggedIn && <UnauthSkeleton />}

            {loading && isUserLoggedIn && (
              <>
                {Array.from({ length: PAGE_LIMIT }).map((_, i) => (
                  <TicketItemSkeleton key={i} />
                ))}
              </>
            )}

            {!loading && !isUserLoggedIn && (
              <Card className="shadow-sm border-dashed">
                <CardContent className="p-14 flex flex-col items-center text-center gap-5">
                  <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
                    <TicketX className="w-10 h-10 text-blue-600" />
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Login untuk melihat tiketmu
                    </h3>
                    <p className="text-sm text-gray-500 mt-2 max-w-md">
                      Kamu perlu masuk terlebih dahulu untuk melihat daftar
                      tiket dan riwayat perjalanan yang pernah kamu pesan.
                    </p>
                  </div>

                  <div className="flex gap-3 mt-4">
                    <Button
                      asChild
                      className="rounded-xl bg-blue-600 hover:bg-blue-700"
                    >
                      <Link href="/login">Login Sekarang</Link>
                    </Button>

                    <Button asChild variant="outline" className="rounded-xl">
                      <Link href="/#destination">Lihat Destinasi</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* KONDISI 4: TIDAK LOADING + SUDAH LOGIN + DATA KOSONG (UI Asli Empty) */}
            {!loading && isUserLoggedIn && filtered.length === 0 && (
              <Card className="shadow-sm">
                <CardContent className="p-12 flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
                    <TicketX className="w-8 h-8 text-blue-500" />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Belum ada tiket
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Tiket perjalanan kamu akan muncul di sini setelah
                      pemesanan berhasil atau coba ubah filter pencarian.
                    </p>
                  </div>

                  <Button
                    asChild
                    className="mt-2 rounded-xl bg-blue-600 hover:bg-blue-700"
                  >
                    <Link href="/#destination">Cari Destinasi</Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {!loading &&
              isUserLoggedIn &&
              filtered.map((t) => (
                <Card
                  key={t.id}
                  className="border-gray-200 transition-all duration-200 hover:border-blue-400 hover:shadow-md"
                >
                  <CardContent className="p-4 flex justify-between items-center">
                    {/* KIRI */}
                    <div>
                      <h2 className="text-base font-semibold text-gray-900">
                        {t.destinationName}
                      </h2>
                      <p className="text-xs text-gray-500">
                        {formatDate(t.date)} • Kode{" "}
                        <span className="font-medium text-gray-700">
                          {t.ticketCode}
                        </span>
                      </p>
                    </div>

                    {/* KANAN */}
                    <div className="flex items-center gap-3">
                      <Badge
                        variant="secondary"
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge(
                          t.paymentStatus,
                        )}`}
                      >
                        {statusLabel(t.paymentStatus)}
                      </Badge>

                      <Link href={`/tiket/${t.id}`}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-xl"
                        >
                          Lihat
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>

          {/* PAGINATION (Hanya muncul jika user login, tidak loading, dan ada banyak data) */}
          {!loading && isUserLoggedIn && totalPages > 1 && (
            <div className="flex items-center justify-between mt-10">
              <p className="text-sm text-gray-500">
                Halaman {page} dari {totalPages}
              </p>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="rounded-xl"
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Sebelumnya
                </Button>

                <Button
                  variant="outline"
                  className="rounded-xl"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Selanjutnya
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

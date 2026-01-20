"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";

export default function KelolaTiketAdmin() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      nama: "Faiz",
      telp: "08123456789",
      destinasi: "Pantai Sari Ringgung",
      tanggal: "20 Nov 2025",
      waktu: "10:00 WIB",
      jumlah: 2,
      harga: 25000,
      bukti: "/bukti-transfer.jpg",
      paid: false,
      ticketCode: "",
    },
  ]);

  function confirmPayment(id: number) {
    setOrders(
      orders.map((o) =>
        o.id === id
          ? {
              ...o,
              paid: true,
              ticketCode: `TIK-${Date.now()}`,
            }
          : o
      )
    );
  }

  function deleteOrder(id: number) {
    setOrders(orders.filter((o) => o.id !== id));
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Kelola Tiket</h1>

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-slate-50 text-left">
              <th className="py-3 px-4 font-medium">Pemesan</th>
              <th className="py-3 px-4 font-medium">Destinasi</th>
              <th className="py-3 px-4 font-medium">Tanggal</th>
              <th className="py-3 px-4 font-medium">Jumlah</th>
              <th className="py-3 px-4 font-medium">Total Harga</th>
              <th className="py-3 px-4 font-medium">Bukti</th>
              <th className="py-3 px-4 font-medium text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr
                key={o.id}
                className="border-b hover:bg-slate-50 transition"
              >
                {/* PEMESAN */}
                <td className="py-3 px-4">
                  <div className="space-y-1">
                    <p className="font-medium">{o.nama}</p>
                    <p className="text-xs text-gray-600">{o.telp}</p>
                  </div>
                </td>

                {/* DESTINASI */}
                <td className="py-3 px-4">{o.destinasi}</td>

                {/* TANGGAL & WAKTU */}
                <td className="py-3 px-4">
                  <p>{o.tanggal}</p>
                  <p className="text-xs text-gray-600">{o.waktu}</p>
                </td>

                {/* JUMLAH */}
                <td className="py-3 px-4">{o.jumlah} Tiket</td>

                {/* TOTAL */}
                <td className="py-3 px-4 font-medium">
                  Rp {o.jumlah * o.harga}
                </td>

                {/* BUKTI */}
                <td className="py-3 px-4">
                  <Image
                    src={o.bukti}
                    alt="Bukti Transfer"
                    width={60}
                    height={60}
                    className="rounded border object-cover"
                  />
                </td>

                {/* AKSI */}
                <td className="py-3 px-4 w-[220px]">
                  <div className="flex justify-center gap-2">

                    {!o.paid ? (
                      <Button
                        size="sm"
                        className="min-w-[110px]"
                        onClick={() => confirmPayment(o.id)}
                      >
                        Konfirmasi
                      </Button>
                    ) : (
                      <span className="text-green-600 font-semibold text-sm">
                        Terkonfirmasi ✓
                      </span>
                    )}

                    <Button
                      size="sm"
                      variant="destructive"
                      className="min-w-[80px]"
                      onClick={() => deleteOrder(o.id)}
                    >
                      Hapus
                    </Button>
                  </div>

                  {o.paid && (
                    <p className="text-xs text-gray-600 mt-2 text-center">
                      Kode: <b>{o.ticketCode}</b>
                    </p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

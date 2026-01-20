"use client";

import Link from "next/link";
import React from "react";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-4">
      <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-10 max-w-2xl w-full text-center animate-fade-in">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
          👋 Selamat Datang, Admin
        </h1>

        <p className="text-gray-700 text-lg sm:text-xl mb-8">
          Kelola sistem Anda dengan mudah, cepat, dan aman dari satu dashboard.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/admin/manajemen-pengguna">
            <button className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition">
              Kelola Data Pengguna
            </button>
          </Link>

          <Link href="/admin/laporan">
            <button className="px-6 py-3 rounded-xl bg-gray-900 text-white font-semibold shadow-lg hover:bg-gray-800 transition">
              Lihat Laporan
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

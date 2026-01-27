"use client";

import Link from "next/link";
import React from "react";
import { Users, FileText, LayoutDashboard } from "lucide-react";

export default function AdminDashboard() {
  const menuItems = [
    {
      title: "Kelola Data Pengguna",
      description: "Manajemen pengguna dan hak akses",
      href: "/admin/manajemen-pengguna",
      icon: Users,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Lihat Laporan",
      description: "Statistik dan analisis sistem",
      href: "/admin/laporan",
      icon: FileText,
      color: "from-purple-500 to-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
              <LayoutDashboard className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Selamat Datang, Admin
          </h1>
          <p className="text-gray-600 text-lg">
            Kelola dan pantau sistem melalui dashboard admin
          </p>
        </div>

        {/* Menu Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {menuItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <div className="group bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="text-center">
                  <div
                    className={`inline-block p-4 bg-gradient-to-br ${item.color} rounded-lg group-hover:scale-110 transition-transform duration-300 mb-4`}
                  >
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg p-8 text-white max-w-4xl mx-auto">
          <h3 className="text-lg font-semibold mb-2 text-center">
            🚀 Quick Actions
          </h3>
          <p className="text-indigo-100 text-sm mb-6 text-center">
            Akses cepat untuk tugas yang sering dilakukan
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/admin/pesanan">
              <button className="px-5 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors backdrop-blur-sm">
                Lihat Daftar Pesanan
              </button>
            </Link>
            <Link href="/admin/testimoni">
              <button className="px-5 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors backdrop-blur-sm">
                Kelola Testimoni
              </button>
            </Link>
            <Link href="/admin/log-aktivitas"></Link>
            <button className="px-5 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors backdrop-blur-sm">
              Log Aktivitas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Mountain,
  Tags,
  MapPin,
  Users,
  FileText,
  ShoppingCart,
  MessageSquareQuote,
  Image,
  CalendarHeart,
  FunnelPlus,
  PiggyBank,
  ChevronDown,
} from "lucide-react";

export default function Sidebar({ isOpen }: { isOpen: boolean }) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const menu = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      title: "Destinasi",
      href: "/admin/destinasi",
      icon: <Mountain size={18} />,
    },
    {
      title: "Kategori Wisata",
      href: "/admin/kategori-wisata",
      icon: <Tags size={18} />,
    },
    {
      title: "Kategori Kabupaten",
      href: "/admin/kategori-kabupaten",
      icon: <MapPin size={18} />,
    },
    {
      title: "Lokasi Penjemputan",
      href: "/admin/pickup-penjemputan",
      icon: <MapPin size={18} />,
    },
    {
      title: "Pesanan",
      href: "/admin/pesanan",
      icon: <ShoppingCart size={18} />,
    },
    {
      title: "Pengguna",
      href: "/admin/manajemen-pengguna",
      icon: <Users size={18} />,
    },
    {
      title: "Laporan",
      href: "/admin/laporan",
      icon: <FileText size={18} />,
    },
    {
      title: "Pengelola Testimoni",
      href: "/admin/testimoni",
      icon: <MessageSquareQuote size={18} />,
    },
    {
      title: "Konten",
      icon: <Image size={18} />,
      children: [
        {
          title: "Manajemen Card",
          href: "/admin/konten",
          icon: <Image size={16} />,
        },
        {
          title: "Pengelola About",
          href: "/admin/about",
          icon: <FunnelPlus size={16} />,
        },
        {
          title: "Pengelola Value",
          href: "/admin/value",
          icon: <CalendarHeart size={16} />,
        },
        {
          title: "Team",
          href: "/admin/team",
          icon: <PiggyBank size={16} />,
        },
      ],
    },
  ];

  return (
    <aside
      className={`
        fixed left-0 top-0 h-full z-40 
        bg-blue-800 text-white shadow-xl w-64
        transition-transform duration-300 ease-in-out border-r border-blue-700
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        flex flex-col
      `}
    >
      {/* HEADER */}
      <div className="h-20 flex flex-col items-center justify-center border-b border-blue-700/50 bg-blue-900/20">
        <h1 className="text-2xl font-bold tracking-wide">Admin Panel</h1>
        <p className="text-xs text-blue-200 uppercase tracking-wider mt-1">
          LamiGo System
        </p>
      </div>

      {/* MENU */}
      <nav className="flex-1 flex flex-col gap-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-transparent">
        {menu.map((m) => {
          if (m.children) {
            const isOpenDropdown = openMenu === m.title;
            // Cek jika salah satu children aktif untuk highlight parent
            const isChildActive = m.children.some(
              (child) => pathname === child.href,
            );

            return (
              <div key={m.title} className="mb-1">
                <button
                  onClick={() => setOpenMenu(isOpenDropdown ? null : m.title)}
                  className={`flex w-full items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group
                    ${isOpenDropdown || isChildActive ? "bg-blue-700 text-white font-medium shadow-sm" : "hover:bg-blue-700/50 text-blue-100"}
                  `}
                >
                  <div className="flex items-center gap-3">
                    {m.icon}
                    <span className="text-sm">{m.title}</span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${
                      isOpenDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* AREA ANAK MENU (DROPDOWN) */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpenDropdown
                      ? "max-h-96 opacity-100 mt-2"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {/* Container dengan garis pinggir (border-left) untuk hierarki visual */}
                  <div className="ml-5 pl-3 border-l-2 border-blue-500/30 flex flex-col gap-1">
                    {m.children.map((child) => {
                      const isActive = pathname === child.href;
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200
                                ${
                                  isActive
                                    ? "bg-white/10 text-white font-medium translate-x-1"
                                    : "text-blue-200 hover:text-white hover:bg-blue-700/30 hover:translate-x-1"
                                }`}
                        >
                          {/* Dot Indicator untuk item aktif */}
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-blue-300" : "bg-transparent"}`}
                          ></span>
                          {child.title}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          }

          const isActive = pathname === m.href;
          return (
            <Link
              key={m.href}
              href={m.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 mb-1
                ${
                  isActive
                    ? "bg-blue-600 shadow-md text-white font-medium"
                    : "text-blue-100 hover:bg-blue-700/50 hover:text-white"
                }`}
            >
              {m.icon}
              <span className="text-sm">{m.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

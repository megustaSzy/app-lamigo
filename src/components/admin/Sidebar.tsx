"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
} from "lucide-react";

export default function Sidebar({ isOpen }: { isOpen: boolean }) {
  const pathname = usePathname();

  const menu = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: <LayoutDashboard size={16} />,
    },
    {
      title: "Destinasi",
      href: "/admin/destinasi",
      icon: <Mountain size={16} />,
    },
    {
      title: "Kategori Wisata",
      href: "/admin/kategori-wisata",
      icon: <Tags size={16} />,
    },
    {
      title: "Kategori Kabupaten",
      href: "/admin/kategori-kabupaten",
      icon: <MapPin size={16} />,
    },
    {
      title: "Pickup",
      href: "/admin/pickup-penjemputan",
      icon: <MapPin size={16} />,
    },
    {
      title: "Pemesanan",
      href: "/admin/pesanan",
      icon: <ShoppingCart size={16} />,
    },
    {
      title: "Pengguna",
      href: "/admin/manajemen-pengguna",
      icon: <Users size={16} />,
    },
    { title: "Laporan", href: "/admin/laporan", icon: <FileText size={16} /> },
    {
      title: "Pengelola Testimoni",
      href: "/admin/testimoni",
      icon: <MessageSquareQuote size={16} />,
    },
    {
      title: "Pengelola Konten",
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
  ];

  return (
    <aside
      className={`
        fixed left-0 top-0 h-full z-40 
        bg-blue-700 text-white p-5 shadow-lg w-64
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        flex flex-col
      `}
    >
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <p className="text-xs opacity-80">LamiGo</p>
      </div>

      <nav className="flex-1 flex flex-col gap-2 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-800">
        {menu.map((m) => (
          <Link
            key={m.href}
            href={m.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
              pathname === m.href ? "bg-blue-500 shadow" : "hover:bg-blue-600"
            }`}
          >
            {m.icon}
            <span className="text-sm">{m.title}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}

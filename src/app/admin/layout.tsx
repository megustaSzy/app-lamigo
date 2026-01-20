"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Sidebar from "@/components/admin/Sidebar";

const TopBar = dynamic(() => import("@/components/admin/TopBar"), {
  ssr: false,
});

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex">
      {/* SIDEBAR */}
      <Sidebar isOpen={open} />

      {/* MAIN CONTENT */}
      <div
        className={`
          w-full min-h-screen bg-gray-50
          transition-all duration-300 ease-in-out
          ${open ? "ml-64" : "ml-0"}
        `}
      >
        <TopBar toggleSidebar={() => setOpen(!open)} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

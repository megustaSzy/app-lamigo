"use client";

import { SummaryCard } from "./SummaryCard";
import { ShoppingCart, Ticket, Banknote, TrendingUp } from "lucide-react";

export function ReportSummary({ summary }: { summary: any }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <SummaryCard
        label="Total Order"
        value={summary.totalOrders}
        icon={<ShoppingCart />}
        color="blue"
      />
      <SummaryCard
        label="Total Tiket"
        value={summary.totalTickets}
        icon={<Ticket />}
        color="purple"
      />
      <SummaryCard
        label="Revenue"
        value={`Rp ${summary.totalRevenue.toLocaleString("id-ID")}`}
        icon={<Banknote />}
        color="green"
      />
      <SummaryCard
        label="Avg Order"
        value={`Rp ${summary.avgOrderValue.toLocaleString("id-ID")}`}
        icon={<TrendingUp />}
        color="orange"
      />
    </div>
  );
}

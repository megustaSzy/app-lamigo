"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import StatsCards from "@/components/admin/dashboard/StatsCards";
import ChartsSection from "@/components/admin/dashboard/ChartsSection";
import QuickStats from "@/components/admin/dashboard/QuickStats";

import { Counts, ChartItem, StatsResponse } from "@/types/count";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchStats(): Promise<StatsResponse> {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL tidak ditemukan");
  }

  const res = await fetch(`${API_URL}/api/count`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Gagal mengambil data dashboard");
  }

  return res.json();
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Counts>({
    totalUsers: 0,
    totalDestinations: 0,
    totalCategories: 0,
    totalRegions: 0,
    totalOrders: 0,
  });

  const [chartData, setChartData] = useState<ChartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetchStats();

        if (res.status !== 200) {
          throw new Error("Response server tidak valid");
        }

        setStats(res.data.counts);
        setChartData(res.data.chartData);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Terjadi kesalahan tidak diketahui"
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  return (
    <div className="space-y-6">
      <DashboardHeader />

      {loading && (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600 mr-2" />
          <span className="text-gray-500">Memuat dashboard...</span>
        </div>
      )}

      {error && !loading && (
        <div className="bg-white rounded-2xl shadow p-6 max-w-md mx-auto text-center">
          <h3 className="text-lg font-semibold text-red-600 mb-2">
            Terjadi Kesalahan
          </h3>
          <p className="text-gray-600">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          <StatsCards stats={stats} />
          <ChartsSection chartData={chartData} />
          <QuickStats stats={stats} />
        </>
      )}
    </div>
  );
}

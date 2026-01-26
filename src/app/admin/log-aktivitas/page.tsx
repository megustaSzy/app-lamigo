"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/helpers/api";
import type {
  AdminActivityLogResponse,
  AdminActivityLogItem,
} from "@/types/activity-log";

import AdminLogAktivitasTable from "@/components/admin/log-activity/LogAktivitasTable";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Pagination from "@/components/Pagination";

export default function AdminLogAktivitasPage() {
  const [logs, setLogs] = useState<AdminActivityLogItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 10;

  async function getData(currentPage: number) {
    try {
      setLoading(true);

      const res = await apiFetch<AdminActivityLogResponse>(
        `/api/activity-logs/admin?page=${currentPage}&limit=${limit}`,
      );

      setLogs(res.data.items ?? []);
      setTotalPages(res.data.total_pages ?? 1);
    } catch {
      setLogs([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData(page);
  }, [page]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-blue-700 tracking-tight">
          Log Aktivitas Admin
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Riwayat aktivitas login & logout admin
        </p>
      </div>

      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="border-b">
          <CardTitle>Aktivitas</CardTitle>
          <CardDescription>Total {logs.length} data</CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-blue-600 mr-2" />
              <p className="text-gray-500">Memuat data...</p>
            </div>
          ) : (
            <div className="space-y-4">
              <AdminLogAktivitasTable logs={logs} />

              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

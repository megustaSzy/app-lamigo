"use client";

import { useState } from "react";
import { apiFetch } from "@/helpers/api";
import Cookies from "js-cookie";
import type { SalesReportResponse } from "@/types/admin/laporan";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

import { ReportFilter } from "@/components/admin/laporan/ReportFilter";
import { ReportSummary } from "@/components/admin/laporan/ReportSummary";
import { ReportTabs } from "@/components/admin/laporan/ReportTabs";

export default function LaporanPage() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [report, setReport] = useState<any>(null);
  const [view, setView] = useState("daily");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchReport() {
    if (!start || !end) {
      setError("Tanggal mulai dan akhir wajib diisi");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await apiFetch<SalesReportResponse>(
        `/api/reports/sales?start=${start}&end=${end}`
      );
      setReport(res.data);
    } catch (err: any) {
      setError(err.message || "Gagal mengambil laporan");
    } finally {
      setLoading(false);
    }
  }

  async function downloadFile(type: "excel" | "pdf") {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/reports/sales/${type}?start=${start}&end=${end}`,
      { headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` } }
    );

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `laporan-penjualan.${type === "excel" ? "xlsx" : "pdf"}`;
    a.click();
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 space-y-6">
      <h2 className="text-2xl font-semibold text-blue-700">
        Laporan Penjualan
      </h2>

      <ReportFilter
        start={start}
        end={end}
        loading={loading}
        setStart={setStart}
        setEnd={setEnd}
        onFetch={fetchReport}
        onDownload={downloadFile}
      />

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {report && <ReportSummary summary={report.summary} />}

      {report && <ReportTabs report={report} view={view} setView={setView} />}
    </div>
  );
}

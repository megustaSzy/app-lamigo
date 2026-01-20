"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function VisitorsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Visitors (Last 3 Months)</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="h-48 bg-linear-to-b from-slate-200 to-slate-100 rounded-lg flex items-end p-4 text-sm text-slate-600">
          * Grafik Placeholder (ganti dengan Recharts)
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import { Card, CardContent } from "@/components/ui/card";

export function SummaryCard({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: any;
  icon: React.ReactNode;
  color: "blue" | "purple" | "green" | "orange";
}) {
  const colors = {
    blue: "bg-blue-50 border-blue-100",
    purple: "bg-purple-50 border-purple-100",
    green: "bg-green-50 border-green-100",
    orange: "bg-orange-50 border-orange-100",
  };

  return (
    <Card className={`rounded-xl border ${colors[color]}`}>
      <CardContent className="p-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600 font-medium">{label}</p>
            <p className="text-2xl font-bold mt-2 text-gray-900">{value}</p>
          </div>
          <div className="p-3 rounded-xl bg-white shadow-sm">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}

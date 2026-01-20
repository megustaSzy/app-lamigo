"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { ChartItem } from "@/types/count";
import { Activity, TrendingUp } from "lucide-react";

interface Props {
  chartData: ChartItem[];
}

export default function ChartsSection({ chartData }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Bar */}
      <ChartCard
        title="Statistik Platform"
        subtitle="Distribusi data per kategori"
        icon={Activity}
      >
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Line */}
      <ChartCard
        title="Tren Pertumbuhan"
        subtitle="Performa dalam periode waktu"
        icon={TrendingUp}
      >
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#10b981" />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}

function ChartCard({ title, subtitle, icon: Icon, children }: any) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        <Icon className="w-5 h-5 text-indigo-600" />
      </div>
      {children}
    </div>
  );
}

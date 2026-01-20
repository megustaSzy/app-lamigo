import {
  TrendingUp,
  Users,
  MapPin,
  Layers,
  Globe,
  ShoppingBag,
} from "lucide-react";
import { Counts } from "@/types/count";

interface Props {
  stats: Counts;
}

export default function StatsCards({ stats }: Props) {
  return (
    <>
      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Pengguna"
          value={stats.totalUsers}
          icon={Users}
          gradient="from-emerald-500 to-teal-600"
          footer="Pengguna terdaftar"
        />
        <StatCard
          title="Total Destinasi"
          value={stats.totalDestinations}
          icon={MapPin}
          gradient="from-blue-500 to-indigo-600"
          footer="Destinasi wisata terdaftar"
        />
        <StatCard
          title="Kategori Wisata"
          value={stats.totalCategories}
          icon={Layers}
          gradient="from-purple-500 to-pink-600"
          footer="Kategori tersedia"
        />
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard
          title="Total Wilayah"
          value={stats.totalRegions}
          icon={Globe}
          gradient="from-orange-500 to-red-600"
          footer="Wilayah tercakup"
        />
        <StatCard
          title="Total Pesanan"
          value={stats.totalOrders}
          icon={ShoppingBag}
          gradient="from-cyan-500 to-blue-600"
          footer="Pesanan terdaftar"
        />
      </div>
    </>
  );
}

function StatCard({ title, value, icon: Icon, gradient, footer }: any) {
  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div
            className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
          >
            <Icon className="w-7 h-7 text-white" />
          </div>
          <div className="flex items-center text-green-600 text-sm font-medium">
          </div>
        </div>
        <h3 className="text-gray-600 text-sm mb-1">{title}</h3>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
      <div className="px-6 py-3 bg-gray-50">
        <p className="text-xs text-gray-600">{footer}</p>
      </div>
    </div>
  );
}

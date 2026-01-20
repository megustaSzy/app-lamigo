import { Counts } from "@/types/count";

interface Props {
  stats: Counts;
}

export default function QuickStats({ stats }: Props) {
  const avgOrdersPerUser =
    stats.totalUsers > 0
      ? (stats.totalOrders / stats.totalUsers).toFixed(1)
      : "0";

  const avgDestinationsPerRegion =
    stats.totalRegions > 0
      ? (stats.totalDestinations / stats.totalRegions).toFixed(1)
      : "0";

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-6 text-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <Stat label="Rata-rata Pesanan/User" value={avgOrdersPerUser} />
        <Stat label="Total Transaksi" value={stats.totalOrders} />
        <Stat label="Destinasi/Wilayah" value={avgDestinationsPerRegion} />
      </div>
    </div>
  );
}

function Stat({ label, value }: any) {
  return (
    <div>
      <p className="text-indigo-200 text-sm mb-1">{label}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}

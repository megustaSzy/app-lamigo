import { MapPin, Calendar, Clock, Users, CreditCard, X } from "lucide-react";
import { DestinationsType } from "@/types/destination";
import { Button } from "../ui/button";

export function ConfirmPopup({
  destination,
  pickupName,
  date,
  departTime,
  returnTime,
  quantity,
  estimasiTotal,
  paying,
  onCancel,
  onConfirm,
}: {
  destination: DestinationsType;
  pickupName: string;
  date: string;
  departTime: string;
  returnTime: string;
  quantity: number;
  estimasiTotal: number;
  paying: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-xl">
        {/* HEADER */}
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4 text-white">
          <h3 className="text-center text-base font-semibold">
            Konfirmasi Pesanan
          </h3>

          <Button
            variant="ghost"
            size="icon"
            onClick={onCancel}
            className="absolute right-3 top-3 text-white/80 hover:bg-white/20 hover:text-white"
          >
            <X size={18} />
          </Button>
        </div>

        {/* CONTENT */}
        <div className="space-y-4 px-6 py-5 text-sm">
          <InfoRow
            icon={<MapPin size={14} />}
            label="Destinasi"
            value={destination.name}
          />

          <InfoRow
            icon={<MapPin size={14} />}
            label="Pickup"
            value={pickupName}
          />

          <InfoRow icon={<Calendar size={14} />} label="Tanggal" value={date} />

          <InfoRow
            icon={<Clock size={14} />}
            label="Waktu"
            value={`${departTime} – ${returnTime}`}
          />

          <InfoRow
            icon={<Users size={14} />}
            label="Jumlah"
            value={`${quantity} orang`}
          />

          {/* TOTAL */}
          <div className="mt-3 flex items-center justify-between rounded-2xl bg-blue-50 px-4 py-3">
            <div className="flex items-center gap-2 font-medium text-blue-600">
              <CreditCard size={16} />
              <span>Estimasi Total</span>
            </div>
            <span className="font-semibold text-blue-700">
              IDR {estimasiTotal.toLocaleString("id-ID")}
            </span>
          </div>
        </div>

        {/* ACTION */}
        <div className="px-6 pb-6 flex justify-center gap-3">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={paying}
            className="flex-1 max-w-[200px] rounded-xl border border-neutral-200 py-2.5 text-sm font-medium
      hover:bg-neutral-50 disabled:opacity-50 cursor-pointer"
          >
            Batal
          </Button>

          <Button
            onClick={onConfirm}
            disabled={paying}
            className="flex-1 max-w-[200px] rounded-xl bg-gradient-to-r from-blue-600 to-blue-500
      hover:from-blue-700 hover:to-blue-600
      text-white py-2.5 text-sm font-semibold
      shadow-md hover:shadow-lg transition-all
      disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {paying ? "Memproses..." : "Pesan Sekarang"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-neutral-400">{icon}</span>
      <div className="flex-1">
        <p className="text-xs text-neutral-500">{label}</p>
        <p className="font-medium text-neutral-800">{value}</p>
      </div>
    </div>
  );
}

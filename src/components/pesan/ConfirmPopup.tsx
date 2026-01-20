import { DestinationsType } from "@/types/destination";

export function ConfirmPopup({
  destination,
  pickupName,
  date,
  departTime,
  returnTime,
  people,
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
  people: number;
  estimasiTotal: number;
  paying: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      {" "}
      <div className="w-full max-w-sm bg-white rounded-2xl p-6 space-y-4">
        {" "}
        <h3 className="text-lg font-semibold text-center">
          {" "}
          Konfirmasi Pesanan{" "}
        </h3>{" "}
        <div className="text-sm space-y-2 text-neutral-600">
          {" "}
          <p>
            {" "}
            <b>Destinasi:</b> {destination.name}{" "}
          </p>{" "}
          <p>
            {" "}
            <b>Pickup:</b> {pickupName}{" "}
          </p>{" "}
          <p>
            {" "}
            <b>Tanggal:</b> {date}{" "}
          </p>{" "}
          <p>
            {" "}
            <b>Waktu:</b> {departTime} - {returnTime}{" "}
          </p>{" "}
          <p>
            {" "}
            <b>Jumlah:</b> {people} orang{" "}
          </p>{" "}
        </div>{" "}
        <div className="flex justify-between font-semibold">
          {" "}
          <span>Estimasi Total</span>{" "}
          <span>IDR {estimasiTotal.toLocaleString("id-ID")}</span>{" "}
        </div>{" "}
        <div className="flex gap-3 pt-2">
          {" "}
          <button
            onClick={onCancel}
            className="w-full py-2 rounded-xl border text-sm"
          >
            {" "}
            Batal{" "}
          </button>{" "}
          <button
            disabled={paying}
            onClick={onConfirm}
            className="w-full py-2 rounded-xl bg-blue-600 text-white text-sm disabled:opacity-60"
          >
            {" "}
            {paying ? "Memproses..." : "Pesan Sekarang"}{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}

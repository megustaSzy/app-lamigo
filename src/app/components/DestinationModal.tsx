/* eslint-disable @next/next/no-img-element */
"use client";

import { MapPin, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { DestinationsType } from "@/types/destination";

type DestinationModalProps = {
  open: boolean;
  data: DestinationsType | null;
  onClose: () => void;
};

export default function DestinationModal({
  open,
  data,
  onClose,
}: DestinationModalProps) {
  const router = useRouter();

  if (!open || !data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-600"
        >
          <X size={22} />
        </button>

        {/* LEFT IMAGE */}
        <div className="relative h-64 md:h-full">
          <img
            src={data.imageUrl ? `${data.imageUrl}` : "/images/default.jpg"}
            alt={data.name}
            className="w-full h-full object-cover"
          />

          {/* Title & Location */}
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-xl font-semibold">{data.name}</h3>
            <div className="flex items-center gap-1 text-sm opacity-90">
              <MapPin size={14} />
              <span>{data.region?.name ?? "Lokasi tidak diketahui"}</span>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="p-6 flex flex-col justify-between max-h-[80vh] overflow-y-auto">
          {/* CONTENT */}
          <div>
            {/* Deskripsi */}
            <section className="mb-4">
              <h4 className="font-semibold mb-1">Deskripsi</h4>
              <p className="text-sm text-gray-600">{data.description}</p>
            </section>

            {/* Include */}
            <section className="mb-4">
              <h4 className="font-semibold mb-2">Include</h4>
              <div className="flex flex-wrap gap-2">
                {data.include.map((item, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs bg-gray-100 rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </section>

            {/* Ketentuan */}
            <section className="mb-4">
              <h4 className="font-semibold mb-2">Ketentuan</h4>
              <div className="flex flex-wrap gap-2">
                {data.ketentuan.map((item, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs bg-gray-100 rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </section>

            {/* Perhatian */}
            <section>
              <h4 className="font-semibold mb-2">Perhatian</h4>
              <ul className="list-disc pl-4 text-sm text-gray-600 space-y-1">
                {data.perhatian.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>
          </div>

          {/* FOOTER */}
          <div className="mt-6 flex items-center justify-between border-t pt-4">
            <div>
              <p className="text-xs text-gray-500">Harga Tiket</p>
              <p className="text-lg font-semibold text-gray-900">
                IDR {Number(data.price).toLocaleString("id-ID")}
              </p>
            </div>

            <button
              onClick={() => {
                onClose();
                router.push(`/pesan?destinationId=${data.id}`);
              }}
              className="px-6 py-2 rounded-full bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
            >
              Pesan Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

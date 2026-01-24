"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { apiFetch } from "@/helpers/api";
import { DestinationsType } from "@/types/destination";

import DestinationCard from "@/components/pesan/DestinationCard";
import PesanForm from "@/components/pesan/PesanForm";
import { ConfirmPopup } from "@/components/pesan/ConfirmPopup";
import { Popup } from "@/components/pesan/Popup";

type ApiResponse<T> = {
  status: number;
  message: string;
  data: T;
};

type OrderResponse = {
  id: number;
};

type PayResponse = {
  snapToken: string | null;
  redirectUrl: string | null;
};

type PickupType = {
  id: number;
  name: string;
};

type FormValue = {
  pickupLocationId: number;
  date: string;
  departTime: string;
  returnTime: string;
  quantity: number;
};

export default function PesanComponent() {
  const searchParams = useSearchParams();
  const destinationId = Number(searchParams.get("destinationId"));

  const [destination, setDestination] = useState<DestinationsType | null>(null);
  const [pickupLocations, setPickupLocations] = useState<PickupType[]>([]);
  const [loading, setLoading] = useState(true);

  const [formValue, setFormValue] = useState<FormValue | null>(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const [showError, setShowError] = useState(false);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    if (!destinationId) return;

    const fetchDestination = async () => {
      try {
        const res = await apiFetch<ApiResponse<DestinationsType>>(
          `/api/destinations/${destinationId}`,
        );
        setDestination(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [destinationId]);

  useEffect(() => {
    const fetchPickup = async () => {
      try {
        const res = await apiFetch<ApiResponse<PickupType[]>>(
          "/api/pickup-locations",
        );
        setPickupLocations(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Gagal memuat pickup location", err);
        setPickupLocations([]);
      }
    };

    fetchPickup();
  }, []);

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!destination)
    return <p className="text-center mt-20">Destinasi tidak ditemukan</p>;

  const estimasiTotal = destination.price * (formValue?.quantity ?? 1);

  const selectedPickup =
    pickupLocations.find((p) => p.id === formValue?.pickupLocationId) ?? null;

  return (
    <main className="min-h-screen bg-neutral-100 flex justify-center px-4 py-8">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow overflow-hidden">
        <DestinationCard destination={destination} />

        <PesanForm
          pickupLocations={pickupLocations}
          price={destination.price}
          onSubmit={(value) => {
            setFormValue(value);
            setShowConfirm(true);
          }}
        />
      </div>

      {showConfirm && formValue && (
        <ConfirmPopup
          destination={destination}
          pickupName={selectedPickup?.name || "-"}
          date={formValue.date}
          departTime={formValue.departTime}
          returnTime={formValue.returnTime}
          quantity={formValue.quantity}
          estimasiTotal={estimasiTotal}
          paying={paying}
          onCancel={() => setShowConfirm(false)}
          onConfirm={async () => {
            try {
              setPaying(true);

              const orderRes = await apiFetch<ApiResponse<OrderResponse>>(
                "/api/orders",
                {
                  method: "POST",
                  body: JSON.stringify({
                    destinationId: destination.id,
                    pickupLocationId: formValue.pickupLocationId,
                    quantity: formValue.quantity,
                    date: formValue.date,
                    departureTime: formValue.departTime,
                    returnTime: formValue.returnTime,
                  }),
                },
              );

              const payRes = await apiFetch<ApiResponse<PayResponse>>(
                `/api/orders/${orderRes.data.id}/pay`,
                {
                  method: "POST",
                },
              );

              if (payRes.data.redirectUrl) {
                window.location.href = payRes.data.redirectUrl;
              } else {
                throw new Error("Redirect URL tidak tersedia");
              }
            } catch (err) {
              console.error(err);
              setShowError(true);
            } finally {
              setPaying(false);
            }
          }}
        />
      )}

      {showError && (
        <Popup
          title="Gagal ❌"
          desc="Lengkapi data atau coba lagi."
          onClose={() => setShowError(false)}
        />
      )}
    </main>
  );
}

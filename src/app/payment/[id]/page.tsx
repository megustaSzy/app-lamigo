"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiFetch } from "@/helpers/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CreditCard } from "lucide-react";

export default function PaymentPage() {
  const { id } = useParams();
  const router = useRouter();

  const decodedId = atob(decodeURIComponent(id as string));

  const [loading, setLoading] = useState(true);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const pay = async () => {
      try {
        const res = await apiFetch<{ data: { redirectUrl: string } }>(
          `/api/orders/${decodedId}/pay`,
          { method: "POST" },
        );

        setRedirectUrl(res.data.redirectUrl);
      } catch (err: any) {
        setError(err?.message || "Tidak dapat memproses pembayaran");
      } finally {
        setLoading(false);
      }
    };

    pay();
  }, [decodedId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <Card className="w-full max-w-sm border-blue-200 shadow-lg">
        <CardContent className="p-6 text-center space-y-4">
          {loading && (
            <>
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-blue-600" />
              <p className="text-sm text-blue-700">Menyiapkan pembayaran...</p>
            </>
          )}

          {!loading && error && (
            <>
              <p className="text-red-600 text-sm">{error}</p>
              <Button
                variant="outline"
                className="w-full border-blue-300 text-blue-600"
                onClick={() => router.push("/tiket")}
              >
                Kembali ke Tiket
              </Button>
            </>
          )}

          {!loading && redirectUrl && (
            <>
              <CreditCard className="mx-auto h-10 w-10 text-blue-600" />
              <p className="text-sm text-blue-700">
                Klik tombol di bawah untuk melanjutkan pembayaran
              </p>
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => (window.location.href = redirectUrl)}
              >
                Bayar Sekarang
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

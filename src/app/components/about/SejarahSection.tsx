"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { apiFetch } from "@/helpers/api";
import { HistoryType } from "@/types/history";

export default function SejarahSection() {
  const [data, setData] = useState<HistoryType | null>(null);
  const [loading, setLoading] = useState(true);
  const [, setErrorMsg] = useState<string | null>(null);

  async function getData() {
    try {
      setLoading(true);
      const result = await apiFetch<HistoryType>("/api/about");
      setData(result);
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <section className="relative overflow-hidden py-20 font-poppins">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-100 via-blue-200 to-blue-300" />
      <div className="absolute inset-0 opacity-20">
        <Image
          src="/images/tekturgaris.svg"
          alt="Tekstur garis"
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="space-y-4">
            {loading ? (
              <>
                {/* Skeleton Title */}
                <div className="h-9 w-40 rounded-md bg-gray-300 animate-pulse" />

                {/* Skeleton Paragraph */}
                <div className="space-y-3">
                  <div className="h-4 w-full rounded bg-gray-300 animate-pulse" />
                  <div className="h-4 w-11/12 rounded bg-gray-300 animate-pulse" />
                  <div className="h-4 w-10/12 rounded bg-gray-300 animate-pulse" />
                </div>
              </>
            ) : (
              <>
                <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
                  Sejarah
                </h2>
                <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                  {data?.data.history}
                </p>
              </>
            )}
          </div>

          {/* Image */}
          <div className="flex justify-center">
            <Image
              src="/images/18.svg"
              alt="Ilustrasi sejarah"
              width={700}
              height={700}
              className="w-full max-w-md object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

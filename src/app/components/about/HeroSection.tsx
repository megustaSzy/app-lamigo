// /* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { apiFetch } from "@/helpers/api";
import { TitleType } from "@/types/about";

export default function HeroSection() {
  const [data, setData] = useState<TitleType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [, setErrorMsg] = useState<string | null>(null);

  async function getData(): Promise<void> {
    setLoading(true);
    setErrorMsg(null);

    try {
      const endpoint = "/api/about";
      // console.log("Memanggil:", endpoint);

      const result = await apiFetch<TitleType>(endpoint);

      if (result) {
        setData(result);
      } else {
        throw new Error("Format data API tidak sesuai.");
      }
    } catch (error) {
      const err = error instanceof Error ? error.message : "Terjadi kesalahan";
      setErrorMsg(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="relative w-full h-105 overflow-hidden shadow-lg rounded-b-none">
      {/* Background Image default dari frontend */}
      <Image
        src="/images/favorite/img.jpg"
        alt="Hero Image"
        fill
        priority
        className="object-fill"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
        <h2
          className={`text-4xl font-bold mb-6 transition-all duration-500
      ${loading ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}
    `}
        >
          About
        </h2>

        <p
          className={`max-w-xl text-sm opacity-90 transition-all duration-700 delay-100
      ${loading ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}
    `}
        >
          {data?.data.title}
        </p>
      </div>
    </div>
  );
}

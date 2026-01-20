"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { apiFetch } from "@/helpers/api";
import { RegionApiResponse, RegionItem } from "@/types/region";
import { DestinationsType, ApiDestinationsResponse } from "@/types/destination";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

function RegionSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-md p-3 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <Skeleton className="w-10 h-10 ml-4 rounded-md" />
        <div className="text-right space-y-1">
          <Skeleton className="h-5 w-6 ml-auto" />
          <Skeleton className="h-3 w-16 ml-auto" />
        </div>
      </div>

      <Skeleton className="h-5 w-3/4 mt-2" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />

      <div className="flex justify-end mt-2">
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}

export default function DaftarFavorite() {
  const [regions, setRegions] = useState<RegionItem[]>([]);
  const [destinations, setDestinations] = useState<DestinationsType[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 9;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        //PAGINATION VIA API
        const regionRes = await apiFetch<RegionApiResponse>(
          `/api/region?page=${currentPage}&limit=${itemsPerPage}`
        );

        setRegions(regionRes.data.items);
        setTotalPages(regionRes.data.total_pages);

        //Destinations (untuk counter)
        const destRes = await apiFetch<ApiDestinationsResponse>(
          "/api/destinations"
        );

        setDestinations(
          destRes.data.items.map((item) => ({
            id: item.id,
            name: item.name,
            imageUrl: item.imageUrl,
            description: item.description ?? "",
            price: item.price,
            include: item.include,
            ketentuan: item.ketentuan,
            perhatian: item.perhatian,
            category: item.category,
            region: item.region,
          }))
        );
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  //Hitung jumlah destinasi per region
  const regionCounts: Record<number, number> = {};
  destinations.forEach((dest) => {
    const regionId = dest.region.id;
    regionCounts[regionId] = (regionCounts[regionId] || 0) + 1;
  });

  return (
    <section className="w-full min-h-screen bg-linear-to-b from-[#a7c8e7] to-white px-6 py-20">
      <h1 className="text-center text-3xl font-bold mb-10 font-poppins">
        Jelajahi Kabupaten Wisata
      </h1>

      {/* GRID */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {Array.from({ length: itemsPerPage }).map((_, i) => (
            <RegionSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {regions.map((item) => (
            <div
              key={item.id}
              className="relative bg-white rounded-xl shadow-md p-3 flex flex-col gap-1
              cursor-pointer transition-transform duration-300 ease-in-out
              hover:scale-105 hover:shadow-lg font-poppins"
            >
              <div className="flex justify-between items-center">
                <Image
                  src={item.imageUrl || "/images/fallback.png"}
                  alt={item.name}
                  width={40}
                  height={40}
                  className="ml-4"
                />

                <div className="text-right">
                  <span className="relative right-3 text-lg font-bold text-yellow-500">
                    {regionCounts[item.id] ?? 0}
                  </span>
                  <div className="text-[10px] text-gray-400 font-medium">
                    Destinasi
                  </div>
                </div>
              </div>

              <h2 className="font-semibold text-gray-900 text-lg mt-1 truncate">
                {item.name}
              </h2>

              <p className="text-sm text-gray-600 mt-1">
                Temukan berbagai destinasi wisata di <br />
                <span className="text-sm text-gray-600">{item.name}</span>
              </p>

              <div className="flex justify-end mt-1">
                <Link
                  href={`/detailtour?kabupaten=${encodeURIComponent(
                    item.name
                  )}`}
                  className="group inline-flex items-center gap-1 text-blue-500 font-medium text-sm hover:underline"
                >
                  Lihat Wisata
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PAGINATION DOTS */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <span
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all
                ${
                  currentPage === i + 1
                    ? "bg-blue-600 scale-125"
                    : "bg-gray-400 opacity-50"
                }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

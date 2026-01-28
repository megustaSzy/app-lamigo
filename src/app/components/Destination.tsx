/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { apiFetch } from "@/helpers/api";
import { ApiDestinationsResponse, DestinationsType } from "@/types/destination";
import { ApiCategoryResponse, CategoryItem } from "@/types/category";
import DestinationModal from "./DestinationModal";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

function DestinationSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex justify-end">
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  );
}

export default function DestinasiSection() {
  const [data, setData] = useState<DestinationsType[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("");

  const [loading, setLoading] = useState(true);
  const [loadingCategory, setLoadingCategory] = useState(true);

  // UX state khusus (BEST PRACTICE)
  const [isSwitchingCategory, setIsSwitchingCategory] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [selectedData, setSelectedData] = useState<DestinationsType | null>(
    null,
  );

  const loadCategories = useCallback(async () => {
    try {
      const res = await apiFetch<ApiCategoryResponse>("/api/category");
      const items = res.data.items ?? [];
      setCategories(items);
      if (items.length > 0) setActiveCategory(items[0].name);
    } finally {
      setLoadingCategory(false);
    }
  }, []);

  const loadDestinations = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiFetch<ApiDestinationsResponse>("/api/destinations");

      // delay kecil biar skeleton keliatan natural
      await new Promise((r) => setTimeout(r, 300));

      setData(
        res.data.items.map((it) => ({
          id: it.id,
          name: it.name ?? "Tanpa Nama",
          imageUrl: it.imageUrl,
          description: it.description ?? "Deskripsi belum tersedia",
          price: it.price,
          include: it.include ?? [],
          ketentuan: it.ketentuan ?? [],
          perhatian: it.perhatian ?? [],
          category: it.category!,
          region: it.region!,
        })),
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
    loadDestinations();
  }, [loadCategories, loadDestinations]);

  /* =========================
     FILTER DATA
  ========================= */
  const filteredData = useMemo(() => {
    if (!activeCategory) return [];
    return data.filter((d) => d.category?.name === activeCategory);
  }, [data, activeCategory]);

  const DESTINATION_SKELETON_COUNT = 6;
  const CATEGORY_SKELETON_COUNT = 5;

  return (
    <section className="relative w-full bg-linear-to-b from-[#a7c8e7] to-[#f2f6f9]">
      <div className="max-w-6xl mx-auto px-4 pt-48 md:pt-36 pb-10 text-center">
        <h2 className="text-2xl md:text-4xl font-extrabold mb-6 md:mb-8 text-gray-800">
          Tujuan Wisata Favorit
        </h2>

        {/* =========================
           CATEGORY
        ========================= */}
        <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-8 md:mb-12">
          {loadingCategory
            ? Array.from({ length: CATEGORY_SKELETON_COUNT }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-8 md:h-9 w-20 md:w-24 rounded-full"
                />
              ))
            : categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setIsSwitchingCategory(true);
                    setActiveCategory(cat.name);

                    // UX feedback kecil, TANPA sentuh fetch
                    setTimeout(() => setIsSwitchingCategory(false), 300);
                  }}
                  className={`px-4 py-1.5 md:px-6 md:py-2 rounded-full border text-xs md:text-sm font-medium transition-all cursor-pointer ${
                    activeCategory === cat.name
                      ? "bg-blue-600 text-white border-blue-600 shadow-md"
                      : "bg-white text-gray-700 hover:bg-blue-50 border-gray-200"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
        </div>

        {/* =========================
           DESTINATION GRID
        ========================= */}
        <div className="grid gap-4 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* FIRST LOAD → SKELETON */}
          {(loading || loadingCategory) &&
            Array.from({ length: DESTINATION_SKELETON_COUNT }).map((_, i) => (
              <DestinationSkeleton key={i} />
            ))}

          {/* SWITCH CATEGORY → TEXT LOADER */}
          {!loading && !loadingCategory && isSwitchingCategory && (
            <div className="col-span-full py-12 text-center text-gray-500 text-sm">
              Memuat destinasi…
            </div>
          )}

          {/* EMPTY STATE */}
          {!loading &&
            !loadingCategory &&
            !isSwitchingCategory &&
            filteredData.length === 0 && (
              <div className="col-span-full py-16 text-center text-gray-500 text-sm">
                Destinasi tidak tersedia
              </div>
            )}

          {/* DATA READY */}
          {!loading &&
            !loadingCategory &&
            !isSwitchingCategory &&
            filteredData.length > 0 &&
            filteredData.map((d) => (
              <div
                key={d.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="h-40 md:h-48">
                  <img
                    src={d.imageUrl || "/images/default.jpg"}
                    alt={d.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-5 text-left">
                  <h3 className="font-semibold text-lg mb-1">{d.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {d.region?.name ?? "Lokasi tidak diketahui"}
                  </p>

                  <div className="flex justify-end">
                    <span
                      onClick={() => {
                        setSelectedData(d);
                        setOpenModal(true);
                      }}
                      className="inline-flex items-center gap-1 text-blue-600 text-sm font-medium cursor-pointer"
                    >
                      Lihat Detail
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <DestinationModal
        open={openModal}
        data={selectedData}
        onClose={() => setOpenModal(false)}
      />
    </section>
  );
}

/* eslint-disable @next/next/no-img-element */
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback, Suspense } from "react";
import { apiFetch } from "@/helpers/api";
import Image from "next/image";
import { ApiDestinationsResponse, DestinationsType } from "@/types/destination";
import { ApiCategoryResponse, CategoryItem } from "@/types/category";
import DestinationModal from "../components/DestinationModal";

function DetailTourContent() {
  const searchParams = useSearchParams();
  const kabupaten = searchParams.get("kabupaten");

  const [data, setData] = useState<DestinationsType[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [selectedData, setSelectedData] = useState<DestinationsType | null>(
    null,
  );

  /* LOAD CATEGORY */
  const loadCategories = useCallback(async () => {
    try {
      const res = await apiFetch<ApiCategoryResponse>("/api/category");
      const items = res.data.items ?? [];
      setCategories(items);

      if (items.length > 0) {
        setActiveCategory(items[0].name);
      }
    } catch (error) {
      console.error("Gagal mengambil kategori:", error);
      setCategories([]);
    }
  }, []);

  /* LOAD DESTINATIONS */
  const fetchDestinations = useCallback(async () => {
    if (!kabupaten) return;
    setLoading(true);
    try {
      const res = await apiFetch<ApiDestinationsResponse>("/api/destinations");

      const items = res.data.items
        .filter((item) => item.region?.name === kabupaten)
        .map((item) => ({
          id: item.id,
          name: item.name ?? "Tanpa Nama",
          imageUrl: item.imageUrl ?? "/images/default.jpg",
          description: item.description ?? "Deskripsi belum tersedia",
          price: item.price ?? 0,
          include: item.include ?? [],
          ketentuan: item.ketentuan ?? [],
          perhatian: item.perhatian ?? [],
          category: item.category!,
          region: item.region!,
        }));

      setData(items);
    } catch (error) {
      console.error("Gagal mengambil data destinasi:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [kabupaten]);

  useEffect(() => {
    loadCategories();
    fetchDestinations();
  }, [loadCategories, fetchDestinations]);

  if (!kabupaten)
    return <p className="text-center mt-10">Kabupaten tidak ditemukan.</p>;

  return (
    <section className="relative w-full bg-linear-to-b from-[#a7c8e7] to-white py-20">
      {/* Background */}
      <img
        src="/images/destinasi.svg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-5"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-gray-800">
          Destinasi di {kabupaten}
        </h1>

        {/* CATEGORY */}
        <div className="flex justify-center flex-wrap gap-4 mb-12">
          {categories.map((cat) => {
            const active = activeCategory === cat.name;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-6 py-2 rounded-full border text-sm font-medium transition ${
                  active
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {loading ? (
          <p className="text-gray-500">Memuat destinasi...</p>
        ) : data.length === 0 ? (
          <p className="text-red-500">Belum ada destinasi di kabupaten ini.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {data
              .filter((d) => d.category?.name === activeCategory)
              .map((d) => (
                <div
                  key={d.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
                >
                  <div className="h-48 relative">
                    <Image
                      src={d.imageUrl ?? "/images/default.jpg"}
                      alt={d.name}
                      fill
                      className="object-cover rounded-t-2xl"
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
                        className="text-blue-600 text-sm cursor-pointer font-medium hover:underline"
                      >
                        Lihat Detail →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      <DestinationModal
        open={openModal}
        data={selectedData}
        onClose={() => setOpenModal(false)}
      />
    </section>
  );
}

export default function DetailTourPage() {
  return (
    <Suspense fallback={<p className="text-center mt-10">Memuat halaman...</p>}>
      <DetailTourContent />
    </Suspense>
  );
}

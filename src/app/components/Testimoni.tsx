"use client";

import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import { apiFetch } from "@/helpers/api";
import { TestimoniItem, ApiResponse } from "@/types/testimoni";
import { Skeleton } from "@/components/ui/skeleton";

function TestimoniSkeleton() {
  return (
    <div className="bg-white/90 shadow-md rounded-2xl p-6 text-left border border-gray-100 backdrop-blur-sm">
      <Skeleton className="h-6 w-6 mb-3 rounded-full" />

      <div className="space-y-2 mb-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-10/12" />
      </div>

      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-4 rounded-full" />
        ))}
      </div>

      <Skeleton className="h-4 w-32 mb-1" />
      <Skeleton className="h-3 w-24" />
    </div>
  );
}

export default function TestimoniSection() {
  const [testimonials, setTestimonials] = useState<TestimoniItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        setLoading(true);

        const res: ApiResponse = await apiFetch(
          `/api/testimoni?page=${currentPage}&limit=${itemsPerPage}`
        );

        const approved = res.data.items.filter(
          (item) => item.approvalStatus === "APPROVED"
        );

        setTestimonials(approved);
        setTotalPages(res.data.total_pages);
      } catch (err) {
        console.error("Gagal mengambil testimoni:", err);
      } finally {
        setLoading(false);
      }
    };

    loadTestimonials();
  }, [currentPage]);

  return (
    <section className="relative py-20 bg-linear-to-b from-[#ffffff] to-[#dbe7f9]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-12">
          Testimoni
        </h2>

        {loading && (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: itemsPerPage }).map((_, i) => (
              <TestimoniSkeleton key={i} />
            ))}
          </div>
        )}

        {!loading && testimonials.length === 0 && (
          <p className="text-center text-gray-500">Belum ada testimoni.</p>
        )}

        {!loading && (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="bg-white/90 shadow-md rounded-2xl p-6 text-left border border-gray-100 hover:shadow-lg transition-all backdrop-blur-sm"
              >
                <Quote className="text-gray-300 mb-2" size={28} />

                <p className="text-gray-700 text-sm mb-4 leading-relaxed wrap-break-word">
                  {item.comment}
                </p>

                <div className="flex gap-1 mb-4">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="text-yellow-400 fill-yellow-400"
                      size={18}
                    />
                  ))}
                </div>

                <div className="flex flex-col items-start gap-1">
                  <h4 className="font-semibold text-blue-600">
                    {item.name || "Anonymous"}
                  </h4>
                  <p className="text-gray-500 text-xs">
                    {item.profession || "Pengguna"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination dots */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center mt-10 gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <span
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300
                  ${
                    currentPage === i + 1
                      ? "bg-blue-600 opacity-100 scale-125"
                      : "bg-gray-400 opacity-50"
                  }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

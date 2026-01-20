/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/helpers/api";
import { ValueItem, ValueType } from "@/types/value";
import { VisionType, VisionData } from "@/types/vision";
import { MissionType, MissionData } from "@/types/mission";
import { Skeleton } from "@/components/ui/skeleton";

function VisionSkeleton() {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 md:p-8 border border-gray-100 space-y-3">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-11/12" />
      <Skeleton className="h-4 w-10/12" />
    </div>
  );
}

function MissionSkeleton() {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 md:p-8 border border-gray-100 space-y-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-4 w-full" />
      ))}
    </div>
  );
}

function ValueSkeleton() {
  return (
    <div className="bg-white shadow-md border border-gray-100 rounded-2xl p-6 flex items-start gap-4">
      <Skeleton className="w-20 h-20 rounded-xl" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}

export default function VisionSection() {
  const [vision, setVision] = useState<VisionData | null>(null);
  const [mission, setMission] = useState<MissionData | null>(null);
  const [values, setValues] = useState<ValueItem[]>([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const visionRes = await apiFetch<VisionType>("/api/about");
        setVision(visionRes.data);

        const missionRes = await apiFetch<MissionType>("/api/about");
        setMission(missionRes.data);

        const valueRes = await apiFetch<ValueType>("/api/about/value");
        setValues(valueRes.data.items);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const getImageUrl = (url?: string) => {
    if (!url) return "/images/default.svg";
    if (url.startsWith("http")) return url;
    return `${apiUrl.replace(/\/$/, "")}/${url.replace(/^\//, "")}`;
  };

  return (
    <section className="w-full py-24 bg-[linear-gradient(to_bottom,#bfd8f7,#ffffff,#bfd8f7)] font-poppins">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* VISI */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">Visi</h2>

          {loading ? (
            <VisionSkeleton />
          ) : (
            <div className="bg-white shadow-md rounded-2xl p-6 md:p-8 border border-gray-100">
              <p className="text-gray-700 text-lg leading-relaxed">
                {vision?.vision}
              </p>
            </div>
          )}
        </div>

        {/* MISI */}
        <div className="mb-24">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">Misi</h2>

          {loading ? (
            <MissionSkeleton />
          ) : (
            <div className="bg-white shadow-md rounded-2xl p-6 md:p-8 border border-gray-100 space-y-3">
              {mission?.mission.split(". ").map((m, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <span className="text-blue-600 font-semibold text-lg">
                    {i + 1}.
                  </span>
                  <p className="text-gray-700 text-lg leading-relaxed">{m}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* NILAI UTAMA */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900 font-poppins">
            Nilai Utama <span className="text-blue-600">LamiGo</span>
          </h2>
          <p className="text-gray-500 mt-2 text-base font-poppins">
            Prinsip yang kami pegang dalam setiap langkah
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => <ValueSkeleton key={i} />)
          ) : values.length === 0 ? (
            <ValueSkeleton />
          ) : (
            values.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-md border border-gray-100 rounded-2xl p-6 flex items-start gap-5 hover:shadow-lg transition-all"
              >
                <img
                  src={getImageUrl(item.imageUrl || undefined)}
                  alt={item.header}
                  className="w-20 h-20 object-contain"
                />

                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    {item.header}
                  </h3>
                  <p className="text-gray-600 text-base leading-relaxed">
                    {item.name}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

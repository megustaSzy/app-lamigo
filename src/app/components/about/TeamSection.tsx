/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { apiFetch } from "@/helpers/api";
import { Skeleton } from "@/components/ui/skeleton";

function TeamSkeleton() {
  return (
    <div className="flex flex-col items-center">
      {/* FOTO */}
      <div className="w-48 h-48 rounded-3xl overflow-hidden shadow-md">
        <Skeleton className="w-full h-full" />
      </div>

      {/* NAMA */}
      <Skeleton className="h-5 w-32 mt-4" />

      {/* ROLE */}
      <Skeleton className="h-4 w-24 mt-2" />
    </div>
  );
}

type TeamMember = {
  name: string;
  role: string;
  photo: string;
};

// Type sesuai struktur API
type TeamAPIItem = {
  id: number;
  name: string;
  job: string;
  imageUrl: string;
};

type TeamAPIResponse = {
  status: number;
  message: string;
  data: TeamAPIItem[];
};

export default function TeamSection() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const skeletonCount = team.length > 0 ? team.length : 3;

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

  async function getTeamData() {
    try {
      setLoading(true);
      setErrorMsg(null);

      const response = await apiFetch<TeamAPIResponse>("/api/team");

      if (!response || response.status !== 200) {
        throw new Error(response?.message || "Gagal memuat data tim.");
      }

      if (!Array.isArray(response.data)) {
        throw new Error("Format data tim tidak valid.");
      }

      // Mapping dari API → TeamMember
      const mappedTeam: TeamMember[] = response.data.map(
        (item: TeamAPIItem) => ({
          name: item.name,
          role: item.job,
          photo: item.imageUrl,
        })
      );

      setTeam(mappedTeam);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Gagal memuat data tim.";
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getTeamData();
  }, []);

  return (
    <section className="w-full py-20 bg-linear-to-b from-[#bfd8f7] to-[#0a1a35]">
      <div className="max-w-6xl mx-auto px-6 md:px-10 text-center">
        <h2 className="text-4xl font-bold mb-12 text-black">Our Team</h2>

        {/* Loading
        {loading && (
          <p className="text-white text-lg">Loading team members...</p>
        )} */}

        {/* Error */}
        {!loading && errorMsg && (
          <p className="text-red-400 text-lg">{errorMsg}</p>
        )}

        {/* Team Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-center">
          {loading
            ? Array.from({ length: skeletonCount }).map((_, i) => (
                <TeamSkeleton key={i} />
              ))
            : !errorMsg &&
              team.map((member, i) => {
                const photoURL = member.photo.startsWith("http")
                  ? member.photo
                  : `${BASE_URL}${member.photo}`;

                return (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-48 h-48 rounded-3xl overflow-hidden bg-yellow-400 flex justify-center items-center shadow-md">
                      <img
                        src={photoURL}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <h3 className="mt-4 text-xl font-semibold text-white">
                      {member.name}
                    </h3>
                    <p className="text-gray-300 text-sm">{member.role}</p>
                  </div>
                );
              })}
        </div>
      </div>

      {/* Maps */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 mt-16">
        <div className="w-full h-80 rounded-3xl overflow-hidden shadow-lg">
          {/* Gunakan embed "place" supaya marker muncul */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.461886868848!2d105.26573777499689!3d-5.382733754080243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40dbf48bb3dfdd%3A0x5ec52ffb0a1c1d02!2sUniversitas%20Teknokrat%20Indonesia!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

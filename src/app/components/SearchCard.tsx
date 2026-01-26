"use client";

import React, { useEffect, useState } from "react";
import { MapPin, Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/helpers/api";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";

import { ApiCategoryResponse, CategoryItem } from "@/types/category";
import { RegionApiResponse, Area } from "@/types/ChardRegion";

// Mapbox token (gratis plan)
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function SearchCard() {
  const router = useRouter();

  const [location, setLocation] = useState("Mendeteksi lokasi...");
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(
    null,
  );
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);

  const [openCategory, setOpenCategory] = useState(false);
  const [openArea, setOpenArea] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  // =======================
  // DETEKSI LOKASI + MAPBOX + OSM
  // =======================
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation("Geolocation tidak didukung browser ini");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoordinates({ lat: latitude, lng: longitude });

        try {
          // 1️⃣ Mapbox untuk akurasi titik
          const mapboxRes = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_TOKEN}`,
          );
          const mapboxData = await mapboxRes.json();

          let village = "";
          let district = "";
          let city = "";

          // Ambil koordinat Mapbox
          if (mapboxData.features && mapboxData.features.length > 0) {
            const feature = mapboxData.features[0];
            // Simpan coords akurat dari Mapbox
            setCoordinates({
              lat: feature.center[1],
              lng: feature.center[0],
            });
          }

          // 2️⃣ OSM Nominatim untuk nama desa/kecamatan/kota
          const osmRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
          );
          const osmData = await osmRes.json();
          const addr = osmData.address || {};

          village = addr.suburb || addr.village || addr.neighbourhood || "";
          district = addr.city_district || addr.county || "";
          city = addr.city || addr.town || addr.county || "";

          const parts = [village, district, city].filter(Boolean);
          setLocation(
            parts.join(", ") ||
              `Lokasi ditemukan (${latitude.toFixed(5)}, ${longitude.toFixed(5)})`,
          );
        } catch (err) {
          console.error("Geocoding error:", err);
          setLocation(
            `Gagal mendeteksi lokasi (${latitude.toFixed(5)}, ${longitude.toFixed(5)})`,
          );
        }
      },
      (err) => setLocation("Izin lokasi ditolak"),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    );
  }, []);

  // =======================
  // LOAD CATEGORY
  // =======================
  useEffect(() => {
    apiFetch<ApiCategoryResponse>("/api/category")
      .then((res) => {
        if (res.status === 200 && res.data?.items)
          setCategories(res.data.items);
      })
      .catch((err) => console.error("Gagal load kategori", err));
  }, []);

  // =======================
  // LOAD AREA
  // =======================
  useEffect(() => {
    apiFetch<RegionApiResponse>("/api/region")
      .then((res) => {
        if (res.status === 200 && res.data?.items) {
          setAreas(res.data.items.map((i) => ({ id: i.id, nama: i.name })));
        }
      })
      .catch((err) => console.error("Gagal load daerah", err));
  }, []);

  // =======================
  // SEARCH
  // =======================
  const handleSearch = () => {
    if (!selectedCategory && !selectedArea) {
      setErrorMessage("Silakan pilih kategori atau daerah");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    const params = new URLSearchParams();
    if (selectedCategory)
      params.append("category", String(selectedCategory.id));
    if (selectedArea) params.append("area", String(selectedArea.id));

    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-[22px] p-6 max-w-5xl mx-auto border shadow-sm">
      {/* HEADER */}
      <div className="border-b pb-3">
        <p className="text-xs font-medium text-gray-500 mb-1 block">
          Lokasi Kamu
        </p>
        <h2 className="text-xl font-semibold text-gray-800">{location}</h2>
      </div>

      {/* FORM */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
        {/* KATEGORI */}
        <div className="md:col-span-2">
          <label className="text-xs font-medium text-gray-500 mb-1 block pl-2">
            Kategori Wisata
          </label>
          <Popover open={openCategory} onOpenChange={setOpenCategory}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="w-full h-11 justify-between rounded-full cursor-pointer"
              >
                <div className="flex items-center gap-2 text-sm font-normal text-gray-600">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  {selectedCategory?.name || "Pilih Kategori"}
                </div>
                <ChevronsUpDown className="w-4 h-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-65">
              <Command>
                <CommandInput placeholder="Cari kategori..." />
                <CommandEmpty>Kategori tidak ditemukan</CommandEmpty>
                <CommandList>
                  {categories.map((cat) => (
                    <CommandItem
                      key={cat.id}
                      value={cat.name}
                      onSelect={() => {
                        setSelectedCategory(cat);
                        setOpenCategory(false);
                      }}
                    >
                      <Check
                        className={`mr-2 h-4 w-4 ${selectedCategory?.id === cat.id ? "opacity-100" : "opacity-0"}`}
                      />
                      {cat.name}
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* DAERAH */}
        <div className="md:col-span-2">
          <label className="text-xs font-medium text-gray-500 mb-1 block pl-2">
            Daerah
          </label>
          <Popover open={openArea} onOpenChange={setOpenArea}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="w-full h-11 justify-between rounded-full cursor-pointer"
              >
                <div className="flex items-center gap-2 text-sm font-normal text-gray-600">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  {selectedArea?.nama || "Pilih Daerah"}
                </div>
                <ChevronsUpDown className="w-4 h-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-65">
              <Command>
                <CommandInput placeholder="Cari daerah..." />
                <CommandEmpty>Daerah tidak ditemukan</CommandEmpty>
                <CommandList>
                  {areas.map((area) => (
                    <CommandItem
                      key={area.id}
                      value={area.nama}
                      onSelect={() => {
                        setSelectedArea(area);
                        setOpenArea(false);
                      }}
                    >
                      <Check
                        className={`mr-2 h-4 w-4 ${selectedArea?.id === area.id ? "opacity-100" : "opacity-0"}`}
                      />
                      {area.nama}
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* BUTTON */}
        <Button
          onClick={handleSearch}
          className="h-11 rounded-full bg-blue-500 hover:bg-blue-600 cursor-pointer"
        >
          Search
        </Button>
      </div>

      {/* ERROR */}
      {errorMessage && (
        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
      )}
    </div>
  );
}

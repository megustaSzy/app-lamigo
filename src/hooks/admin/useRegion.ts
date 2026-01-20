import { useState, useCallback, useEffect } from "react";
import { RegionItem } from "@/types/region";
import { regionService } from "@/services/regionService";

interface UseRegionProps {
  page: number;
  limit: number;
}

export function useRegion({ page, limit }: UseRegionProps) {
  const [regions, setRegions] = useState<RegionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [totalPages, setTotalPages] = useState(1);

  const fetchRegions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await regionService.getRegions({ page, limit });
      setRegions(res.data.items);
      setTotalPages(res.data.total_pages);
    } catch {
      setError("Gagal memuat data kabupaten");
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchRegions();
  }, [fetchRegions]);

  async function createRegion(fd: FormData) {
    await regionService.createRegion(fd);
    await fetchRegions();
  }

  async function updateRegion(id: number, fd: FormData) {
    await regionService.updateRegion(id, fd);
    await fetchRegions();
  }

  async function deleteRegion(id: number) {
    await regionService.deleteRegion(id);
    await fetchRegions();
  }

  return {
    regions,
    loading,
    error,
    totalPages,
    refetch: fetchRegions,
    createRegion,
    updateRegion,
    deleteRegion,
  };
}

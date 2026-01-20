import { apiFetch } from "@/helpers/api";
import { RegionApiResponse } from "@/types/region";

export const regionService = {
  getRegions(params: { page: number; limit: number }) {
    const { page, limit } = params;
    return apiFetch<RegionApiResponse>(
      `/api/region/admin?page=${page}&limit=${limit}`
    );
  },

  createRegion(formData: FormData) {
    return apiFetch(`/api/region`, {
      method: "POST",
      body: formData,
    });
  },

  updateRegion(id: number, formData: FormData) {
    return apiFetch(`/api/region/${id}`, {
      method: "PATCH",
      body: formData,
    });
  },

  deleteRegion(id: number) {
    return apiFetch(`/api/region/${id}`, {
      method: "DELETE",
    });
  },
};

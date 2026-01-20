import { apiFetch } from "@/helpers/api";
import { Profile } from "@/types/admin/profile";

export async function getAdminProfile() {
  return apiFetch<{ status: number; data: Profile }>("/api/users/profile");
}

export async function updateAdminProfile(userId: number, formData: FormData) {
  return apiFetch(`/api/users/${userId}`, {
    method: "PATCH",
    body: formData,
  });
}

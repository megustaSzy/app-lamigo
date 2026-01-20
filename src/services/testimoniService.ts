export interface CreateTestimoniPayload {
  name?: string;
  email?: string;
  profession?: string;
  comment: string;
  rating?: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function createTestimoni(payload: CreateTestimoniPayload) {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL belum diset");
  }

  const res = await fetch(`${API_URL}/api/testimoni`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Gagal mengirim testimoni");
  }

  return result;
}

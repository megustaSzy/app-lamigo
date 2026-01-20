// import Cookies from "js-cookie";

// export async function apiFetch<T>(
//   endpoint: string,
//   options: RequestInit = {}
// ): Promise<T> {
//   const baseUrl = process.env.NEXT_PUBLIC_API_URL;
//   if (!baseUrl) {
//     throw new Error("Environment NEXT_PUBLIC_API_URL tidak ditemukan.");
//   }

//   const fullUrl = `${baseUrl.replace(/\/+$/, "")}${endpoint}`;
//   const token = Cookies.get("accessToken");

//   const isFormData = options.body instanceof FormData;

//   const headers: HeadersInit = {
//     ...(token ? { Authorization: `Bearer ${token}` } : {}),
//     ...(isFormData ? {} : { "Content-Type": "application/json" }),
//     ...(options.headers ?? {}),
//   };

//   const response = await fetch(fullUrl, {
//     ...options,
//     method: options.method ?? "GET",
//     headers,
//     credentials: "include",
//   });

//   const text = await response.text();

//   if (!response.ok) {
//     console.error("API ERROR:", {
//       url: fullUrl,
//       status: response.status,
//       response: text,
//     });

//     if (response.status === 401) {
//       console.warn("TOKEN TIDAK VALID / EXPIRED");
//       // optional: Cookies.remove("accessToken");
//     }

//     throw new Error(text || `HTTP ${response.status}`);
//   }

//   if (!text) return {} as T;

//   return JSON.parse(text) as T;
// }
import Cookies from "js-cookie";

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) {
    throw new Error("Environment NEXT_PUBLIC_API_URL tidak ditemukan.");
  }

  const fullUrl = `${baseUrl.replace(/\/+$/, "")}${endpoint}`;
  const token = Cookies.get("accessToken");

  const isFormData = options.body instanceof FormData;

  const headers: HeadersInit = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(options.headers ?? {}),
  };

  const response = await fetch(fullUrl, {
    ...options,
    method: options.method ?? "GET",
    headers,
    credentials: "include",
  });

  const text = await response.text();

  if (!response.ok) {
    if (response.status === 401) {
      return Promise.reject({
        type: "UNAUTHORIZED",
        status: 401,
        message: text || "Unauthorized",
      });
    }

    console.error("API ERROR:", {
      url: fullUrl,
      status: response.status,
      response: text,
    });

    throw new Error(text || `HTTP ${response.status}`);
  }

  if (!text) return {} as T;

  return JSON.parse(text) as T;
}

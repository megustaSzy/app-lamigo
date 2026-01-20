export function setCookie(name: string, value: string, days = 7) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${value}; path=/; max-age=${days * 86400}`;
}

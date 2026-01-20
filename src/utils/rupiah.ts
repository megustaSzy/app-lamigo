export function formatRupiah(value: string) {
  if (!value) return "";
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function unformatRupiah(value: string) {
  return value.replace(/\./g, "");
}

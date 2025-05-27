export function capitalizeEachWord(str?: string | null) {
  if (!str) return "";
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}

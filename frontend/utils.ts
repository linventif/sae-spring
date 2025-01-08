export function getApiUrl() {
  if (import.meta.env.VITE_IS_DEV) {
    return "http://localhost:8080";
  }
  return "";
}

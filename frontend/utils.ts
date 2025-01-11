import { bearerToken } from "./components/Header";

export function getApiUrl() {
  if (import.meta.env.VITE_IS_DEV) {
    return "http://localhost:8080";
  }
  return "";
}

export function fetchApi(url: string, options: RequestInit = {}) {
  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${bearerToken()}`,
  };
  return fetch(`${getApiUrl()}${url}`, options);
}

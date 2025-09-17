import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const authFetch = async (
  url: string,
  options: RequestInit = {},
  refreshAccessToken: () => Promise<boolean>,
  accessToken: string | null
) => {
  const headers = {
    ...(options.headers || {}),
    "Content-Type": "application/json",
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };

  // First attempt
  let res = await fetch(url, { ...options, headers });

  // If unauthorized, try once to refresh token
  if (res.status === 401) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      const newToken = localStorage.getItem("access_token");
      const retryHeaders = {
        ...(options.headers || {}),
        "Content-Type": "application/json",
        ...(newToken ? { Authorization: `Bearer ${newToken}` } : {}),
      };
      res = await fetch(url, { ...options, headers: retryHeaders });
    }
  }

  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.status === 204 ? null : res.json(); // handle DELETE
}

export const useApiClient = () => {
  const { accessToken, refreshAccessToken } = useContext(AuthContext);

  return {
    authFetch: (url: string, options: RequestInit = {}) =>
      authFetch(url, options, refreshAccessToken, accessToken),
  };
}

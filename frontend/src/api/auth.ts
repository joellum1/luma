import { BASE_URL } from "./constants";

import { useApiClient } from "./client";
import type { User } from "../types";

const REGISTER_URL = BASE_URL + "users/register/";
const TOKEN_URL = BASE_URL + "api/token/";
const REFRESH_URL = BASE_URL + "api/token/refresh/";

export const useAuthApi = () => {
  const { authFetch } = useApiClient();

  return {
    registerUser: async (data: { username: string; email: string; password: string }): Promise<User> => {
      const res = await fetch(REGISTER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to register user");

      return res.json();
    },

    loginUser: async (data: { username: string; password: string }) => {
      const res = await fetch(TOKEN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Login failed");

      return res.json(); // returns { access, refresh }
    },

    refreshToken: async (refresh: string) => {
      const res = await fetch(REFRESH_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh }),
      });

      if (!res.ok) throw new Error("Refresh token failed");

      return res.json(); // returns { access }
    },

    // protected user call (requires authFetch)
    getProfile: async (): Promise<User> => authFetch(BASE_URL + "api/users/profile/", { method: "GET" }),
  };
}
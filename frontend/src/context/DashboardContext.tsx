import { BASE_URL } from "../api/constants";

import { createContext, useState, useEffect, type ReactNode, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { type DashboardData } from "../types";

interface DashboardContextType {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
  refreshDashboard: () => void;
}

export const DashboardContext = createContext<DashboardContextType>({
  data: null,
  loading: true,
  error: null,
  refreshDashboard: async () => {},
});

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const { accessToken, loading: authLoading, refreshAccessToken } = useContext(AuthContext);
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = async () => {
    if (!accessToken) {
      setData(null);
      setLoading(false);
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch(BASE_URL + "api/dashboard/", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      // If access was invalid (401) try to refresh once, then retry
      if (res.status === 401) {
        const refreshed = await refreshAccessToken();
        if (refreshed) {
          // try again with new token from localStorage
          const newAccess = localStorage.getItem("access_token");

          if (!newAccess) throw new Error("Unable to refresh token");

          const retry = await fetch(BASE_URL + "api/dashboard/", {
            headers: { Authorization: `Bearer ${newAccess}` },
          });

          if (!retry.ok) throw new Error("Failed to fetch dashboard after refresh");

          const json = await retry.json();
          setData(json);
          setError(null);
          return;
        }
        throw new Error("Unauthorized");
      }

      if (!res.ok) throw new Error("Failed to fetch dashboard data");

      const json: DashboardData = await res.json();
      setData(json);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

    // Wait until auth provider finishes initialization before fetching
    useEffect(() => {
      if (authLoading) return;
      void fetchDashboard();
    }, [authLoading, accessToken]);

  return (
    <DashboardContext.Provider value={{ data, loading, error, refreshDashboard: fetchDashboard }}>
      {children}
    </DashboardContext.Provider>
  );
};

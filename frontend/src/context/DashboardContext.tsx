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
  refreshDashboard: () => {},
});

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const { token } = useContext(AuthContext);
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = async () => {
    if (!token) return;
    
    setLoading(true);
    try {
      const res = await fetch(BASE_URL + "api/dashboard/", {
        headers: { Authorization: `Bearer ${token}` },
      });

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

  useEffect(() => {
    fetchDashboard();
  }, [token]);

  return (
    <DashboardContext.Provider value={{ data, loading, error, refreshDashboard: fetchDashboard }}>
      {children}
    </DashboardContext.Provider>
  );
};

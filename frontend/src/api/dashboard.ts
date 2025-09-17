import { BASE_URL } from "./constants";

import { useApiClient } from "./client";
import type { DashboardData } from "../types";

const DASHBOARD_URL = BASE_URL + "api/dashboard/";

export const useDashboardApi = () => {
  const { authFetch } = useApiClient();

  return {
    getDashboard: async (): Promise<DashboardData> => authFetch(DASHBOARD_URL, { method: "GET" }),
  };
}

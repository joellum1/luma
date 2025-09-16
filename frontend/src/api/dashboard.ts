import { BASE_URL } from "./constants";

export async function fetchDashboard() {
  const res = await fetch(BASE_URL + "api/dashboard/", {
    credentials: "include",
  });
  return res.json();
}

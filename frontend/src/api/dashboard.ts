export async function fetchDashboard() {
  const res = await fetch("http://127.0.0.1:8000/api/dashboard/", {
    credentials: "include",
  });
  return res.json();
}

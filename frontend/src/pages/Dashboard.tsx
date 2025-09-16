import { useEffect, useState, useContext } from "react";
import { type DashboardData } from "../types";
import { AuthContext } from "../context/AuthContext";
import { LogoutButton } from "../components/LogoutButton";

export default function Dashboard() {
  const { token } = useContext(AuthContext); // ✅ get JWT token from context
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setError("You must be logged in to view the dashboard.");
      setLoading(false);
      return;
    }

    fetch("http://127.0.0.1:8000/api/dashboard/", {
      headers: {
        Authorization: `Bearer ${token}`, // use JWT
      },
    }).then((res) => {
      if (!res.ok) throw new Error("Failed to fetch dashboard data");
      return res.json();
    }).then((json: DashboardData) => {
      setData(json);
      setLoading(false);
    }).catch((err) => {
      console.error(err);
      setError(err.message);
      setLoading(false);
    });
  }, [token]);

  if (loading) return <p className="p-8">Loading dashboard...</p>;
  if (error) return <p className="p-8 text-red-500">{error}</p>;
  if (!data) return <p className="p-8 text-red-500">No data available</p>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <LogoutButton />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-green-100 rounded shadow">
          <h2 className="font-semibold text-lg">Total Income</h2>
          <p className="text-xl">${data.income_total}</p>
        </div>
        <div className="p-4 bg-red-100 rounded shadow">
          <h2 className="font-semibold text-lg">Total Expenses</h2>
          <p className="text-xl">${data.expense_total}</p>
        </div>
        <div className="p-4 bg-blue-100 rounded shadow">
          <h2 className="font-semibold text-lg">Balance</h2>
          <p className="text-xl">${data.balance}</p>
        </div>
      </div>

      {/* Category Totals */}
      <div>
        <h2 className="text-xl font-bold mb-2">Expenses by Category</h2>
        <ul className="space-y-1">
          {data.category_totals.map((cat, idx) => (
            <li
              key={idx}
              className="p-2 border rounded flex justify-between"
            >
              <span>{cat.category}</span>
              <span>${cat.total}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

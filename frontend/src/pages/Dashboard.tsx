import { useEffect, useState } from "react";
import { type DashboardData } from "../types";

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/dashboard/", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json: DashboardData) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-8">Loading dashboard...</p>;
  if (!data) return <p className="p-8 text-red-500">Failed to load data</p>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
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

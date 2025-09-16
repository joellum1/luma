import { useContext } from "react";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend } from "recharts";

import { type Category } from "../types";
import { DashboardContext } from "../context/DashboardContext";
import { Navbar } from "../components/Navbar";

// Reusable component for summary card
const SummaryCard = ({ title, value, colour }: { title: string; value: number; colour: string }) => (
  <div className={`p-4 rounded shadow ${colour}`}>
    <h2 className="font-semibold text-lg">{title}</h2>
    <p className="text-xl">${value}</p>
  </div>
);

// Reusable component for category list
const CategoryList = ({ categories }: { categories: Category[] }) => (
  <ul className="space-y-1">
    {categories.map((cat, idx) => (
      <li key={idx} className="p-2 border rounded flex justify-between">
        <span>{cat.category}</span>
        <span>${cat.total}</span>
      </li>
    ))}
  </ul>
);

export default function Dashboard() {
  const { data, loading, error } = useContext(DashboardContext);

  if (loading) return <p className="p-8">Loading dashboard...</p>;
  if (error) return <p className="p-8 text-red-500">{error}</p>;
  if (!data) return <p className="p-8 text-red-500">No data available</p>;

  // Prepare data for charts
  const pieData = data.category_totals.map((cat) => ({
    name: cat.category,
    value: cat.total,
  }));
  const COLOURS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28CF6"];

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <Navbar />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <SummaryCard title="Total Income" value={data.income_total} colour="bg-green-100" />
        <SummaryCard title="Total Expenses" value={data.expense_total} colour="bg-red-100" />
        <SummaryCard title="Balance" value={data.balance} colour="bg-blue-100" />
      </div>

      {/* Charts + Category List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="h-80 p-4 border rounded shadow">
          <h2 className="font-semibold mb-2">Expenses by Category</h2>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" label>
                {pieData.map((_, idx) => (
                  <Cell key={idx} fill={COLOURS[idx % COLOURS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Category List / Bar Chart */}
        <div className="h-80 p-4 border rounded shadow">
          <h2 className="font-semibold mb-2">Expenses Breakdown</h2>
          <BarChart width={300} height={200} data={pieData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}

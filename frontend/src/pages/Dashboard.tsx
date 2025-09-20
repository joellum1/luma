import { useEffect, useState } from "react";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend } from "recharts";

import { useDashboardApi } from "../api/dashboard";

import type { DashboardData } from "../types";

import SideMenu from "../components/sidemenu/SideMenu";
import BreadcrumbsComponent from "../components/sidemenu/Breadcrumbs"

// Reusable component for summary card
const SummaryCard = ({ title, value, colour }: { title: string; value: number; colour: string }) => (
  <div className={`p-4 rounded shadow ${colour}`}>
    <h2 className="font-semibold text-lg">{title}</h2>
    <p className="text-xl">${value}</p>
  </div>
);

export default function Dashboard() {
  const { getDashboard } = useDashboardApi();

  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isMenuExpanded, setIsMenuExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsMenuExpanded(!isMenuExpanded);
  };

  useEffect(() => {
    getDashboard()
      .then((d) => setData(d))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);


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
    <div className="flex">
      <SideMenu isExpanded={isMenuExpanded}/>

      <div
        className={`flex-1 h-screen overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuExpanded ? 'ml-64' : 'ml-0'
        }`}
      >
        <div className="px-4 py-3 flex gap-4 items-center mb-6 box-border border-b border-gray-200">
          <button
            onClick={toggleSidebar}
            className="rounded hover:cursor-pointer hover:bg-gray-200"
          >
            <div className="px-2 py-1">
              <img 
                src="/svg/sidebar.svg"
                alt="expand sidebar"
                className="w-4 h-4"
              />
            </div>
          </button>

          <BreadcrumbsComponent />
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
    </div>
  );
}

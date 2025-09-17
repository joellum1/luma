import { Navbar } from "../components/Navbar";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center bg-[#f6f5f1]">
        <h1 className="text-4xl font-bold mb-4">Welcome to Luma</h1>
        <p className="mb-6 text-gray-700 text-center max-w-md">
          Track your expenses and income, visualize your dashboard, and manage transactions easily.
        </p>
      </main>
    </div>
  );
}

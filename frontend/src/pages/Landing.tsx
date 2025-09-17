import Navbar from "../components/Navbar";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLanding={true}/>

      <main className="flex-grow flex flex-col items-center justify-center bg-[#f6f5f1]">
        <h1 className="text-4xl font-bold mb-4">Streamlined Finances</h1>
        <p className="mb-6 text-gray-700 text-center max-w-md">
          Your one-stop shop for all things financial.
        </p>
      </main>
    </div>
  );
}

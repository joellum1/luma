// components/Navbar.tsx
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // redirect to login page after logout
  };

  return (
    <nav className="bg-gray-100 p-4 flex justify-between items-center shadow mb-6">
      <div className="space-x-4">
        <Link to="/" className="font-semibold text-blue-600 hover:underline">
          Dashboard
        </Link>
        <Link to="/transactions" className="font-semibold text-blue-600 hover:underline">
          Transactions
        </Link>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </nav>
  );
};

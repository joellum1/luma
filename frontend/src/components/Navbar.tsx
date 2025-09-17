// components/Navbar.tsx
import { Link } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

import { LogoutButton } from "./LogoutButton";

export const Navbar = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">Luma</Link>

      <div className="space-x-4">
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            <Link to="/transactions" className="hover:underline">Transactions</Link>
            <LogoutButton />
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};


import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";

export default function SideMenu({ isExpanded }: { isExpanded: boolean }) {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/"); // redirect to landing page after logout
  };

  return (
    <div className="flex">
      <nav
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-all duration-300 ease-in-out z-10 flex flex-col ${
          isExpanded ? "w-64 p-8" : "w-0 p-0 overflow-hidden"
        }`}
      >
        {/* Company / Personal Dashboard */}
        <div className="p-8">
          <Link
            to="/dashboard"
            className="flex items-center rounded hover:bg-gray-500"
          >
            <div className="flex items-center">
              <i>LOGO</i>
              <span className="ml-3 whitespace-nowrap">NAME</span>
            </div>
          </Link>
        </div>

        {/* Navigations Links */}
        <div className="space-y-2 flex-1">
          <Link
            to="/dashboard"
            className="flex items-center p-2 rounded hover:bg-gray-500"
          >
            <i>ICON</i>
            <span className="ml-3 whitespace-nowrap">Home</span>
          </Link>
        </div>

        {/* Profile */}
        <button 
          className="w-full px-4 py-2 hover:bg-gray-600 transition-colors">
          <Link
            to="/profile"
            className="whitespace-nowrap"
          >
            Profile
          </Link>
        </button>
      </nav>
    </div>
  );
}
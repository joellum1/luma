import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

export default function Navbar({ isLanding = false }) {
  const navigate = useNavigate();

  const { logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
    setIsProfileOpen(false); // Close popup on logout
    navigate("/"); // redirect to landing page after logout
  };

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const [_, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsProfileOpen(false); // Close profile popup when hovering off
  };

  return (
    <>
      {isLanding ? (
        // Top Navbar for Landing Page
        <nav className="w-full bg-transparent p-4 flex">
          <Link to="/" className="text-2xl font-bold text-gray-800">
            Luma
          </Link>

          {/* TO BE REMOVED */}
          <div className="space-x-4">
            <Link to="/login" className="hover:underline text-gray-700">
              Login
            </Link>
            <Link to="/register" className="hover:underline text-gray-700">
              Register
            </Link>
          </div>
        </nav>
      ): (
        // Collapsible Sidebar for Logged-In Pages (icons only, expands on hover)
        <nav 
          className="group fixed top-0 left-0 h-full w-12 bg-gray-800 text-white flex flex-col py-4 transition-all duration-300 ease-in-out hover:w-48"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Logo/Icon at top */}
          <Link to="/dashboard" className="flex items-center justify-center mb-8 p-2 rounded hover:bg-gray-700 transition-colors">
            <span className="ml-3 truncate group-hover:ml-3 opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap">
              Luma
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="space-y-2 flex-1">
            <Link 
              to="/dashboard" 
              className="flex items-center p-2 rounded hover:bg-gray-700 transition-colors"
              title="Dashboard" // Tooltip for accessibility
            >
              {/* <ChartBarIcon className="h-6 w-6" /> */}
              <span className="ml-3 truncate opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap">
                Dashboard
              </span>
            </Link>
            <Link 
              to="/transactions" 
              className="flex items-center p-2 rounded hover:bg-gray-700 transition-colors"
              title="Transactions"
            >
              {/* <CreditCardIcon className="h-6 w-6" /> */}
              <span className="ml-3 truncate opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap">
                Transactions
              </span>
            </Link>
          </div>

          {/* Profile Icon with Popup */}
          <div className="relative mt-auto">
            <button
              onClick={toggleProfileMenu}
              className="flex items-center p-2 rounded hover:bg-gray-700 transition-colors w-full"
              title="Profile"
            >
              {/* <UserCircleIcon className="h-6 w-6 flex-shrink-0" /> */}
              <span className="ml-3 truncate opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap">
                Profile
              </span>
            </button>
            
            {isProfileOpen && (
              <div className="absolute bottom-12 left-0 w-48 bg-gray-700 text-white rounded-md shadow-lg z-10">
                <button 
                  className="w-full px-4 py-2 hover:bg-gray-600 transition-colors">
                  <Link
                    to="/profile"
                    
                  >
                    Profile
                  </Link>
                </button>
                <button
                  className="w-full px-4 py-2 hover:bg-gray-600 transition-colors"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </nav>
      )}
    </>
  );
};


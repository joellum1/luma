import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

export default function SideMenu() {
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

  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsProfileOpen(false); // Close profile popup when hovering off
  };

  return (
    // Collapsible Sidebar for Logged-In Pages (icons only, expands on hover)
    <nav 
      className={`py-4 fixed top-0 left-0 h-full flex flex-col
        transition-all duration-300 ease-in-out 
        box-border border-r border-gray-200 shadow-sm
        ${isHovered ? 'w-48' : 'w-12'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Logo/Icon at top */}
      <Link 
        to="/dashboard" 
        className={`flex items-center ${!isHovered ? "justify-center" : ""} mb-8 p-2 rounded 
          hover:bg-gray-700 transition-colors`}>
        <div className="flex ">
          <i>L</i>
          <span className={`ml-3 truncate ${!isHovered ? "hidden" : ""} transition-all whitespace-nowrap`}>
            Luma
          </span>
        </div>
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
  );
};


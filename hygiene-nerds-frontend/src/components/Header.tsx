import { Link } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { useState } from "react";
import { ChevronDown, LogOut, User } from "react-feather";

export default function Header() {
  const { isAuthenticated, username, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50 border-b border-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent tracking-tight transition-all duration-300 group-hover:from-blue-500 group-hover:to-teal-400">
              Hygiene Nerds
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/products/#"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 rounded-lg hover:bg-blue-50/50"
            >
              Products
            </Link>
            <Link
              to="/about/#"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 rounded-lg hover:bg-blue-50/50"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 rounded-lg hover:bg-blue-50/50"
            >
              Contact
            </Link>
            <div className="h-6 w-px bg-gray-200 mx-2"></div>
            <Link
              to="/checkout"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 rounded-lg hover:bg-blue-50/50 flex items-center space-x-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span>Cart</span>
            </Link>

            {isAuthenticated ? (
              <div className="relative ml-2">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-1 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-teal-500 rounded-lg shadow hover:from-blue-500 hover:to-teal-400 transition-all duration-300"
                >
                  <span>{username || "Profile"}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <User className="h-4 w-4 mr-2" />
                      My Profile
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsProfileOpen(false);
                      }}
                      className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth/login"
                className="ml-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-teal-500 rounded-lg shadow hover:from-blue-500 hover:to-teal-400 transition-all duration-300"
              >
                Sign In
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Close dropdown when clicking outside */}
      {isProfileOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsProfileOpen(false)}
        />
      )}
    </header>
  );
}

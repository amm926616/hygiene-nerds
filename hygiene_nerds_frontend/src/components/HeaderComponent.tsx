import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Gift,
  LogOut,
  Settings,
  ShoppingCart,
  User,
} from "react-feather";
import { AiFillProduct } from "react-icons/ai";
import { BsNewspaper } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { useCart } from "../providers/CartContext";

export default function HeaderComponent() {
  const { cartCount } = useCart();
  const { isAuthenticated, username, logout } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // New state for dropdown
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null); // New ref for dropdown
  const location = useLocation();

  // Check for admin role on component mount and auth changes
  useEffect(() => {
    const role = sessionStorage.getItem("loggedInUserRole");
    setIsAdmin(role === "ROLE_ADMIN");
  }, [isAuthenticated]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    {
      to: "/products",
      text: "Products",
      icon: <AiFillProduct style={{ color: "blue" }} />,
    },
    ...(isAuthenticated
      ? [
          {
            to: "/special-offers",
            text: "Special Offers",
            icon: <Gift style={{ color: "green" }} className="h-4 w-4 mr-2" />,
          },
          {
            to: "/letterfeeds",
            text: "Hygiene News",
            icon: (
              <BsNewspaper style={{ color: "red" }} className="h-4 w-4 mr-2" />
            ),
          },
        ]
      : []),
  ].filter(Boolean);

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
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 text-sm font-medium text-slate-700 hover:text-violet-600 transition-all duration-300 rounded-lg hover:bg-violet-50/60 flex items-center ${
                  location.pathname === link.to
                    ? "font-semibold bg-violet-100 text-violet-700 shadow-sm shadow-violet-200/80"
                    : ""
                }`}
              >
                {link.icon}
                <span>{link.text}</span>
              </Link>
            ))}

            {/* Dropdown for Contact and About */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="px-4 py-2 text-sm font-medium text-teal-600 bg-teal-50 hover:text-teal-700 transition-colors duration-200 rounded-lg hover:bg-teal-100 flex items-center space-x-1 border border-teal-100"
              >
                <span>More</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg py-1 z-50 border border-slate-100 backdrop-blur-sm bg-white/90">
                  <Link
                    to="/contact"
                    className="flex items-center px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 group transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <svg
                      className="w-5 h-5 mr-3 text-blue-400 group-hover:text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span>Contact</span>
                  </Link>
                  <Link
                    to="/about"
                    className="flex items-center px-4 py-2.5 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 group transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <svg
                      className="w-5 h-5 mr-3 text-indigo-400 group-hover:text-indigo-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>About</span>
                  </Link>
                </div>
              )}
            </div>
            <div className="h-6 w-px bg-gradient-to-b from-slate-200 to-slate-100 mx-2"></div>

            <Link
              to="/checkout"
              className={`px-4 py-2 text-sm font-medium text-slate-700 hover:text-amber-600 transition-colors duration-200 rounded-lg hover:bg-amber-50/60 flex items-center space-x-1 relative ${
                location.pathname === "/checkout"
                  ? "bg-amber-100 font-semibold shadow-sm shadow-amber-200/50 text-amber-800"
                  : ""
              }`}
            >
              <div>
                <ShoppingCart className="h-5 w-5" />
                {/* Cart Count Badge */}
                {cartCount > 0 && (
                  <span className="absolute -top-1 left-7 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center bg-gradient-to-br from-pink-500 to-rose-500 shadow-sm">
                    {cartCount}
                  </span>
                )}
              </div>
              <span>Cart</span>
            </Link>

            {isAuthenticated ? (
              <div className="relative ml-2" ref={profileMenuRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-1 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-teal-500 rounded-lg shadow hover:from-blue-500 hover:to-teal-400 transition-all duration-300"
                >
                  <span>{username || "Profile"}</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
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
                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Admin Dashboard
                      </Link>
                    )}
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
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
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
                d={
                  isMobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="md:hidden bg-white rounded-lg shadow-lg mt-2 py-2 border border-gray-100"
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.icon}
                <span>{link.text}</span>
              </Link>
            ))}

            {/* Mobile Dropdown for Contact and About */}
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 w-full text-left"
            >
              More
              <ChevronDown
                className={`h-4 w-4 ml-auto transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isDropdownOpen && (
              <div className="ml-4">
                <Link
                  to="/contact"
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  to="/about"
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
              </div>
            )}

            <div className="border-t border-gray-200 my-1"></div>

            <Link
              to="/checkout"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              <span>Cart</span>
            </Link>

            {isAuthenticated ? (
              <>
                <div className="border-t border-gray-200 my-1"></div>
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="h-5 w-5 mr-2" />
                  <span>Profile</span>
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Settings className="h-5 w-5 mr-2" />
                    <span>Admin Dashboard</span>
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <Link
                to="/auth/login"
                className="flex items-center px-4 py-3 text-blue-600 font-medium hover:bg-blue-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>Sign In</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

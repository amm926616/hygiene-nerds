import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-50 to-blue-100 shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Brand Logo */}
        <Link
          to="/"
          className="text-2xl font-semibold text-blue-700 hover:text-blue-800 transition-all duration-300"
        >
          Hygiene Nerds
        </Link>

        {/* Navigation Links */}
        <nav className="space-x-6">
          <Link
            to="/products"
            className="text-gray-700 hover:text-blue-600 transition-all duration-300"
          >
            Products
          </Link>
          <Link
            to="/cart"
            className="text-gray-700 hover:text-blue-600 transition-all duration-300"
          >
            Check Out
          </Link>
          <Link
            to="/about"
            className="text-gray-700 hover:text-blue-600 transition-all duration-300"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="text-gray-700 hover:text-blue-600 transition-all duration-300"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}

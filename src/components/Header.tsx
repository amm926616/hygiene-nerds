import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white shadow-md py-6">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Brand Logo */}
        <Link
          to="/"
          className="text-3xl font-bold text-blue-800 hover:text-blue-700 transition-colors duration-300"
        >
          Hygiene Nerds
        </Link>

        {/* Navigation Links */}
        <nav className="flex space-x-4">
          <Link
            to="/products"
            className="px-4 py-2 rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
          >
            Products
          </Link>
          <Link
            to="/cart"
            className="px-4 py-2 rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
          >
            Check Out
          </Link>
          <Link
            to="/about"
            className="px-4 py-2 rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="px-4 py-2 rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
          >
            Contact
          </Link>
          <Link
            to="/signin"
            className="px-4 py-2 rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
          >
            Sign In
          </Link>
        </nav>
      </div>
    </header>
  );
}

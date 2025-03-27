import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-b from-blue-100 to-white shadow-md py-3 z-50">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.8,
        }}
      ></div>

      <div className="container mx-auto px-4 flex justify-between items-center relative z-10">
        <Link
          to="/"
          className="text-3xl font-bold text-blue-400 tracking-wide"
          style={{ fontFamily: "'Caskaydia Cove Nerd Font', sans-serif" }}
        >
          Hygiene Nerds
        </Link>

        <nav className="space-x-6">
          <Link
            to="/products"
            className="text-gray-700 hover:text-teal-600 transition duration-300"
          >
            Products
          </Link>
          <Link
            to="/about"
            className="text-gray-700 hover:text-teal-600 transition duration-300"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="text-gray-700 hover:text-teal-600 transition duration-300"
          >
            Contact
          </Link>
          <Link
            to="/cart"
            className="text-gray-700 hover:text-teal-600 transition duration-300"
          >
            Check Out
          </Link>
          <Link
            to="/signin"
            className="text-gray-700 hover:text-teal-600 transition duration-300"
          >
            Sign In
          </Link>
        </nav>
      </div>
    </header>
  );
}

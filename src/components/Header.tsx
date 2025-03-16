import { Link } from "react-router-dom";


export default function Header() {
  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-semibold text-blue-600">
          Hygiene Nerds
        </Link>
        <nav className="space-x-4">
          <Link to="/products" className="text-gray-700 hover:text-blue-600">
            Products
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600">
            About Us
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-600">
            Contact
          </Link>
          <Link to="/cart" className="text-gray-700 hover:text-blue-600">
            Check Out
          </Link>
        </nav>
      </div>
    </header>
  );
}


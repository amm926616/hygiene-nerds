import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-50 to-blue-100 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-semibold text-blue-700">
              Hygiene Nerds
            </Link>
            <p className="text-gray-600">
              Your trusted partner for high-quality hygiene products.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-blue-500 hover:text-blue-700 transition-all duration-300"
              >
                <i className="fab fa-facebook"></i>
              </a>
              <a
                href="#"
                className="text-blue-500 hover:text-blue-700 transition-all duration-300"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                className="text-blue-500 hover:text-blue-700 transition-all duration-300"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-700">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/products"
                  className="text-gray-600 hover:text-blue-500 transition-all duration-300"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="text-gray-600 hover:text-blue-500 transition-all duration-300"
                >
                  Check Out
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-blue-500 transition-all duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-blue-500 transition-all duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-700">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">123 Hygiene Street, Clean City</li>
              <li className="text-gray-600">Email: info@hygienerds.com</li>
              <li className="text-gray-600">Phone: +1 (123) 456-7890</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-blue-200 mt-8 pt-6 text-center text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} Hygiene Nerds. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

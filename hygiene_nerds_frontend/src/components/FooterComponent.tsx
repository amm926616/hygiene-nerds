import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function FooterComponent() {
  return (
    <footer className="bg-gradient-to-br from-blue-50 to-blue-100 border-t border-blue-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-6xl mx-auto">
          {/* Brand Info */}
          <div className="space-y-5">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                Hygiene Nerds
              </span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed">
              Premium hygiene solutions for a cleaner, healthier life. We
              deliver quality products you can trust.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-blue-600 hover:text-white hover:bg-blue-600 p-2 rounded-full transition-all duration-300"
                aria-label="Facebook"
              >
                <FaFacebook size={18} />
              </a>
              <a
                href="#"
                className="text-blue-600 hover:text-white hover:bg-blue-600 p-2 rounded-full transition-all duration-300"
                aria-label="Twitter"
              >
                <FaTwitter size={18} />
              </a>
              <a
                href="#"
                className="text-blue-600 hover:text-white hover:bg-blue-600 p-2 rounded-full transition-all duration-300"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-gray-800 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Products", path: "/products" },
                { name: "New Arrivals", path: "/new" },
                { name: "Best Sellers", path: "/bestsellers" },
                { name: "Special Offers", path: "/offers" },
                { name: "My Account", path: "/account" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-blue-600 transition-all duration-200 flex items-start"
                  >
                    <span className="w-1 h-1 bg-blue-400 rounded-full mt-2 mr-2"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-gray-800 uppercase tracking-wider">
              Customer Service
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Contact Us", path: "/contact" },
                { name: "FAQs", path: "/faqs" },
                { name: "Shipping Policy", path: "/shipping" },
                { name: "Returns & Refunds", path: "/returns" },
                { name: "Privacy Policy", path: "/privacy" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-blue-600 transition-all duration-200 flex items-start"
                  >
                    <span className="w-1 h-1 bg-blue-400 rounded-full mt-2 mr-2"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-gray-800 uppercase tracking-wider">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-blue-500 mt-1 flex-shrink-0" />
                <span className="text-gray-600">
                  123 Hygiene Street, Clean City, CA 90210
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <FaEnvelope className="text-blue-500 mt-1 flex-shrink-0" />
                <a
                  href="mailto:info@hygienerds.com"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  info@hygienerds.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <FaPhone className="text-blue-500 mt-1 flex-shrink-0" />
                <a
                  href="tel:+11234567890"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  +1 (123) 456-7890
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright & Additional Links */}
        <div className="border-t border-blue-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Hygiene Nerds. All rights
              reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                to="/terms"
                className="text-gray-500 hover:text-blue-600 text-sm transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/privacy"
                className="text-gray-500 hover:text-blue-600 text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/cookies"
                className="text-gray-500 hover:text-blue-600 text-sm transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

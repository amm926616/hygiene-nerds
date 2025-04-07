import { Link } from "react-router-dom";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import { useAuth } from "../providers/AuthProvider";

export default function Unauthorized() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-lg text-center">
        <div className="mx-auto w-16 h-16 flex items-center justify-center bg-red-100 rounded-full mb-6">
          <ShieldAlert className="text-red-500 w-8 h-8" />
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          Access Restricted
        </h1>

        <p className="text-gray-600 mb-6">
          You don't have permission to view this page. If you believe this is an
          error, please contact support or try a different account.
        </p>

        <div className="space-y-3">
          <Link
            to={isAuthenticated ? "/" : "/auth/login"}
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <ArrowLeft className="mr-2" size={18} />
            {isAuthenticated ? "Back to Home" : "Go to Login"}
          </Link>

          {isAuthenticated && (
            <Link
              to="/profile"
              className="inline-block px-6 py-3 text-blue-600 hover:text-blue-800 font-medium"
            >
              View your profile instead
            </Link>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Need help?{" "}
            <Link to="/contact" className="text-blue-600 hover:underline">
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

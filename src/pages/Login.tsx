import { Link, useNavigate } from "react-router-dom";
import BubbleWidget from "../components/RealisticBubbleWidget";
import {
  loginApiCall,
  setAuthenticated,
  setLoggedInUserName,
  setLoggedInUserRole,
  setToken,
} from "../service/auth.service";
import { useState } from "react";
import { Eye, EyeOff } from "react-feather";
import RealisticBubbleComponent from "../components/RealisticBubbleComponent";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message

    const login = { username, password };

    loginApiCall(login)
      // Fix the typo and call the function properly
      .then((res) => {
        const token = "Basic " + btoa(`${username}:${password}`);
        setToken(token);
        setLoggedInUserName(username);
        setLoggedInUserRole(res.data); // Ensure this matches "ROLE_ADMIN" or "ROLE_CUSTOMER"
        setAuthenticated(true); // Fixed: Proper function call
        setUsername(username);
        setPassword(password);
        navigate("/");
        window.location.reload();
        console.log(token);
      })

      .catch((err) => {
        console.log(err);
        setErrorMessage("Invalid username or password. Please try again.");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-tl from-blue-300 to-blue-200 flex items-center justify-center relative overflow-hidden">
      {Array.from({ length: 20 }).map((_, index) => (
        <div
          key={index}
          className="absolute -bottom-10"
          style={{
            left: `${Math.random() * 100}%`,
            animation: `floatUp ${Math.random() * 6 + 4}s ease-in-out infinite`,
          }}
        >
          <RealisticBubbleComponent />
        </div>
      ))}

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md relative z-10">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Welcome Back
        </h2>

        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center text-sm">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-gray-700 border border-blue-200 rounded-full focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none transition-all duration-300"
              placeholder="Enter your username"
              required
              autoComplete="username"
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-gray-700 border border-blue-200 rounded-full focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none transition-all duration-300"
              placeholder="Enter your password"
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-500 hover:text-blue-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full ${isLoading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-200 hover:bg-blue-300"} text-blue-800 py-2 px-4 rounded-full font-semibold focus:ring-2 focus:ring-blue-300 transition-all duration-300`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/auth/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>

      <style>
        {`
          @keyframes floatUp {
            0% {
              transform: translateY(0);
              opacity: 0.8;
            }
            50% {
              opacity: 1;
            }
            100% {
              transform: translateY(-100vh);
              opacity: 0.3;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Login;

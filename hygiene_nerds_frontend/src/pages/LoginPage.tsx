import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "react-feather";
import RealisticBubbleComponent from "../components/RealisticBubbleComponent";
import { WelcomeComponent } from "../components/WelcomeComponent";
import {
  loginApiCall,
  setAuthenticated,
  setLoggedInUserName,
  setLoggedInUserRole,
  setToken,
} from "../service/auth.service";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    showPassword: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setFormData((prev) => ({
      ...prev,
      showPassword: !prev.showPassword,
    }));
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const { username, password } = formData;
      const response = await loginApiCall({ username, password });

      // Set authentication state
      const token = "Basic " + btoa(`${username}:${password}`);
      setToken(token);
      setLoggedInUserName(username);
      setLoggedInUserRole(response.data);
      setAuthenticated(true);

      // Show welcome screen
      setShowWelcome(true);
    } catch (err) {
      setErrorMessage("Invalid username or password. Please try again.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWelcomeComplete = () => {
    navigate("/", {
      replace: true,
      state: { freshLogin: true },
    });
    window.location.reload();
  };

  const bubblePositions = useMemo(
    () =>
      Array.from({ length: 20 }).map(() => ({
        left: Math.random() * 100,
        duration: Math.random() * 6 + 4,
      })),
    [],
  );

  return (
    <div className="min-h-screen bg-gradient-to-tl from-blue-300 to-blue-200 flex items-center justify-center relative overflow-hidden">
      {/* Animated bubbles background */}
      {bubblePositions.map((pos, index) => (
        <div
          key={index}
          className="absolute -bottom-10"
          style={{
            left: `${pos.left}%`,
            animation: `floatUp ${pos.duration}s ease-in-out infinite`,
          }}
        >
          <RealisticBubbleComponent />
        </div>
      ))}

      {/* Login Form */}
      {!showWelcome && (
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
                value={formData.username}
                onChange={handleInputChange}
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
                type={formData.showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-1 text-gray-700 border border-blue-200 rounded-full focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none transition-all duration-300"
                placeholder="Enter your password"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-500 hover:text-blue-500"
                onClick={togglePasswordVisibility}
              >
                {formData.showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
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
      )}

      {/* Welcome Screen */}
      {showWelcome && (
        <WelcomeComponent
          username={formData.username}
          onClose={handleWelcomeComplete}
        />
      )}

      <style>
        {`
          @keyframes floatUp {
            0% { transform: translateY(0); opacity: 0.8; }
            50% { opacity: 1; }
            100% { transform: translateY(-100vh); opacity: 0.3; }
          }
        `}
      </style>
    </div>
  );
};

export default LoginPage;

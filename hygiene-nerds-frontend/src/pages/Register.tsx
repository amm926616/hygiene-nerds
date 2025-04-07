import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useMemo, useState } from "react";
import { registerApiCall } from "../service/auth.service";
import RealisticBubbleComponent from "../components/RealisticBubbleComponent";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    username: "",
    address: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      await registerApiCall(formData);
      setSuccessMessage("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);
    } catch (err) {
      console.error("Registration error:", err);
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Registration failed. Please try again.";
      setErrorMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
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

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md relative z-10">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Create Account
        </h2>

        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center text-sm">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-center text-sm">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-600"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 text-gray-700 border border-blue-200 rounded-full focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none transition-all duration-300"
                placeholder="First name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-600"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 text-gray-700 border border-blue-200 rounded-full focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none transition-all duration-300"
                placeholder="Last name"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 text-gray-700 border border-blue-200 rounded-full focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none transition-all duration-300"
              placeholder="Email address"
              required
            />
          </div>

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
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 text-gray-700 border border-blue-200 rounded-full focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none transition-all duration-300"
              placeholder="Username"
              required
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
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 text-gray-700 border border-blue-200 rounded-full focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none transition-all duration-300"
              placeholder="Password"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-500 hover:text-blue-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-600"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 text-gray-700 border border-blue-200 rounded-full focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none transition-all duration-300"
              placeholder="Phone number"
              required
            />
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-600"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 text-gray-700 border border-blue-200 rounded-full focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none transition-all duration-300"
              placeholder="Address"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full ${isLoading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-200 hover:bg-blue-300"} text-blue-800 py-2 px-4 rounded-full font-semibold focus:ring-2 focus:ring-blue-300 transition-all duration-300`}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-blue-500 hover:underline">
            Login
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

export default Register;

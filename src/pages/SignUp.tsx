import React, { useState } from "react";
import { Link } from "react-router-dom";
import BubbleWidget from "../components/RealisticBubbleWidget";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign-up logic here
    console.log("Signing up with:", email, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tl from-blue-300 to-blue-200 flex items-center justify-center relative overflow-hidden">
      {/* Floating Bubbles */}
      {Array.from({ length: 20 }).map((_, index) => (
        <div
          key={index}
          className="absolute -bottom-10" // Start bubbles below the container
          style={{
            left: `${Math.random() * 100}%`,
            animation: `floatUp ${Math.random() * 6 + 4}s ease-in-out infinite`,
          }}
        >
          <BubbleWidget />
        </div>
      ))}

      {/* SignUp Form */}
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md relative z-10">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-gray-700 border border-blue-200 rounded-full focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none transition-all duration-300"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-gray-700 border border-blue-200 rounded-full focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none transition-all duration-300"
              placeholder="Enter your password"
              required
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-600"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-gray-700 border border-blue-200 rounded-full focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none transition-all duration-300"
              placeholder="Confirm your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-200 text-blue-800 py-2 px-4 rounded-full font-semibold hover:bg-blue-300 focus:ring-2 focus:ring-blue-300 transition-all duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </p>
      </div>

      {/* Bubble Animation */}
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
              transform: translateY(-100vh); /* Moves bubbles fully out of viewport */
              opacity: 0.3;
            }
          }
        `}
      </style>
    </div>
  );
};

export default SignUp;

import { Link } from "react-router-dom";
import Bubble from "./Bubble";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-100 to-blue-50 py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-blue-800 mb-4">
          Cleanliness, Simplified.
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Discover high-quality hygiene products for a healthier life.
        </p>
        <Link
          to="/products"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full"
        >
          Shop Now
        </Link>
      </div>
      {/* Bubbles */}
      {[...Array(20)].map((_, i) => (
        <Bubble
          key={i}
          size={Math.random() * 50 + 20}
          x={Math.random() * 100}
          y={Math.random() * 100}
        />
      ))}
    </section>
  );
};
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import RealisticBubbleComponent from "./RealisticBubbleWidget";
export default function Hero() {
  const [bubbles, setBubbles] = useState<
    Array<{ id: number; top: number; left: number }>
  >([]);

  useEffect(() => {
    // Function to generate a new bubble
    const generateBubble = () => {
      const newBubble = {
        id: Date.now(), // Unique ID for each bubble
        top: Math.random() * 100, // Random vertical position
        left: Math.random() * 100, // Random horizontal position
      };
      setBubbles((prev) => [...prev, newBubble]);

      // Remove the bubble after the animation ends (e.g., 10 seconds)
      setTimeout(() => {
        setBubbles((prev) =>
          prev.filter((bubble) => bubble.id !== newBubble.id),
        );
      }, 10000); // Adjust the timeout to match the animation duration
    };

    // Generate a new bubble every 500ms
    const interval = setInterval(generateBubble, 500);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-gradient-to-b from-blue-200 to-blue-100 py-20 relative overflow-hidden">
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
      {/* Floating Bubbles */}
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute animate-bubble"
          style={{
            top: `${bubble.top}%`,
            left: `${bubble.left}%`,
            transform: `translate(-50%, -50%)`, // Center the bubbles at their position
          }}
        >
          <RealisticBubbleComponent />
        </div>
      ))}
    </section>
  );
}

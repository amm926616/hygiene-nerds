import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import RealisticBubbleComponent from "./RealisticBubbleWidget";

export default function Hero() {
  const [bubbles, setBubbles] = useState<
    Array<{
      id: number;
      top: number;
      left: number;
      size: number;
      duration: number;
    }>
  >([]);
  const MAX_BUBBLES = 50;

  useEffect(() => {
    let bubbleId = 0;
    const timeouts: NodeJS.Timeout[] = [];

    const generateBubble = () => {
      if (bubbles.length >= MAX_BUBBLES) return;

      const newBubble = {
        id: bubbleId++,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 20 + 10, // Random size between 10 and 30
        duration: Math.random() * 5000 + 5000, // Random duration between 5s and 10s
      };

      setBubbles((prev) => [...prev, newBubble]);

      const timeoutId = setTimeout(() => {
        setBubbles((prev) =>
          prev.filter((bubble) => bubble.id !== newBubble.id),
        );
      }, newBubble.duration);

      timeouts.push(timeoutId);
    };

    const interval = setInterval(generateBubble, 500);

    return () => {
      clearInterval(interval);
      timeouts.forEach(clearTimeout);
    };
  }, [bubbles]);

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
            transform: `translate(-50%, -50%)`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            animationDuration: `${bubble.duration}ms`,
          }}
          aria-hidden="true"
        >
          <RealisticBubbleComponent />
        </div>
      ))}
    </section>
  );
}

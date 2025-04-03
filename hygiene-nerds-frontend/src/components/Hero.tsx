import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import RealisticBubbleComponent from "./RealisticBubbleComponent";

export default function Hero() {
  const [bubbles, setBubbles] = useState<
    Array<{
      id: number;
      top: number;
      left: number;
      size: number;
      duration: number;
      opacity: number;
    }>
  >([]);
  const bubbleId = useRef(0); // Using ref to maintain unique IDs
  const MAX_BUBBLES = 20;

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    const generateBubble = () => {
      if (bubbles.length >= MAX_BUBBLES) return;

      const newBubble = {
        id: bubbleId.current++,
        top: 100 + Math.random() * 10, // Start below viewport
        left: Math.random() * 100,
        size: Math.random() * 30 + 15, // Slightly larger bubbles (15-45px)
        duration: Math.random() * 8000 + 7000, // Longer duration (7-15s)
        opacity: Math.random() * 0.5 + 0.3, // 30-80% opacity
      };

      setBubbles((prev) => [...prev, newBubble]);

      const timeoutId = setTimeout(() => {
        setBubbles((prev) =>
          prev.filter((bubble) => bubble.id !== newBubble.id),
        );
      }, newBubble.duration);

      timeouts.push(timeoutId);
    };

    // Initial bubble burst
    const initialBurst = setTimeout(() => {
      Array(15)
        .fill(0)
        .forEach(() => generateBubble());
    }, 100);

    const interval = setInterval(generateBubble, 600); // Slower generation

    return () => {
      clearInterval(interval);
      clearTimeout(initialBurst);
      timeouts.forEach(clearTimeout);
    };
  }, [bubbles]);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 to-blue-200 overflow-hidden">
      {/* Background canvas effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBvcGFjaXR5PSIwLjEiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMyIgZmlsbD0iIzAwNzBmZiIvPjwvZz48L3N2Zz4=')]" />
      </div>

      <div className="container mx-auto px-4 py-20 text-center relative z-10">
        <div className="max-w-3xl mx-auto backdrop-blur-sm bg-white/10 p-8 rounded-3xl shadow-lg">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-blue-900 mb-6 leading-tight">
            Cleanliness, <span className="text-blue-600">Simplified</span>.
          </h1>
          <p className="text-xl md:text-2xl text-blue-800 mb-10 opacity-90 leading-relaxed">
            Discover premium hygiene products designed for your health and
            comfort.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products/"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Shop Now
            </Link>
            <Link
              to="/about"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-4 px-8 rounded-full shadow-sm hover:shadow-md transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Bubbles */}
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute pointer-events-none animate-bubble"
          style={{
            top: `${bubble.top}%`,
            left: `${bubble.left}%`,
            transform: `translate(-50%, -50%)`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            animationDuration: `${bubble.duration}ms`,
            filter: `blur(${Math.random() * 2}px)`,
            opacity: bubble.opacity,
            zIndex: Math.floor(bubble.size / 15), // Larger bubbles appear behind
          }}
          aria-hidden="true"
        >
          <RealisticBubbleComponent />
        </div>
      ))}

      {/* Animation keyframes */}
      <div className="animate-[bubble_linear_forwards]"></div>
    </section>
  );
}

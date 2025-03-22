import { useEffect, useState } from "react";
import BubbleWidget from "../components/RealisticBubbleWidget";

const ProductBackground = ({ children }: { children: React.ReactNode }) => {
  const [bubbles, setBubbles] = useState<
    { id: number; left: string; animation: string }[]
  >([]);

  useEffect(() => {
    // Generate animated bubbles dynamically
    const newBubbles = Array.from({ length: 8 }).map((_, index) => ({
      id: index,
      left: `${Math.random() * 100}%`, // Random horizontal placement
      animation: `floatUp ${Math.random() * 6 + 4}s ease-in-out infinite`, // Random float animation duration
    }));
    setBubbles(newBubbles);
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-100 to-blue-200 border border-blue-300 p-6 rounded-2xl shadow-lg w-full overflow-hidden relative">
      {/* Floating Bubbles */}
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute -top-10" // Start bubbles above the container
          style={{
            left: bubble.left,
            animation: bubble.animation,
          }}
        >
          <BubbleWidget />
        </div>
      ))}

      {/* Inner Content */}
      <div className="relative z-10">{children}</div>

      {/* Bubble Animation */}
      <style>
        {`
          @keyframes floatUp {
            0% {
              transform: translateY(100%);
              opacity: 0.8; /* Initial visibility */
            }
            50% {
              opacity: 1;
            }
            100% {
              transform: translateY(-100%);
              opacity: 0.3; /* Fade out at the top */
            }
          }
        `}
      </style>
    </div>
  );
};

export default ProductBackground;

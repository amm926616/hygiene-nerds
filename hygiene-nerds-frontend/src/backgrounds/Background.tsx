import { useEffect, useState } from "react";
import RealisticBubbleComponent from "../components/RealisticBubbleComponent";

const ProductBackground = ({ children }: { children: React.ReactNode }) => {
  const [bubbles, setBubbles] = useState<
    { id: number; left: string; animation: string }[]
  >([]);

  useEffect(() => {
    // Generate animated bubbles dynamically
    const newBubbles = Array.from({ length: 20 }).map((_, index) => ({
      id: index,
      left: `${Math.random() * 100}vw`, // Random horizontal placement
      animation: `floatUp ${Math.random() * 6 + 4}s ease-in-out infinite`, // Random float animation duration
    }));
    setBubbles(newBubbles);
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-100 to-blue-200 border border-blue-200/50 p-8 rounded-3xl shadow-xl w-full overflow-hidden relative backdrop-blur-sm">
      {/* Floating Bubbles */}
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute -bottom-10" // Start bubbles below the container
          style={{
            left: bubble.left,
            animation: bubble.animation,
          }}
        >
          <RealisticBubbleComponent />
        </div>
      ))}
      {/* Inner Content */}
      <div className="relative z-10">{children}</div>
      {/* Bubble Animation */}
      <style>
        {`
          @keyframes floatUp {
            0% {
              transform: translateY(0); /* Start from the bottom */
              opacity: 0.8;
            }
            50% {
              opacity: 1;
            }
            100% {
              transform: translateY(-100vh); /* Move to the top of the screen */
              opacity: 0.3;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ProductBackground;

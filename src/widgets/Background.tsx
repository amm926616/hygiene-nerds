import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const ProductBackground = () => {
  const [bubbles, setBubbles] = useState<{ id: number; size: number; left: string; animation: string }[]>([]);

  useEffect(() => {
    // Generate animated bubbles dynamically
    const newBubbles = Array.from({ length: 10 }).map((_, index) => ({
      id: index,
      size: Math.random() * 60 + 20, // Random size between 20px - 80px
      left: `${Math.random() * 100}%`, // Random left position
      animation: `floatUp ${Math.random() * 5 + 5}s ease-in-out infinite`, // Random float animation duration
    }));
    setBubbles(newBubbles);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      {/* Abstract Soft Wave Background */}
      <svg className="absolute top-0 left-0 w-full h-auto opacity-60" viewBox="0 0 1440 320">
        <path
          fill="#ebf8ff"
          fillOpacity="1"
          d="M0,192L80,186.7C160,181,320,171,480,160C640,149,800,139,960,122.7C1120,107,1280,85,1360,74.7L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        ></path>
      </svg>

      {/* Floating Bubbles */}
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute bottom-0 bg-blue-200 bg-opacity-50 rounded-full"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: bubble.left,
            animation: bubble.animation,
          }}
        ></div>
      ))}

      {/* Inner Content Wrapper */}
      <div className="relative z-10 p-6">{<ProductCard />}</div>

      {/* Bubble Animation Keyframes */}
      <style>
        {`
          @keyframes floatUp {
            0% {
              transform: translateY(100%);
              opacity: 0.5;
            }
            50% {
              opacity: 1;
            }
            100% {
              transform: translateY(-20%);
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ProductBackground;

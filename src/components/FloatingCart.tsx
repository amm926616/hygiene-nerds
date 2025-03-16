import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

const FloatingCart = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [bubbles, setBubbles] = useState<any[]>([]);

  useEffect(() => {
    // Generate random bubble properties when the component is mounted
    const newBubbles = [...Array(7)].map(() => {
      return {
        size: Math.random() * 5 + 6,
        top: Math.random() * 100 + "%",
        left: Math.random() * 100 + "%",
        color: `rgba(${Math.random() * 100 + 150}, ${
          Math.random() * 100 + 150
        }, ${Math.random() * 100 + 200}, 0.5)`,
      };
    });
    setBubbles(newBubbles);
  }, []); // This will run only once, when the component is first mounted

  const handleDragEnd = (event: any, info: any) => {
    {
      (event, info) => setPosition({ x: info.point.x, y: info.point.y });
    }
  };

  return (
    <motion.div
      className="fixed bottom-10 right-10 z-50 flex items-center justify-center bg-transparent"
      drag
      dragConstraints={{
        left: -window.innerWidth,
        right: window.innerWidth,
        top: -window.innerHeight,
        bottom: window.innerHeight,
      }}
      onDragEnd={handleDragEnd}
      animate={{
        scale: [1, 1.05,1], // Subtler breathing animation
      }}
      transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
    >
      {/* Main Bubble */}
      <div className="relative">
        <motion.div
          className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(173, 216, 230, 0.9), rgba(100, 149, 237, 0.8))",
            boxShadow: "0px 0px 20px rgba(173, 216, 230, 0.5)", // Soft glow effect
          }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
        >
          <ShoppingCart className="text-white w-8 h-8 opacity-90" />

          {/* White Reflection Dot (Top-Left) */}
          <div className="absolute top-3 left-3 w-4 h-4 bg-white rounded-full opacity-70 blur-[1px]" />

          <div
            className="absolute bottom-1 right-1 w-6 h-5 opacity-60 blur-[1px]"
            style={{
              clipPath: "ellipse(30% 40% at 30% 30%)", // Arch shape
              transform: "rotate(-20deg) scaleX(1.5)", // Rotate and stretch
              background:
                "linear-gradient(to bottom, rgba(255, 255, 255), rgba(255, 255, 255))", // Gradient transparency
            }}
            animate={{
              opacity: [0.4, 0.6, 0.4], // Fading animation
              y: [0, -2, 0], // Slight vertical movement
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Small Floating Bubbles */}
        {bubbles.map((bubble, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(255, 255, 255, 0.8), ${bubble.color})`,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              top: bubble.top,
              left: bubble.left,
              border: "1px solid rgba(255, 255, 255, 0.4)",
            }}
            animate={{
              y: [0, Math.random() * 20 - 10, 0], // Random vertical movement
              x: [0, Math.random() * 20 - 10, 0], // Random horizontal movement
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default FloatingCart;

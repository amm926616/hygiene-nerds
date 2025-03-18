import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

const FloatingCart = () => {
  const padding = 120;
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [bubbles, setBubbles] = useState<any[]>([]);
  const [constraints, setConstraints] = useState(constraintValues());

  useEffect(() => {
    // Generate floating bubbles
    setBubbles(
      Array.from({ length: 10 }, () => ({
        size: Math.random() * 5 + 6,
        color: `rgba(180, 210, 250, 0.6)`, // Soft blue tint
      }))
    );

    // Set screen constraints dynamically
    const updateConstraints = () => {
      setConstraints(constraintValues());
    };

    updateConstraints();
    window.addEventListener("resize", updateConstraints);
    return () => window.removeEventListener("resize", updateConstraints);
  }, []);

  const handleDragEnd = (event: any, info: any) => {
    setPosition({ x: info.point.x, y: info.point.y });
    console.log("constraints: ", constraints);
    console.log("cursor position: ", info.point.x, info.point.y);
  };

  return (
    <motion.div
      className="fixed bottom-10 right-10 z-50 flex items-center justify-center bg-transparent"
      drag
      dragConstraints={constraints} // Dynamic constraints
      onDragEnd={handleDragEnd}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      animate={{ scale: [1, 1.3, 1] }}
      transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
    >
      {/* Main Cart Bubble */}
      <motion.div
        className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(173, 216, 230, 0.9), rgba(100, 149, 237, 0.8))",
          boxShadow: "0px 0px 20px rgba(173, 216, 230, 0.5)",
        }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
      >
        <ShoppingCart className="text-white w-8 h-8 opacity-90" />

        {/* White Reflection Dot */}
        <div className="absolute top-3 left-3 w-4 h-4 bg-white rounded-full opacity-70 blur-[1px]" />

        {/* White Ground Reflection */}
        <div
          className="absolute bottom-0 right-0 w-10 h-6 opacity-80 blur-[2px]"
          style={{
            clipPath: "ellipse(50% 30% at 50% 70%)", // More natural shape
            transform: "rotate(-216deg) scaleX(0.8)", // Better alignment
            background:
                "linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.6))", // Pure white fading out
          }}
        />
      </motion.div>

      {/* Small Floating Bubbles (Blue Tint) */}
      {bubbles.map((bubble, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            background: `radial-gradient(circle, rgba(255, 255, 255, 0.8), ${bubble.color})`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            borderRadius: "50%",
            border: "1px solid rgba(255, 255, 255, 0.4)",
            left: "50%", // Start from the center of the main bubble
            top: "50%",
            transform: "translate(-50%, -50%)", // Adjust to true center
          }}
          animate={{
            x: [0, Math.cos((i / bubbles.length) * 2 * Math.PI) * 40, 0],
            y: [0, Math.sin((i / bubbles.length) * 2 * Math.PI) * 40, 0],
            rotate: -360, // Full circular motion
          }}
          transition={{
            duration: Math.random() * 4 + 2, // Different speeds for each
            repeat: Infinity,
            ease: "linear", // Smooth continuous motion
          }}
        />
      ))}
    </motion.div>
  );

  function constraintValues(): { left: number; right: number; top: number; bottom: number; } | (() => { left: number; right: number; top: number; bottom: number; }) {
    return {
      left: -window.innerWidth + padding + 20,
      right: 0,
      top: -window.innerHeight + padding + 20,
      bottom: 0,
    };
  }
};

export default FloatingCart;
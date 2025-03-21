import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

const FloatingCart = () => {
  const padding = 120;
  const [constraints, setConstraints] = useState(() => getConstraintValues());

  useEffect(() => {
    const updateConstraints = () => setConstraints(getConstraintValues());
    window.addEventListener("resize", updateConstraints);
    return () => window.removeEventListener("resize", updateConstraints);
  }, []);

  return (
    <motion.div
      className="fixed bottom-10 right-10 z-50 flex items-center justify-center"
      drag
      dragConstraints={constraints}
      animate={{ scale: [1, 1.3, 1] }}
      transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
    >
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
        <div className="absolute top-3 left-3 w-4 h-4 bg-white rounded-full opacity-70 blur-[1px]" />
        <div
          className="absolute bottom-0 right-0 w-10 h-6 opacity-80 blur-[2px]"
          style={{
            clipPath: "ellipse(50% 30% at 50% 70%)",
            transform: "rotate(-216deg) scaleX(0.8)",
            background:
              "linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.6))",
          }}
        />
      </motion.div>
    </motion.div>
  );

  function getConstraintValues() {
    return {
      left: -window.innerWidth + padding + 20,
      right: 0,
      top: -window.innerHeight + padding + 20,
      bottom: 0,
    };
  }
};

export default FloatingCart;

import { motion } from "framer-motion";

const FloatingBubbles = () => {
  const bubbles = Array.from({ length: 20 }, () => ({
    size: Math.random() * 5 + 6,
    color: `rgba(180, 210, 250, 0.6)`,
    duration: Math.random() * 4 + 2,
  }));

  return (
    <>
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
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            x: [0, Math.cos((i / bubbles.length) * 2 * Math.PI) * 40, 0],
            y: [0, Math.sin((i / bubbles.length) * 2 * Math.PI) * 40, 0],
            rotate: -360,
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </>
  );
};

export default FloatingBubbles;

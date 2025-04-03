import { motion } from "framer-motion";
import { useRef } from "react";

interface FloatingBubblesProps {
  count?: number;
  onComplete?: () => void;
  triggerPosition?: { x: number; y: number };
  cartPosition?: { x: number; y: number };
}

const FloatingBubbles = ({
  count = 12,
  onComplete,
  triggerPosition = { x: 0, y: 0 },
  cartPosition = { x: 0, y: 0 },
}: FloatingBubblesProps) => {
  const bubblesRef = useRef<HTMLDivElement>(null);

  // Generate bubble properties with more natural variation
  const bubbles = Array.from({ length: count }, (_, i) => {
    const size = Math.random() * 12 + 8; // 8-20px size range
    const angle = (i / count) * Math.PI * 2;
    const distance = 30 + Math.random() * 20;

    return {
      size,
      color: `rgba(${Math.floor(180 + Math.random() * 50)}, ${Math.floor(
        210 + Math.random() * 40,
      )}, 250, ${0.6 + Math.random() * 0.3})`,
      duration: 0.6 + Math.random() * 0.4, // 0.6-1.0s duration
      delay: i * 0.03,
      path: {
        x: [
          0,
          Math.cos(angle) * distance * 0.6,
          Math.cos(angle) * distance,
          cartPosition.x - triggerPosition.x,
        ],
        y: [
          0,
          Math.sin(angle) * distance * 0.6 - 20,
          Math.sin(angle) * distance - 40,
          cartPosition.y - triggerPosition.y,
        ],
        scale: [0, 1.2, 1, 0.5],
        opacity: [0, 1, 0.8, 0],
      },
    };
  });

  return (
    <div ref={bubblesRef} className="pointer-events-none">
      {bubbles.map((bubble, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full shadow-sm"
          style={{
            background: `radial-gradient(circle at 30% 30%,
              rgba(255, 255, 255, 0.9),
              ${bubble.color})`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            border: "1px solid rgba(255, 255, 255, 0.6)",
            left: `${triggerPosition.x}px`,
            top: `${triggerPosition.y}px`,
            zIndex: 9999,
            filter: "blur(0.5px)",
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            ...bubble.path,
            rotate: [0, Math.random() > 0.5 ? 180 : -180],
          }}
          transition={{
            duration: bubble.duration,
            ease: [0.2, 0.8, 0.4, 1],
            delay: bubble.delay,
            times: [0, 0.3, 0.7, 1],
          }}
          onAnimationComplete={
            i === bubbles.length - 1 ? onComplete : undefined
          }
        />
      ))}
    </div>
  );
};

export default FloatingBubbles;

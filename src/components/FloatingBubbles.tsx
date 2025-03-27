// FloatingBubbles.tsx
import { motion } from "framer-motion";
import { ReactNode, useRef } from "react";

interface FloatingBubblesProps {
  count?: number;
  flyToCart?: boolean;
  onComplete?: () => void;
  children?: ReactNode;
  triggerPosition?: { x: number; y: number };
  cartPosition?: { x: number; y: number };
}

const FloatingBubbles = ({
  count = 8,
  flyToCart = false,
  onComplete,
  children,
  triggerPosition = { x: 0, y: 0 },
  cartPosition = { x: 0, y: 0 },
}: FloatingBubblesProps) => {
  const bubblesRef = useRef<HTMLDivElement>(null);

  // Calculate the path from trigger position to cart position
  const calculatePath = (i: number) => {
    if (!flyToCart) return {};

    // Add some randomness to the path
    const midX =
      triggerPosition.x +
      (cartPosition.x - triggerPosition.x) * 0.5 +
      (Math.random() - 0.5) * 100;
    const midY =
      triggerPosition.y +
      (cartPosition.y - triggerPosition.y) * 0.5 +
      (Math.random() - 0.5) * 100;

    return {
      x: [0, midX - triggerPosition.x, cartPosition.x - triggerPosition.x],
      y: [0, midY - triggerPosition.y, cartPosition.y - triggerPosition.y],
    };
  };

  const bubbles = Array.from({ length: count }, (_, i) => ({
    size: Math.random() * 8 + 8, // Larger bubbles
    color: `rgba(${Math.floor(180 + Math.random() * 50)}, ${Math.floor(210 + Math.random() * 40)}, 250, 0.8)`,
    duration: Math.random() * 0.5 + 0.5, // Faster animation
    delay: i * 0.05,
    path: calculatePath(i),
  }));

  return (
    <div ref={bubblesRef}>
      {bubbles.map((bubble, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            background: `radial-gradient(circle, rgba(255, 255, 255, 0.9), ${bubble.color})`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            borderRadius: "50%",
            border: "1px solid rgba(255, 255, 255, 0.6)",
            left: `${triggerPosition.x}px`,
            top: `${triggerPosition.y}px`,
            zIndex: 9999,
            pointerEvents: "none",
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={
            flyToCart
              ? {
                  ...bubble.path,
                  opacity: [1, 0.8, 0],
                  scale: [1, 1.2, 0.5],
                }
              : {
                  x: [0, Math.cos((i / count) * 2 * Math.PI) * 40, 0],
                  y: [0, Math.sin((i / count) * 2 * Math.PI) * 40, 0],
                  rotate: -360,
                  opacity: [1, 0.8, 1],
                  scale: [1, 1.2, 1],
                }
          }
          transition={{
            duration: flyToCart ? bubble.duration : bubble.duration * 4,
            repeat: flyToCart ? 0 : Infinity,
            ease: flyToCart ? "easeOut" : "linear",
            delay: bubble.delay,
          }}
          onAnimationComplete={
            flyToCart && i === bubbles.length - 1 ? onComplete : undefined
          }
        />
      ))}
      {children}
    </div>
  );
};

export default FloatingBubbles;

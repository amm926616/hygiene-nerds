import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const bubbleCount = 10; // Number of bubbles to generate at a time
const bubbleInterval = 1000; // Interval to add new bubbles (in milliseconds)

const generateBubbles = () =>
  Array.from({ length: bubbleCount }, (_, i) => ({
    id: Math.random().toString(36).substring(7), // Unique ID for each bubble
    size: Math.random() * 40 + 10, // Random size between 10px and 50px
    left: Math.random() * 100, // Random horizontal position
    delay: Math.random() * 3, // Random delay for each bubble
  }));

export const BubbleFlow: React.FC = () => {
  const [bubbles, setBubbles] = useState<Array<{ id: string; size: number; left: number; delay: number }>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Add new bubbles to the existing list
      setBubbles((prevBubbles) => [...prevBubbles, ...generateBubbles()]);
    }, bubbleInterval);

    return () => clearInterval(interval);
  }, []);

  // Remove bubbles that have finished their animation
  useEffect(() => {
    const timeout = setTimeout(() => {
      setBubbles((prevBubbles) => prevBubbles.slice(bubbleCount));
    }, 5000); // Adjust this timeout based on the animation duration

    return () => clearTimeout(timeout);
  }, [bubbles]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute bg-blue-200 rounded-full opacity-50"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
          }}
          initial={{ y: "-10%", opacity: 0 }}
          animate={{ y: "110%", opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 4, // Duration of each bubble animation
            ease: "easeInOut",
            delay: bubble.delay, // Staggered appearance
          }}
        />
      ))}
    </div>
  );
};
import { motion } from "framer-motion";
import { useEffect } from "react";
import { BubbleFlow } from "./BubbleFlow";

const modelImages: Record<string, string> = {
  products: "src/assets/models/waiting.jpg",
  about: "src/assets/models/waiting.jpg",
  contact: "src/assets/models/waiting.jpg",
  home: "src/assets/models/waiting.jpg",
};

interface ModelPageProps {
  pageKey: string; // Key to determine which image to show
  duration?: number; // Default is 5000ms (5 seconds)
  children?: React.ReactNode;
}

const intro_title = "Hygiene Nerds";
const intro_content = "The place for all hygiene products with beautiful market place";

export const ModelPage: React.FC<ModelPageProps> = ({ pageKey, children, duration = 1000 }) => {
  useEffect(() => {
    // Disable scrolling completely (prevent scrollbar pop-up)
    document.documentElement.style.overflow = "hidden";

    const timer = setTimeout(() => {
      // Restore scrolling **before** the fade-out transition
      document.documentElement.style.overflow = "";
      document.getElementById("model-content")?.classList.add("hidden");
    }, duration - 100); // Adjust timing to ensure smooth fade-out

    return () => {
      clearTimeout(timer);
      document.documentElement.style.overflow = ""; // Ensure scrolling is restored if unmounted early
    };
  }, [duration]);

  return (
    <div className="relative">
      {/* Model Page */}
      <motion.div
        id="model-content"
        className="fixed inset-0 flex items-center justify-center bg-black z-50"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1, delay: duration / 1000 - 1 }} // Smooth fade-out
      >
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${modelImages[pageKey] || modelImages["home"]})` }} // Default to "home" image if key is invalid
        />

        <BubbleFlow />

        {/* Overlay Text */}
        <div className="absolute text-white text-center">
          <h1 className="text-3xl md:text-5xl font-semibold">{intro_title}</h1>
          <p className="text-lg md:text-xl mt-2 opacity-70">{intro_content}</p>
        </div>
      </motion.div>

      {/* Main Page Content */}
      <div>{children}</div>
    </div>
  );
};

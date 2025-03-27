import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const modelImages: Record<string, string> = {
  products: "src/assets/models/waiting.jpg",
  about: "src/assets/models/waiting.jpg",
  contact: "src/assets/models/waiting.jpg",
  home: "src/assets/models/waiting.jpg",
};

interface ModelPageProps {
  pageKey: string;
  duration?: number;
  children?: React.ReactNode;
  onClose?: () => void; // Callback when ModelPage disappears
}

const intro_title = "Hygiene Nerds Market Place";
const intro_content =
  "The place for all hygiene products with a beautiful marketplace";

export const ModelPage = ({
  pageKey,
  children,
  duration = 1000,
  onClose,
}: ModelPageProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden"; // Disable scrolling

    const timer = setTimeout(() => {
      setIsVisible(false);
      document.documentElement.style.overflow = ""; // Restore scrolling
      onClose?.(); // Call parent function if provided
    }, duration);

    return () => {
      clearTimeout(timer);
      document.documentElement.style.overflow = ""; // Ensure scrolling is restored if unmounted early
    };
  }, [duration, onClose]);

  if (!isVisible) return <>{children}</>; // If hidden, show main content

  return (
    <div className="relative">
      {/* Model Page */}
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-black z-50"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1, delay: duration / 1000 - 1 }} // Smooth fade-out
      >
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${modelImages[pageKey] || modelImages["home"]})`,
          }}
        />

        {/* Overlay Text */}
        <div className="absolute text-white text-center">
          <h1 className="text-3xl md:text-5xl font-semibold">{intro_title}</h1>
          <p className="text-lg md:text-xl mt-2 opacity-70">{intro_content}</p>
        </div>
      </motion.div>
    </div>
  );
};

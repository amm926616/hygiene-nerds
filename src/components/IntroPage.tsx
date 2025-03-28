import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Leaf, Sparkles, Shield } from "lucide-react";

const modelImages: Record<string, string> = {
  products: "/images/intro-products.jpg",
  about: "/images/intro-about.jpg",
  contact: "/images/intro-contact.jpg",
  home: "/images/intro-home.jpg",
};

interface ModelPageProps {
  pageKey: string;
  duration?: number;
  children?: React.ReactNode;
  onClose?: () => void;
}

const INTRO_CONTENT = {
  title: "Welcome to Hygiene Nerds",
  subtitle: "Premium Hygiene Marketplace",
  features: [
    {
      icon: <Leaf className="text-green-400" />,
      text: "Eco-friendly products",
    },
    {
      icon: <Sparkles className="text-yellow-400" />,
      text: "Curated quality",
    },
    {
      icon: <Shield className="text-blue-400" />,
      text: "Trusted by thousands",
    },
  ],
};

export const ModelPage = ({
  pageKey,
  children,
  duration = 5000,
  onClose,
}: ModelPageProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setIsVisible(false);
      document.documentElement.style.overflow = "";
      onClose?.();
    }, duration);

    return () => {
      clearTimeout(timer);
      document.documentElement.style.overflow = "";
    };
  }, [duration, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 to-blue-600"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Background Image with Overlay */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage: `url(${modelImages[pageKey] || modelImages.home})`,
            }}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />

          {/* Content */}
          <div className="relative z-10 text-center px-6 max-w-4xl">
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-white mb-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {INTRO_CONTENT.title}
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-blue-100 mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {INTRO_CONTENT.subtitle}
            </motion.p>

            {/* Features */}
            <motion.div
              className="flex flex-wrap justify-center gap-6 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, staggerChildren: 0.1 }}
            >
              {INTRO_CONTENT.features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="mr-2">{feature.icon}</span>
                  <span className="text-white font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Loading Indicator */}
            <motion.div
              className="mx-auto h-1.5 bg-white/30 rounded-full max-w-xs overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: duration / 1000, ease: "linear" }}
            >
              <div className="h-full bg-white/80 rounded-full origin-left" />
            </motion.div>
          </div>

          {/* Skip Button (for longer durations) */}
          {duration > 3000 && (
            <motion.button
              className="absolute bottom-8 right-8 text-white/70 hover:text-white text-sm"
              onClick={() => setIsVisible(false)}
              whileHover={{ scale: 1.1 }}
            >
              Skip Intro
            </motion.button>
          )}
        </motion.div>
      )}

      {/* Main Content */}
      {!isVisible && children}
    </AnimatePresence>
  );
};

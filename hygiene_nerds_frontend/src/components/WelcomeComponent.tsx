import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Shield, Award } from "react-feather";
import { BiLeaf } from "react-icons/bi";
import { GiSparkles, GiPartyPopper } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

interface WelcomeProps {
  username: string | null;
  duration?: number;
  onClose?: () => void;
}

const WELCOME_CONTENT = {
  title: (name: string) => `Welcome, ${name || "Hygiene Nerd"}!`,
  subtitle: "Official Member of Hygiene Nerds Community",
  congrats: "Congratulations on joining our clean community!",
  features: [
    {
      icon: <BiLeaf className="text-green-400" size={24} />,
      text: "Eco-friendly product guides",
    },
    {
      icon: <GiSparkles className="text-yellow-400" size={24} />,
      text: "Exclusive member content",
    },
    {
      icon: <Shield className="text-blue-400" size={24} />,
      text: "Premium hygiene research",
    },
    {
      icon: <Award className="text-purple-400" size={24} />,
      text: "Member-only discounts",
    },
  ],
};

export const MemberWelcome = ({
  username,
  duration = 6000,
  onClose,
}: WelcomeProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setIsVisible(false);
    document.documentElement.style.overflow = "";
    onClose?.();
  };

  const handleSkip = () => {
    handleClose();
    navigate("/", { replace: true });
  };

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    const timer = setTimeout(handleClose, duration);
    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 to-teal-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Confetti Background */}
          <motion.div className="absolute inset-0 overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-yellow-400"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ y: -100, opacity: 0 }}
                animate={{
                  y: [0, window.innerHeight],
                  opacity: [1, 0],
                  rotate: Math.random() * 360,
                }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  delay: Math.random() * 1.5,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 5,
                }}
              >
                <GiPartyPopper size={20} />
              </motion.div>
            ))}
          </motion.div>

          {/* Main Content Card */}
          <motion.div
            className="relative z-10 w-full max-w-4xl px-6"
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl">
              {/* Header Section */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  className="inline-block mb-6"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                >
                  <GiSparkles className="text-yellow-400 text-4xl" />
                </motion.div>

                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {WELCOME_CONTENT.title(username)}
                </h1>
                <p className="text-xl text-teal-200 mb-6">
                  {WELCOME_CONTENT.subtitle}
                </p>

                <div className="bg-yellow-500/90 text-yellow-900 px-4 py-2 rounded-full font-bold inline-flex items-center mb-8">
                  <GiPartyPopper className="mr-2" />
                  {WELCOME_CONTENT.congrats}
                </div>
              </motion.div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {WELCOME_CONTENT.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <span className="mr-3 mt-0.5">{feature.icon}</span>
                    <span className="text-white font-medium">
                      {feature.text}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Progress Bar */}
              <motion.div
                className="h-2 bg-white/20 rounded-full overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: duration / 1000, ease: "linear" }}
              >
                <div className="h-full bg-gradient-to-r from-teal-400 to-indigo-400" />
              </motion.div>
            </div>
          </motion.div>

          {/* Skip Button */}
          <motion.button
            className="absolute bottom-8 right-8 text-white/80 hover:text-white text-sm backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full"
            onClick={handleSkip}
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Let's Go! →
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

const FloatingCartV2 = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    return (
        <motion.div
            className="fixed bottom-10 right-10 z-50 flex items-center justify-center bg-transparent"
            drag
            dragConstraints={{ left: -window.innerWidth, right: window.innerWidth, top: -window.innerHeight, bottom: window.innerHeight }}
            onDragEnd={(event, info) => setPosition({ x: info.point.x, y: info.point.y })}
            animate={{
                scale: [1, 1.05, 1], // Breathing animation
            }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
        >
            {/* Main Bubble */}
            <div className="relative">
                <motion.div
                    className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md"
                    style={{
                        background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), rgba(173, 216, 230, 0.15), rgba(100, 149, 237, 0.1))",
                        boxShadow: "0px 0px 20px rgba(173, 216, 230, 0.4)", // Soft glow effect
                        border: "1px solid rgba(255, 255, 255, 0.5)",
                    }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
                >
                    <ShoppingCart className="text-white w-8 h-8 opacity-90" />

                    {/* White Reflection Dot (Top-Left) */}
                    <div className="absolute top-3 left-3 w-4 h-4 bg-white rounded-full opacity-70 blur-[2px]" />

                    {/* Arch-Shaped Reflection (Bottom-Right) */}
                    <motion.div
                        className="absolute bottom-2 right-2 w-8 h-4 bg-white opacity-30 blur-[4px]"
                        style={{
                            clipPath: "ellipse(60% 25% at 50% 100%)", // More natural curved reflection
                            transform: "rotate(-15deg) scaleX(1.3)", // Slight rotation & horizontal stretching
                        }}
                        animate={{
                            opacity: [0.2, 0.35, 0.2], // Subtle shimmering effect
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatType: "mirror",
                        }}
                    />
                </motion.div>

                {/* Small Floating Bubbles */}
                {[...Array(5)].map((_, i) => {
                    const size = Math.random() * 12 + 6; // Uniform width & height
                    return (
                        <motion.div
                            key={i}
                            className="absolute rounded-full"
                            style={{
                                background: `radial-gradient(circle, rgba(255, 255, 255, 0.7), rgba(${Math.random() * 100 + 150}, ${Math.random() * 100 + 150}, ${Math.random() * 100 + 200}, 0.4))`,
                                width: `${size}px`,
                                height: `${size}px`,
                                top: `${Math.random() * 80 + 10}%`,
                                left: `${Math.random() * 80 + 10}%`,
                                border: "1px solid rgba(255, 255, 255, 0.3)",
                            }}
                            animate={{
                                y: [0, Math.random() * 10 - 5, 0], // Gentle floating
                                x: [0, Math.random() * 10 - 5, 0],
                                opacity: [0.6, 1, 0.6],
                            }}
                            transition={{
                                duration: Math.random() * 3 + 2,
                                repeat: Infinity,
                                repeatType: "mirror",
                            }}
                        />
                    );
                })}
            </div>
        </motion.div>
    );
};

export default FloatingCartV2;
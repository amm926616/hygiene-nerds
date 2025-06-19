import { useMemo } from "react";
import { Link } from "react-router-dom";
import RealisticBubbleComponent from "./RealisticBubbleComponent";

export default function HeroComponent() {
  // Generate stable bubble positions that won't change on re-renders
  const bubbleConfigs = useMemo(
    () =>
      Array.from({ length: 30 }).map(() => ({
        left: Math.random() * 100,
        size: Math.random() * 30 + 15,
        duration: Math.random() * 10000 + 8000, // 8-18s duration
        delay: Math.random() * 5000, // Staggered appearance
        opacity: Math.random() * 0.6 + 0.2,
        blur: Math.random() * 1.5,
      })),
    [],
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-200 to-blue-300 overflow-hidden">
      {/* Background canvas effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBvcGFjaXR5PSIwLjEiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMyIgZmlsbD0iIzAwNzBmZiIvPjwvZz48L3N2Zz4=')]" />
      </div>

      {/* Continuous bubble background */}
      {bubbleConfigs.map((config, index) => (
        <div
          key={index}
          className="absolute -bottom-10 pointer-events-none"
          style={{
            left: `${config.left}%`,
            width: `${config.size}px`,
            height: `${config.size}px`,
            opacity: config.opacity,
            filter: `blur(${config.blur}px)`,
            animation: `floatUp ${config.duration}ms ease-in-out infinite`,
            animationDelay: `${config.delay}ms`,
            zIndex: 0,
          }}
          aria-hidden="true"
        >
          <RealisticBubbleComponent />
        </div>
      ))}

      <div className="container mx-auto px-4 py-20 text-center relative z-10">
        <div className="max-w-3xl mx-auto backdrop-blur-sm bg-white/10 p-8 rounded-3xl shadow-lg">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-blue-900 mb-6 leading-tight">
            Cleanliness, <span className="text-blue-600">Simplified</span>.
          </h1>
          <p className="text-xl md:text-2xl text-blue-800 mb-10 opacity-90 leading-relaxed">
            Discover premium hygiene products designed for your health and
            comfort.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products/"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Shop Now
            </Link>
            <Link
              to="/about"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-4 px-8 rounded-full shadow-sm hover:shadow-md transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Animation keyframes */}
      <style>
        {`
          @keyframes floatUp {
            0% {
              transform: translateY(0) translateX(-50%);
              opacity: ${Math.random() * 0.3 + 0.2};
            }
            50% {
              opacity: ${Math.random() * 0.3 + 0.5};
            }
            100% {
              transform: translateY(-110vh) translateX(-50%);
              opacity: 0;
            }
          }
        `}
      </style>
    </section>
  );
}

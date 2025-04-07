import { useMemo } from "react";
import React from "react";

interface RealisticBubbleComponentProps {
  icon?: React.ReactNode;
}

const RealisticBubbleComponent = React.memo(
  ({ icon }: RealisticBubbleComponentProps) => {
    const size = useMemo(() => Math.floor(Math.random() * 61) + 20, []);

    return (
      <div
        className="flex items-center justify-center rounded-full relative"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle at 35% 25%, rgba(255, 255, 255, 0.8), rgba(240, 248, 255, 0.6), rgba(225, 235, 250, 0.3), rgba(200, 220, 255, 0.15))`,
          boxShadow: `0px 0px ${size / 4}px rgba(255, 255, 255, 0.7)`,
          border: "1px solid rgba(255, 255, 255, 0.9)",
        }}
      >
        {icon && <div className="text-white opacity-90">{icon}</div>}

        {/* White Reflection Dot (Top-Left) */}
        <div
          className="absolute bg-white rounded-full"
          style={{
            top: size * 0.15,
            left: size * 0.15,
            width: size * 0.1,
            height: size * 0.1,
            opacity: 0.9,
            filter: "blur(2px)",
            transform: "scale(1.2)",
          }}
        />

        {/* Soft White Arch Reflection (Bottom-Right) */}
        <div
          className="absolute bg-white/50 rounded-full"
          style={{
            bottom: size * 0.01,
            right: size * 0.01,
            width: size * 0.35,
            height: size * 0.2,
            filter: "blur(4px)",
            clipPath: "ellipse(60% 35% at 50% 100%)",
            transform: "rotate(142deg) scaleX(1.4) ",
          }}
        />

        {/* Subtle Inner Glow */}
        <div
          className="absolute inset-0 rounded-full"
          style={{ boxShadow: "inset 0px 0px 15px rgba(255, 255, 255, 0.3)" }}
        />
      </div>
    );
  },
);

export default RealisticBubbleComponent;

interface BubbleProps {
  size: number;
  x: number;
  y: number;
}

export default function Bubble({ size, x, y }: BubbleProps) {
  const style = {
    width: `${size}px`,
    height: `${size}px`,
    left: `${x}vw`,
    top: `${y}vh`,
  };

  return (
    <div
      className="absolute rounded-full bg-blue-200 opacity-50 animate-bubble"
      style={style}
    />
  );
}

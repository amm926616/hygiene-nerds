import React from "react";
import { cn } from "../lib/util"; // Assuming you have a className utility function

type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";
type SpinnerColor =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "warning"
  | "light"
  | "dark";

interface SpinnerProps {
  size?: SpinnerSize;
  color?: SpinnerColor;
  className?: string;
}

const sizeClasses: Record<SpinnerSize, string> = {
  xs: "h-4 w-4 border-2",
  sm: "h-6 w-6 border-2",
  md: "h-8 w-8 border-[3px]",
  lg: "h-10 w-10 border-[3px]",
  xl: "h-12 w-12 border-4",
};

const colorClasses: Record<SpinnerColor, string> = {
  primary: "border-t-blue-500 border-b-blue-500",
  secondary: "border-t-purple-500 border-b-purple-500",
  danger: "border-t-red-500 border-b-red-500",
  success: "border-t-green-500 border-b-green-500",
  warning: "border-t-yellow-500 border-b-yellow-500",
  light: "border-t-gray-200 border-b-gray-200",
  dark: "border-t-gray-800 border-b-gray-800",
};

export const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  color = "primary",
  className = "",
}) => {
  return (
    <div
      className={cn(
        "inline-block animate-spin rounded-full border-transparent",
        sizeClasses[size],
        colorClasses[color],
        className,
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

// Optional: Spinner with container for centered loading
interface SpinnerWithContainerProps extends SpinnerProps {
  fullScreen?: boolean;
  text?: string;
  textClassName?: string;
}

export const SpinnerWithContainer: React.FC<SpinnerWithContainerProps> = ({
  fullScreen = false,
  text,
  textClassName = "text-gray-500 mt-2",
  ...spinnerProps
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center",
        fullScreen ? "h-screen w-screen" : "w-full h-full",
      )}
    >
      <Spinner {...spinnerProps} />
      {text && <span className={textClassName}>{text}</span>}
    </div>
  );
};

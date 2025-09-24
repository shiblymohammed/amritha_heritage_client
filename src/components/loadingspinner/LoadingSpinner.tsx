import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "gold" | "white" | "dark";
  className?: string;
  fullScreen?: boolean;
  backdrop?: "light" | "dark" | "blur";
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  color = "gold",
  className = "",
  fullScreen = false,
  backdrop = "dark",
}) => {
  // Size classes
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  // Color classes
  const colorClasses = {
    gold: "border-accent-gold border-t-transparent",
    white: "border-white border-t-transparent",
    dark: "border-gray-600 border-t-transparent",
  };

  // Backdrop classes
  const backdropClasses = {
    light: "bg-white/80",
    dark: "bg-black/50",
    blur: "bg-white/20 backdrop-blur-md",
  };

  // Full screen wrapper
  if (fullScreen) {
    return (
      <div
        className={`
          fixed inset-0 z-50 
          ${backdropClasses[backdrop]}
          flex flex-col items-center justify-center
          ${className}
        `}
      >
        {/* Spinner */}
        <div
          className={`
            ${sizeClasses[size]} 
            ${colorClasses[color]}
            border-2 
            rounded-full 
            animate-spin
          `}
        />

        {/* Loading text */}
        <p
          className={`
          mt-3 
          text-sm 
          font-poppins 
          ${
            color === "white"
              ? "text-white"
              : color === "gold"
              ? "text-accent-gold"
              : "text-gray-600"
          }
        `}
        >
          Loading...
        </p>
      </div>
    );
  }

  // Regular inline spinner
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* Spinner */}
      <div
        className={`
          ${sizeClasses[size]} 
          ${colorClasses[color]}
          border-2 
          rounded-full 
          animate-spin
        `}
      />

      {/* Loading text */}
      <p
        className={`
        mt-3 
        text-sm 
        font-poppins 
        ${
          color === "white"
            ? "text-white"
            : color === "gold"
            ? "text-accent-gold"
            : "text-gray-600"
        }
      `}
      >
        Loading...
      </p>
    </div>
  );
};

export default LoadingSpinner;

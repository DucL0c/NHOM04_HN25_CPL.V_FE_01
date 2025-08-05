import React from "react";

type SpinnerProps = {
  size?: number; 
  className?: string;
};

export const Spinner: React.FC<SpinnerProps> = ({ size = 24, className = "" }) => {
  return (
    <div
      className={`animate-spin rounded-full border-4 border-t-transparent border-gray-400 ${className}`}
      style={{ width: size, height: size }}
    />
  );
};
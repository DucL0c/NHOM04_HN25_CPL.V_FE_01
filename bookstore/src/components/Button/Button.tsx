import React from "react";

export type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

const baseStyle =
  "px-4 py-2 rounded font-semibold transition duration-200 focus:outline-none";

const variantStyle: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-gray-300 text-black hover:bg-gray-400",
  danger: "bg-red-500 text-white hover:bg-red-600",
};

export const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  variant = "primary",
  disabled = false,
  onClick,
  className = "",
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyle} ${variantStyle[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {children}
    </button>
  );
};

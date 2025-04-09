import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "white";
  icon?: string;
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = "primary",
  icon,
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md transition-all transform hover:scale-105 cursor-pointer";

  const variants = {
    primary:
      "text-white bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/30",
    secondary: "text-white bg-gray-600 hover:bg-gray-700",
    danger: "text-white bg-red-500 hover:bg-red-600",
    white: "text-gray-900 bg-white hover:bg-orange-50",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {icon && <span className="material-icons mr-2">{icon}</span>}
      {children}
    </button>
  );
}

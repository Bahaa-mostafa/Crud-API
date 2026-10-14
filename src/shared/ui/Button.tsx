
import type { ButtonProps, ButtonVariant } from "../types/button";

const baseStyles =
  "rounded px-4 py-2 font-medium transition-colors";

const variants: Record<ButtonVariant, string> = {
  primary: "rounded-lg bg-blue-600 text-white hover:bg-blue-700",
  secondary: "rounded-lg bg-gray-200 text-gray-900 hover:bg-gray-300",
  danger: "rounded-lg bg-red-600 text-white hover:bg-red-700",
  warning: "rounded-lg bg-yellow-500 text-white hover:bg-yellow-600",
};

function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;

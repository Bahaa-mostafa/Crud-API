import type { InputProps } from "../types/input";

function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`w-full rounded-lg border border-gray-300 px-3 py-2 ${className}`}
      {...props}
    />
  );
}

export default Input;
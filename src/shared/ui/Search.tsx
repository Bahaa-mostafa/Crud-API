
import type { SearchInputProps } from "../types/search";

function SearchInput({
  className = "",
  ...props
}: SearchInputProps) {
  return (
    <input
      {...props}
      type="search"
      className={`w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${className}`}
    />
  );
}

export default SearchInput;

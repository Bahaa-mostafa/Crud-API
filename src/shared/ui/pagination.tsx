
import type { PaginationProps } from "../types/pagination";
import Button from "./Button";

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | "...")[] =
    totalPages <= 5
      ? Array.from({ length: totalPages }, (_, index) => index + 1)
      : currentPage <= 3
        ? [1, 2, 3, "...", totalPages]
        : currentPage >= totalPages - 2
          ? [1, "...", totalPages - 2, totalPages - 1, totalPages]
          : [
              1,
              "...",
              currentPage - 1,
              currentPage,
              currentPage + 1,
              "...",
              totalPages,
            ];

  return (
    <div className="mt-6 flex items-center justify-center gap-2">
      <Button
        variant="secondary"
        className="px-3 py-2"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
      >
        ‹
      </Button>

      {pages.map((page, index) =>
        page === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className="px-1 text-gray-500"
          >
            ...
          </span>
        ) : (
          <Button
            key={page}
            variant={currentPage === page ? "primary" : "secondary"}
            className="min-w-10 px-3 py-2"
            aria-label={`Page ${page}`}
            aria-current={currentPage === page ? "page" : undefined}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        ),
      )}

      <Button
        variant="secondary"
        className="px-3 py-2"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
      >
        ›
      </Button>
    </div>
  );
}

export default Pagination;

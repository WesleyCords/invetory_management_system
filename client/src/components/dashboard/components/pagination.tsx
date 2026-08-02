import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUISectionProducts } from "@/store/useUISectionProducts";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const { previusPage, nextPage, selectPage } = useUISectionProducts();

  const ArrayPages = Array.from(
    { length: Math.max(totalPages || 0, 0) },
    (_, i) => i + 1,
  );

  if (ArrayPages.length <= 1) return null;

  return (
    <div className="flex items-center justify-center mt-6 gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex items-center gap-2">
        {ArrayPages.map((number) => (
          <Button
            key={number}
            size="icon"
            variant={currentPage === number ? "default" : "ghost"}
            className="cursor-pointer"
            onClick={() => onPageChange(number)}
          >
            {number}
          </Button>
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

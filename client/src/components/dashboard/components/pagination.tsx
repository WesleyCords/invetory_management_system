import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUISectionProducts } from "@/store/useUISectionProducts";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({ data }: { data: IProductGet | undefined }) {
  const { currentPage, previusPage, nextPage, selectPage } =
    useUISectionProducts();

  const ArrayPages = Array.from(
    { length: data?.totalPages || 0 },
    (_, i) => i + 1,
  );

  return (
    <div
      className={cn(
        "items-center justify-center mt-6 gap-2",
        ArrayPages.length > 0 ? "flex" : "hidden",
      )}
    >
      <Button
        variant="outline"
        size="icon"
        onClick={() => previusPage()}
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
            className="cursor-default"
            onClick={() => selectPage(number)}
          >
            {number}
          </Button>
        ))}
      </div>
      <Button
        variant="outline"
        size="icon"
        onClick={() => nextPage()}
        disabled={currentPage === data?.totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

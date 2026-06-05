import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/querys/useProducts";
import { useUIProducts } from "@/store/useUIProduct";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination() {
  const { currentPage, previusPage, nextPage, itemsPerPages } = useUIProducts();
  const { data: products } = useProducts();
  const totalPages = Math.ceil(products.length / itemsPerPages);

  const numberPages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center mt-6 gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => previusPage()}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <div className="flex items-center gap-2">
        {numberPages.map((number) => (
          <Button
            key={number}
            size="icon"
            variant={currentPage === number ? "default" : "ghost"}
            className="cursor-default"
          >
            {number}
          </Button>
        ))}
      </div>
      <Button
        variant="outline"
        size="icon"
        onClick={() => nextPage()}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

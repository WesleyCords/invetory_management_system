import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import { useUISectionProducts } from "@/store/useUISectionProducts";

interface ArrowTableHeaderProps {
  field: keyof IProduct;
}

export function ArrowTableHeader({ field }: ArrowTableHeaderProps) {
  const { sortField, sortOrder } = useUISectionProducts();

  const isActive = sortField === field;

  if (!isActive) {
    return <ArrowUpDown className="ml-2 h-3 w-3 text-muted-foreground/50" />;
  }

  return sortOrder === "asc" ? (
    <ArrowUp className="ml-2 h-3 w-3 text-primary animate-in fade-in duration-200" />
  ) : (
    <ArrowDown className="ml-2 h-3 w-3 text-primary animate-in fade-in duration-200" />
  );
}

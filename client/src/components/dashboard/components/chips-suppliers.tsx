import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export function ChipsSuppliers({ suppliers }: { suppliers: string[] }) {
  const [expanded, setExpanded] = useState(true);

  if (suppliers.length === 0) {
    return <p className="text-xs text-muted-foreground">Sem fornecedor</p>;
  }

  const visibleSuppliers = expanded ? suppliers : suppliers.slice(0, 2);

  return (
    <div className="flex items-center gap-1">
      {visibleSuppliers.map((supplier) => (
        <Badge
          key={supplier}
          variant="secondary"
          className="px-1.5 py-0 text-[10px] font-normal"
        >
          {supplier}
        </Badge>
      ))}
      {!expanded && suppliers.length - 2 > 0 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(true);
          }}
          className="rounded-full px-1.5 py-0 text-[10px] font-medium text-muted-foreground hover:text-foreground"
        >
          +{suppliers.length - 2}
        </button>
      )}
      {expanded && suppliers.length > 2 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(false);
          }}
          className="rounded-full px-1.5 py-0 text-[10px] font-medium text-muted-foreground hover:text-foreground"
        >
          ver menos
        </button>
      )}
    </div>
  );
}

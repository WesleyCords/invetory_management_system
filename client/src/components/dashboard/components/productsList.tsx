import { AnimatePresence, motion } from "framer-motion";
import { useUISectionProducts } from "@/store/useUISectionProducts";
import { TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  MoreHorizontal,
  Package,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface ProductsListProps {
  products: IProduct[];
}

export function ProductsList({ products }: ProductsListProps) {
  const { currentPage, openEditProductDialog } = useUISectionProducts();
  const ITEMS_PER_PAGE = 10;

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;

  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <AnimatePresence>
      {currentItems.map((product, index) => {
        return (
          <motion.tr
            key={product.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-border hover:bg-secondary/50"
          >
            <TableCell>
              <div className="flex items-center gap-2">
                <div className="rounded-sm p-2.5 bg-primary/50">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{product.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {!product.suppliers || product.suppliers.length < 1
                      ? "Vários"
                      : product.suppliers[0].name}
                  </p>
                </div>
              </div>
            </TableCell>

            <TableCell className="text-muted-foreground font-mono text-sm">
              {product.sku}
            </TableCell>

            <TableCell>
              <Badge variant="outline">
                {product.category?.name || "Sem categoria"}
              </Badge>
            </TableCell>

            <TableCell className="text-right font-medium text-foreground">
              {product.quantity}
            </TableCell>

            <TableCell className="text-right text-foreground">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(product.price)}
            </TableCell>

            <TableCell>
              {product.isLowStock ? (
                <Badge variant="destructive" className="gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  Baixo
                </Badge>
              ) : (
                <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20">
                  Normal
                </Badge>
              )}
            </TableCell>

            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  }
                />
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => openEditProductDialog()}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive focus:text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Excluir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </motion.tr>
        );
      })}
    </AnimatePresence>
  );
}

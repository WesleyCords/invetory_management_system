"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProducts } from "@/hooks/querys/useProducts";
import { useUISectionProducts } from "@/store/useUISectionProducts";
import { ArrowUpDown, Package } from "lucide-react";
import { ProductsList } from "./productsList";
import { Pagination } from "./Pagination";
import { ArrowTableHeader } from "./arrow-table-header";

export function TableProduct() {
  const { categorySelected, sortField, handleSortChange, sortOrder, search } =
    useUISectionProducts();
  const { data: products } = useProducts();

  const filteredProducts = products
    .filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        categorySelected === "Todos" || p.category.name === categorySelected;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      // pegando o Keyof do campo de cada produto
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortOrder === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });

  const handleSort = (field: keyof IProduct) => {
    if (sortField === field) {
      handleSortChange(field);
    } else {
      handleSortChange(field);
    }
  };

  return (
    <>
      <Card>
        <CardContent className="p-0 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="focus-visible:ring-0 focus-visible:ring-offset-0 px-0 hover:bg-transparent"
                    onClick={() => handleSort("name")}
                  >
                    Produtos
                    <ArrowTableHeader field="name" />
                  </Button>
                </TableHead>

                <TableHead>SKU</TableHead>
                <TableHead>Categoria</TableHead>

                <TableHead className="text-right">
                  <div className="flex justify-end">
                    <Button
                      onClick={() => handleSort("quantity")}
                      variant="ghost"
                      size="sm"
                      className="pr-0 focus-visible:ring-0 focus-visible:ring-offset-0 hover:bg-transparent"
                    >
                      Quantidade
                      <ArrowTableHeader field="quantity" />
                    </Button>
                  </div>
                </TableHead>

                <TableHead className="text-right text-muted-foreground">
                  <div className="flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="pr-0 focus-visible:ring-0 focus-visible:ring-offset-0 hover:bg-transparent"
                      onClick={() => handleSort("price")}
                    >
                      Preço
                      <ArrowTableHeader field="price" />
                    </Button>
                  </div>
                </TableHead>

                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <ProductsList products={filteredProducts} />
            </TableBody>
          </Table>
          {products.length === 0 && (
            <div className="py-12 text-center">
              <Package className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <p className="mt-4 text-muted-foreground">
                Nenhum produto encontrado
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      <Pagination />
    </>
  );
}

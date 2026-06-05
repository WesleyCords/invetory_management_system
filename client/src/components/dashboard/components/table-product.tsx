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
import { useUIProducts } from "@/store/useUIProduct";
import { ArrowUpDown, Package } from "lucide-react";
import { useState } from "react";
import { ProductsList } from "./productsList";
import { Pagination } from "./Pagination";

export function TableProduct() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [sortField, setSortField] = useState<keyof IProduct>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const { search } = useUIProducts();
  const { data: products } = useProducts();

  const filteredProducts = products
    .filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        selectedCategory === "Todos" || p.category.name === selectedCategory;
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
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("name")}
                  >
                    Produtos
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead className="text-right">
                  <Button variant="ghost" size="sm" className="-mr-3">
                    Quantidade
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead className="text-right text-muted-foreground">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="-mr-3"
                    onClick={() => handleSort("price")}
                  >
                    Preço <ArrowUpDown className="ml-2 h-3 w-3" />
                  </Button>
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

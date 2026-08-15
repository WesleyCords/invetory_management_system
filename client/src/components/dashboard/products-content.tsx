import { motion } from "framer-motion";
import { HeaderContent } from "./components/header-content";
import { Plus, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { SelectComponent } from "./components/select-content";
import { TableProduct } from "./components/table-product";
import { useUISectionProducts } from "@/store/useUISectionProducts";
import { useCategories } from "@/hooks/querys/useCategories";
import { ProductDialog } from "./components/product-dialog";
import { MovementDialog } from "./components/movement-dialog";

export function ProductsContent() {
  const { onChangeSearch, search, openDialog } = useUISectionProducts();
  const { data: dbCategories = [], isLoading, isError } = useCategories();
  const categories = ["Todos", ...dbCategories.map((cat) => cat.name)];
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <HeaderContent
          title="Produtos"
          subtitle="Gerencie seu catalogo de produtos"
        >
          <Button variant="outline" onClick={openDialog}>
            <Plus className="h-4 w-4" />
            Novo Produto
          </Button>
        </HeaderContent>

        <Card>
          <CardContent className="p-4">
            <div className="flex flex-row items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome ou SKU..."
                  value={search}
                  onChange={(e) => onChangeSearch(e.target.value)}
                  className="pl-9 bg-secondary border-border"
                />
              </div>
              <div className="flex gap-2">
                <SelectComponent
                  list={categories}
                  title={
                    isLoading
                      ? "Carregando..."
                      : isError
                        ? "Erro ao carregar"
                        : "Categorias"
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <TableProduct />
      </motion.div>
      <ProductDialog />
      <MovementDialog />
    </>
  );
}

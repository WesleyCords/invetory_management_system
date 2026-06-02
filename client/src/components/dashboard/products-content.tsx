import { motion } from "framer-motion";
import { HeaderContent } from "./components/header-content";
import { ArrowUpCircle, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { useState } from "react";
import { SelectComponent } from "./components/select-content";

export function ProductsContent() {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["Todos", "Vestuário", "Calçados", "Acessórios"];

  return (
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
        <Button className="hover:bg-muted border border-border text-foreground bg-card">
          <ArrowUpCircle className="h-4 w-4" />
          Nova Movimentação
        </Button>
      </HeaderContent>

      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="flex flex-row items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-secondary border-border"
              />
            </div>
            <div className="flex gap-2">
              <SelectComponent list={categories} title="Categoria" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

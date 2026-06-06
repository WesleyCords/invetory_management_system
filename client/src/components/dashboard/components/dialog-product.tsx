import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Label } from "../../ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUIProducts } from "@/store/useUIProduct";
import { useCategories } from "@/hooks/querys/useCategories";

export function ProductDialog() {
  const [valueSelectTemp, setValueSelectTemp] = useState<string>("");
  const { data: categories = [] } = useCategories();
  const { dialogOpen, closeDialog, productToEdit } = useUIProducts();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const selectedCategoryName = categories.find(
    (cat) => String(cat.id) === valueSelectTemp,
  )?.name;

  return (
    <Dialog open={dialogOpen} onOpenChange={closeDialog}>
      <DialogContent className="max-w-130">
        <DialogHeader>
          <DialogTitle>
            {productToEdit ? "Editar Produto" : "Novo Produto"}
          </DialogTitle>
          <DialogDescription>
            {productToEdit
              ? "Atualize as informacoes do produto"
              : "Preencha as informacoes do novo produto"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">
                  Nome
                </Label>
                <Input
                  id="name"
                  className="bg-secondary border-border"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-foreground">
                  Categoria
                </Label>
                <Select
                  value={selectedCategoryName}
                  onValueChange={(valorSelecionado) => {
                    setValueSelectTemp(valorSelecionado);
                    console.log("Valor selecionado:", valorSelecionado);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria">
                      {selectedCategoryName}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={String(cat.id)}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku" className="text-foreground">
                  SKU
                </Label>
                <Input
                  id="sku"
                  className="bg-secondary border-border"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity" className="text-foreground">
                  Quantidade
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  className="bg-secondary border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supplier" className="text-foreground">
                  Fornecedor
                </Label>
                <Input id="supplier" className="bg-secondary border-border" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price" className="text-foreground">
                  Preco de Venda (R$)
                </Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  className="bg-secondary border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="costPrice" className="text-foreground">
                  Preco de Custo (R$)
                </Label>
                <Input
                  id="costPrice"
                  type="number"
                  step="0.01"
                  className="bg-secondary border-border"
                />
              </div>
            </div>
            <div>
              <textarea
                id="description"
                placeholder="Descricao do produto"
                className="w-full h-24 p-2 bg-secondary focus:outline-none focus:ring-2 focus:ring-border border rounded-md resize-none text-sm text-foreground"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={closeDialog}>
              Cancelar
            </Button>
            <Button type="submit">
              {productToEdit ? "Salvar Alteracoes" : "Cadastrar Produto"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

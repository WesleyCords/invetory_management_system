import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Label } from "../../ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUISectionProducts } from "@/store/useUISectionProducts";
import { useCategories } from "@/hooks/querys/useCategories";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { useProductForm } from "@/store/useProductForm";

export function ProductDialog() {
  const [categoryNameView, setCategoryNameView] = useState<string>(""); // Controla o visual
  const [categoryIdToSave, setCategoryIdToSave] = useState<string>(""); // O que vai pro Fastify
  const { data: categories = [] } = useCategories();
  const { dialogOpen, closeDialog } = useUISectionProducts();
  const { productForm, setFormField } = useProductForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(productForm);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={closeDialog}>
      <DialogContent className="max-w-130">
        <DialogHeader>
          <DialogTitle>
            {productForm ? "Editar Produto" : "Novo Produto"}
          </DialogTitle>
          <DialogDescription>
            {productForm
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
                  onChange={(e) => setFormField("name", e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-foreground">
                  Categoria
                </Label>
                <Combobox
                  items={categories}
                  value={categoryNameView}
                  onValueChange={(nomeSelecionado) => {
                    setFormField("categoryId", nomeSelecionado);
                    const categoriaEncontrada = categories.find(
                      (cat) => cat.name === nomeSelecionado,
                    );

                    if (categoriaEncontrada) {
                      setFormField(
                        "categoryId",
                        String(categoriaEncontrada.id),
                      );
                    }
                  }}
                >
                  <ComboboxInput
                    placeholder="Selecione a categoria"
                    onChange={(e) => {
                      const textoDigitado = e.target.value;
                      setCategoryNameView(textoDigitado);

                      if (textoDigitado === "") {
                        setCategoryIdToSave("");
                      }
                    }}
                  />
                  <ComboboxContent>
                    <ComboboxEmpty>Item não encontrado</ComboboxEmpty>
                    <ComboboxList>
                      {(item) => (
                        <ComboboxItem key={item.id} value={item.name}>
                          {item.name}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku" className="text-foreground">
                  SKU
                </Label>
                <Input
                  id="sku"
                  onChange={(e) => setFormField("sku", e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="supplier" className="text-foreground">
                  Fornecedor
                </Label>
                <Input
                  id="supplier"
                  onChange={(e) => setFormField("suppliers", [e.target.value])}
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
                  onChange={(e) =>
                    setFormField("price", parseFloat(e.target.value) || 0)
                  }
                />
              </div>
            </div>
            <div>
              <textarea
                id="description"
                placeholder="Descricao do produto"
                onChange={(e) => setFormField("description", e.target.value)}
                className="w-full h-24 p-2 bg-secondary focus:outline-none focus:ring-2 focus:ring-border border rounded-md resize-none text-sm text-foreground"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={closeDialog}>
              Cancelar
            </Button>
            <Button type="submit">
              {productForm ? "Salvar Alteracoes" : "Cadastrar Produto"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

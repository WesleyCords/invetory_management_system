import { useState } from "react";
import { useProductForm } from "@/store/useProductForm";
import { useUISectionProducts } from "@/store/useUISectionProducts";
import { useCategories } from "@/hooks/querys/useCategories";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useCreateProduct } from "@/hooks/querys/useCreateProduct";
import { Loader2 } from "lucide-react";
import { CreateProductDTO } from "@/dtos";
import { useSuppliers } from "@/hooks/querys/useSuppliers";
import { useBrands } from "@/hooks/querys/useBrands";

export function CreateProductDialog() {
  const [categoryNameView, setCategoryNameView] = useState<string>("");
  const [brandViewName, setBrandViewName] = useState<string>("");

  const { data: categories = [] } = useCategories();
  const { data: suppliers = [] } = useSuppliers();
  const { data: brands = [] } = useBrands();

  const { dialogOpen, closeDialog } = useUISectionProducts();
  const { productForm, setFormField, resetForm } = useProductForm();
  const { mutate, isPending } = useCreateProduct();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const {
      id,
      suppliers,
      categoryId,
      categoryName,
      brandId,
      brandName,
      description,
      ...dataRequired
    } = productForm;

    const payloadToCreate = {
      ...dataRequired,
      supplierIds: suppliers,
      categoryId: categoryId || undefined,
      categoryName: categoryName || undefined,
      brandId: brandId || undefined,
      brandName: brandName || undefined,
      description: description || undefined,
    } as CreateProductDTO;

    console.log("Payload being sent to create product:", payloadToCreate); // Log para verificar o payload

    mutate(payloadToCreate, {
      onSuccess: () => {
        closeDialog();
        resetForm();
      },
    });
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={closeDialog}>
      <DialogContent className="max-w-130 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Novo Produto</DialogTitle>
          <DialogDescription>
            Preencha as informações para cadastrar um novo produto no estoque.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-2">
            <div className="grid grid-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">
                  Nome
                </Label>
                <Input
                  id="name"
                  onChange={(e) => setFormField("name", e.target.value)}
                  required
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
                  onValueChange={(selectedName) => {
                    setCategoryNameView(selectedName);

                    const categorySelected = categories.find(
                      (cat) => cat.name === selectedName,
                    );

                    if (categorySelected) {
                      setFormField("categoryId", String(categorySelected.id));
                      setFormField("categoryName", "");
                    } else {
                      setFormField("categoryName", selectedName);
                      setFormField("categoryId", "");
                    }
                  }}
                >
                  <ComboboxInput
                    placeholder="Selecione a categoria"
                    onChange={(e) => {
                      const text = e.target.value;
                      setCategoryNameView(text);

                      setFormField("categoryName", text);
                      setFormField("categoryId", "");
                    }}
                    required
                  />
                  <ComboboxContent>
                    <ComboboxEmpty>
                      Categoria {categoryNameView} não encontrada
                    </ComboboxEmpty>
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
                <Label htmlFor="brand" className="text-foreground">
                  Marca
                </Label>
                <Combobox
                  value={brandViewName}
                  items={brands}
                  onValueChange={(selectedName) => {
                    setBrandViewName(selectedName);

                    const brandSelected = brands.find(
                      (brand) => brand.name === selectedName,
                    );

                    if (brandSelected) {
                      setFormField("brandId", String(brandSelected.id));
                      setFormField("brandName", "");
                    } else {
                      setFormField("brandName", selectedName);
                      setFormField("brandId", "");
                    }
                  }}
                >
                  <ComboboxInput
                    placeholder="Selecione a marca"
                    onChange={(e) => {
                      const text = e.target.value;
                      setBrandViewName(text);

                      setFormField("brandName", text);
                      setFormField("brandId", "");
                    }}
                    required
                  />
                  <ComboboxContent>
                    <ComboboxEmpty>
                      Marca {brandViewName} não encontrado
                    </ComboboxEmpty>
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
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="costPrice" className="text-foreground">
                  Preço de Custo (R$)
                </Label>
                <Input
                  id="costPrice"
                  type="number"
                  step="0.01"
                  onChange={(e) =>
                    setFormField("costPrice", parseFloat(e.target.value) || 0)
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price" className="text-foreground">
                  Preço de Venda (R$)
                </Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  onChange={(e) =>
                    setFormField("price", parseFloat(e.target.value) || 0)
                  }
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 items-center">
              <div className="space-y-2">
                <Label htmlFor="sku" className="text-foreground">
                  SKU
                </Label>
                <Input
                  id="sku"
                  type="text"
                  onChange={(e) => setFormField("sku", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Fornecedores</Label>

                <div className="h-32 overflow-y-auto rounded-md border border-border bg-secondary p-3 space-y-3">
                  {suppliers.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      Nenhum fornecedor encontrado.
                    </p>
                  )}

                  {suppliers.map((supplier) => {
                    const isChecked = productForm.suppliers.includes(
                      supplier.id,
                    );

                    return (
                      <div
                        key={supplier.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`supplier-${supplier.id}`}
                          checked={isChecked}
                          onCheckedChange={(checked) => {
                            const currentSuppliers = productForm.suppliers;

                            if (checked) {
                              setFormField("suppliers", [
                                ...currentSuppliers,
                                String(supplier.id),
                              ]);
                            } else {
                              setFormField(
                                "suppliers",
                                currentSuppliers.filter(
                                  (id) => id !== String(supplier.id),
                                ),
                              );
                            }
                          }}
                        />
                        <Label htmlFor={`supplier-${supplier.id}`}>
                          {supplier.name}
                        </Label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div>
              <textarea
                id="description"
                placeholder="Descricao do produto"
                onChange={(e) => setFormField("description", e.target.value)}
                className="w-full h-12 p-2 bg-secondary focus:outline-none focus:ring-2 focus:ring-border border rounded-md resize-none text-sm text-foreground"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={closeDialog}
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Cadastrar Produto"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

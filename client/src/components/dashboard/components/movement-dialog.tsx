import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";

import { useUiMovement } from "@/store/useUiMovement";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  productId: z.string().min(1, "Selecione um produto."),
  quantity: z.coerce.number().min(1, "A quantidade deve ser maior que zero."),
  type: z.enum(["IN", "OUT"], { error: "Selecione o motivo." }),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function MovementDialog() {
  const { closeModal, openModal, selectedProduct, isOpen } = useUiMovement();

  const form = useForm<any, FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      quantity: 1,
      notes: "",
    },
  });

  useEffect(() => {
    if (selectedProduct) {
      form.setValue("productId", selectedProduct.id);
      form.clearErrors("productId");
    } else {
      form.setValue("productId", "");
    }
  }, [selectedProduct, form]);

  const onSubmit = (data: FormValues) => {
    console.log("Payload aprovado e pronto:", data);
    form.reset();
    closeModal();
  };

  const handleClearSelection = () => {
    openModal();
    form.setValue("productId", "");
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset();
      closeModal();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-foreground flex items-center gap-2">
            Registrar Movimentação
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Registre entradas e saídas do estoque
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
          <Field>
            <FieldLabel>Produto</FieldLabel>
            {selectedProduct ? (
              <div className="flex items-center justify-between p-1.5 border rounded-md bg-secondary/50">
                <span className="text-sm font-medium">
                  {selectedProduct.name}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleClearSelection}
                  className="h-8 px-2 text-muted-foreground hover:text-destructive"
                >
                  <X className="h-4 w-4 mr-1" />
                  Trocar
                </Button>
              </div>
            ) : (
              <Combobox items={["React", "Vue", "Angular", "Svelte"]}>
                <ComboboxInput placeholder="Pesquise pelo nome ou SKU..." />
                <ComboboxContent>
                  <ComboboxEmpty>Produto não encontrado.</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem key={item} value={item}>
                        {item}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            )}
            <FieldError errors={[form.formState.errors.productId]} />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel>Quantidade</FieldLabel>
              <Input
                type="number"
                min="1"
                className="bg-secondary border-border"
                {...form.register("quantity")}
              />
              <FieldError errors={[form.formState.errors.quantity]} />
            </Field>

            <Controller
              control={form.control}
              name="type"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Motivo</FieldLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                  >
                    <SelectTrigger className="bg-secondary border-border">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IN">
                        Entrada (Compra/Devolução)
                      </SelectItem>
                      <SelectItem value="OUT">Saída (Venda/Perda)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
          </div>

          <Field>
            <FieldLabel>Observações (opcional)</FieldLabel>
            <Textarea
              className="bg-secondary border-border resize-none"
              placeholder="Adicione detalhes sobre esta movimentação..."
              rows={3}
              {...form.register("notes")}
            />
            <FieldError errors={[form.formState.errors.notes]} />
          </Field>

          <Separator />

          <DialogFooter>
            <Button variant="default" type="submit">
              Registrar Movimentação
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

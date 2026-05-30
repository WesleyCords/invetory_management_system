export function ProductsContent() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <h2 className="text-xl font-bold text-foreground">Produtos</h2>
      <p className="text-muted-foreground mt-2">
        Aqui você pode gerenciar seus produtos, adicionar novos itens, editar
        informações e acompanhar o estoque.
      </p>

      <div className="mt-6 flex gap-4">
        <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition">
          Adicionar Produto
        </button>
        <button className="rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-white hover:bg-secondary/90 transition">
          Ver Lista de Produtos
        </button>
      </div>
    </div>
  );
}

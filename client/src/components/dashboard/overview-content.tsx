export function OverviewContent() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <h2 className="text-xl font-bold text-foreground">Visão Geral</h2>
      <p className="text-muted-foreground mt-2">
        Bem-vindo ao seu sistema de inventário! Aqui você pode acompanhar o
        status dos seus produtos, movimentações recentes e análises detalhadas.
      </p>

      <div className="mt-6 flex gap-4">
        <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition">
          Ver Produtos
        </button>
        <button className="rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-white hover:bg-secondary/90 transition">
          Ver Movimentações
        </button>
      </div>
    </div>
  );
}

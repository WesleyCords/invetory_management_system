export function AnalyticsContent() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <h2 className="text-xl font-bold text-foreground">Análises</h2>
      <p className="text-muted-foreground mt-2">
        Aqui você pode visualizar gráficos e relatórios sobre o desempenho do
        seu estoque, vendas e movimentações.
      </p>

      <div className="mt-6 flex gap-4">
        <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition">
          Ver Gráficos de Vendas
        </button>
        <button className="rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-white hover:bg-secondary/90 transition">
          Ver Relatórios de Estoque
        </button>
      </div>
    </div>
  );
}

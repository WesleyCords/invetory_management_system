export function LogsContent() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <h2 className="text-xl font-bold text-foreground">Logs de Atividades</h2>
      <p className="text-muted-foreground mt-2">
        Aqui você pode visualizar os logs de atividades recentes, incluindo
        ações realizadas, erros e eventos importantes relacionados ao sistema.
      </p>

      <div className="mt-6 flex gap-4">
        <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition">
          Ver Logs Recentes
        </button>
        <button className="rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-white hover:bg-secondary/90 transition">
          Exportar Logs
        </button>
      </div>
    </div>
  );
}

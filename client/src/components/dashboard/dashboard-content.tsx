import { useUIStore } from "@/store/useUIStore";

export function DashboardContent() {
  const teste = useUIStore((state) => state.toggleSidebar);
  return (
    <main>
      <h1>Conteudo</h1>
      <button onClick={() => teste()}>APERRTE</button>
    </main>
  );
}

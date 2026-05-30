"use client";

import { OverviewContent } from "./overview-content";
import { ProductsContent } from "./products-content";
import { MovementsContent } from "./movements-content";
import { AnalyticsContent } from "./analytics-content";
import { LogsContent } from "./logs-content";
import { useUIStore } from "@/store/useUIStore";

export function DashboardContent() {
  const activeSection = useUIStore((state) => state.abartOpen);
  switch (activeSection) {
    case "overview":
      return <OverviewContent />;
    case "products":
      return <ProductsContent />;
    case "movements":
      return <MovementsContent />;
    case "analytics":
      return <AnalyticsContent />;
    case "logs":
      return <LogsContent />;
    case "settings":
      return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <h2 className="text-xl font-bold text-foreground">Configuracoes</h2>
          <p className="text-muted-foreground mt-2">Em desenvolvimento</p>
        </div>
      );
    case "help":
      return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <h2 className="text-xl font-bold text-foreground">
            Central de Ajuda
          </h2>
          <p className="text-muted-foreground mt-2">Em desenvolvimento</p>
        </div>
      );
    default:
      return <OverviewContent />;
  }
}

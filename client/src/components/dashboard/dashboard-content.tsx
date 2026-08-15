"use client";

import { OverviewContent } from "./overview-content";
import { ProductsContent } from "./products-content";
import { MovementsContent } from "./movements-content";
import { AnalyticsContent } from "./analytics-content";
import { LogsContent } from "./logs-content";
import { useUIStore } from "@/store/useUIStore";
import { SettingsContent } from "./settings-content";
import { HelpContent } from "./help-content";

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
      return <SettingsContent />;
    case "help":
      return <HelpContent />;
    default:
      return <OverviewContent />;
  }
}

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

interface MetricsData {
  message: string;
  data: {
    financial: {
      patrimony: number;
      potentialRevenue: number;
      expectedProfit: number;
      averageMargin: number;
    };
    inventory: {
      totalProducts: number;
      totalProductsDeleted: number;
      totalItems: number;
      lowStockItems: number;
    };
    movements: {
      todayTotal: number;
      todayEntries: number;
      todayExits: number;
    };
  };
}

export function useMetrics() {
  return useQuery({
    queryKey: ["metrics"],
    queryFn: async () => {
      const response = await api.get<MetricsData>("/metrics/dashboard");
      return response.data;
    },
  });
}

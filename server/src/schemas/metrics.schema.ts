import z from 'zod';

export const MetricsDashboardResponse = z.object({
  message: z.string(),
  data: z.object({
    financial: z.object({
      patrimony: z.number(),
      potentialRevenue: z.number(),
      expectedProfit: z.number(),
      averageMargin: z.number(),
    }),
    inventory: z.object({
      totalProducts: z.number(),
      totalItems: z.number(),
      lowStockItems: z.number(),
    }),
  }),
});

export type IMetricsResponse = z.infer<typeof MetricsDashboardResponse>;

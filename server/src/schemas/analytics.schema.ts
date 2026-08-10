import { z } from 'zod';

const categoryItemSchema = z.object({
  name: z.string(),
  value: z.number(),
  pct: z.number(),
});

const rankingItemSchema = z.object({
  name: z.string(),
  sku: z.string(),
  valueTotal: z.number(),
  quantityTotal: z.number(),
  quantityDelta: z.number(),
});

const marginItemSchema = z.object({
  name: z.string(),
  fullName: z.string(),
  margin: z.number(),
});

const lowStockItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  sku: z.string(),
  price: z.coerce.number(),
  costPrice: z.coerce.number(),
  category: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .passthrough(),
  currentStock: z.number(),
});

const IPriceChartData = z.object({
  date: z.string(),
  mid: z.number(),
  min: z.number(),
  max: z.number(),
});

export const workflowChart = z.object({
  label: z.string(),
  in: z.number(),
  out: z.number(),
});

export const analyticsResponseSchema = z.object({
  message: z.string(),
  data: z.object({
    totalStockValue: z.number(),
    stockValueDelta: z.number(),
    totalCostValue: z.number(),
    costValueDelta: z.number(),
    totalProfit: z.number(),
    profitDelta: z.number(),
    avgMargin: z.number(),
    avgMarginDelta: z.number(),
    categories: z.array(categoryItemSchema),
    ranking: z.array(rankingItemSchema),
    margins: z.array(marginItemSchema),
    bestMargin: marginItemSchema.nullable(),
    lowStock: z.array(lowStockItemSchema),
    totalIn: z.number(),
    totalOut: z.number(),
    priceData: z.array(IPriceChartData),
    workflowData: z.array(workflowChart),
  }),
});

export const analyticsQuerySchema = z.object({
  periodInDays: z.coerce.number().min(1).default(60),
});

export type AnalyticsResponse = z.infer<typeof analyticsResponseSchema>;
export type AnalyticsData = z.infer<typeof analyticsResponseSchema>['data'];

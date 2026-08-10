import { AppError } from '../errors/appError';
import { prisma } from '../lib/prisma';
import { MovementType } from '@prisma/client';

type Props = {
  periodInDays: number;
};

class GetAnalyticsSystemService {
  async execute({ periodInDays }: Props) {
    const startDate = new Date(Date.now() - periodInDays * 24 * 60 * 60 * 1000);
    const previousStartDate = new Date(
      Date.now() - periodInDays * 2 * 24 * 60 * 60 * 1000,
    );

    const [products, totalInResult, totalOutResult] = await Promise.all([
      prisma.product.findMany({
        where: { isActive: true },
        select: {
          id: true,
          name: true,
          price: true,
          costPrice: true,
          category: true,
          sku: true,
          currentStock: true,
          movements: {
            where: {
              createdAt: { gte: previousStartDate },
            },
            select: { quantity: true, type: true, createdAt: true },
          },
        },
      }),
      prisma.stockMovement.aggregate({
        _sum: { quantity: true },
        where: {
          type: MovementType.IN,
          createdAt: { gte: startDate },
          product: { isActive: true },
        },
      }),
      prisma.stockMovement.aggregate({
        _sum: { quantity: true },
        where: {
          type: MovementType.OUT,
          createdAt: { gte: startDate },
          product: { isActive: true },
        },
      }),
    ]);

    if (products.length === 0) {
      throw new AppError('No products found', 404);
    }

    let totalStockValue = 0;
    let previousTotalStockValue = 0;

    let totalCostValue = 0;
    let previousTotalCostValue = 0;

    const byCategory: Record<string, number> = {};
    const lowStock: unknown[] = [];

    const enrichedProducts = products.map((product) => {
      let periodIn = 0;
      let periodOut = 0;

      let previousPeriodIn = 0;
      let previousPeriodOut = 0;

      for (const m of product.movements) {
        const qty = Number(m.quantity);
        const isCurrentPeriod = m.createdAt >= startDate;

        if (isCurrentPeriod) {
          if (m.type === MovementType.IN) periodIn += qty;
          else periodOut += qty;
        } else {
          if (m.type === MovementType.IN) previousPeriodIn += qty;
          else previousPeriodOut += qty;
        }
      }

      const periodBalance = periodIn - periodOut;

      const currentPeriodRevenue = periodOut * Number(product.price);
      const currentPeriodCost = periodOut * Number(product.costPrice);

      totalStockValue += currentPeriodRevenue;
      totalCostValue += currentPeriodCost;

      const previousPeriodRevenue = previousPeriodOut * Number(product.price);
      const previousPeriodCost = previousPeriodOut * Number(product.costPrice);

      previousTotalStockValue += previousPeriodRevenue;
      previousTotalCostValue += previousPeriodCost;

      if (currentPeriodRevenue > 0) {
        byCategory[product.category.name] =
          (byCategory[product.category.name] ?? 0) + currentPeriodRevenue;
      }

      if (product.currentStock < 10) {
        lowStock.push({
          ...product,
          price: Number(product.price),
          costPrice: Number(product.costPrice),
        });
      }

      return {
        ...product,
        periodBalance,
        previousPeriodBalance: previousPeriodIn - previousPeriodOut,
      };
    });

    const calculateDeltaPercentage = (current: number, previous: number) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return ((current - previous) / previous) * 100;
    };

    const totalProfit = totalStockValue - totalCostValue;
    const avgMargin =
      totalCostValue > 0 ? (totalProfit / totalCostValue) * 100 : 0;

    const previousTotalProfit =
      previousTotalStockValue - previousTotalCostValue;
    const previousAvgMargin =
      previousTotalCostValue > 0
        ? (previousTotalProfit / previousTotalCostValue) * 100
        : 0;

    const stockValueDelta = calculateDeltaPercentage(
      totalStockValue,
      previousTotalStockValue,
    );
    const profitDelta = calculateDeltaPercentage(
      totalProfit,
      previousTotalProfit,
    );
    const costValueDelta = calculateDeltaPercentage(
      totalCostValue,
      previousTotalCostValue,
    );
    const avgMarginDelta = avgMargin - previousAvgMargin;

    const categories = Object.entries(byCategory)
      .map(([name, value]) => ({
        name,
        value,
        pct: totalStockValue > 0 ? (value / totalStockValue) * 100 : 0,
      }))
      .sort((a, b) => b.value - a.value);

    const ranking = enrichedProducts
      .map((p) => ({
        name: p.name,
        sku: p.sku,
        valueTotal: p.periodBalance * Number(p.price),
        quantityTotal: p.periodBalance,
        quantityDelta: p.periodBalance - p.previousPeriodBalance,
      }))
      .sort((a, b) => b.quantityTotal - a.quantityTotal);

    const margins = enrichedProducts
      .map((p) => {
        const cost = Number(p.costPrice);
        const marginValue =
          cost > 0 ? ((Number(p.price) - cost) / cost) * 100 : 100;

        return {
          name: p.name.length > 14 ? p.name.substring(0, 14) + '...' : p.name,
          fullName: p.name,
          margin: Number(marginValue.toFixed(2)),
        };
      })
      .sort((a, b) => b.margin - a.margin);

    return {
      totalStockValue,
      stockValueDelta,

      totalCostValue,
      costValueDelta,

      totalProfit,
      profitDelta,

      avgMargin,
      avgMarginDelta,

      categories,
      ranking,
      margins,
      bestMargin: margins[0] || null,
      lowStock,

      totalIn: Number(totalInResult._sum.quantity ?? 0),
      totalOut: Number(totalOutResult._sum.quantity ?? 0),
    };
  }
}

export default GetAnalyticsSystemService;

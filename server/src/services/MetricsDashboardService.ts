import { prisma } from '../lib/prisma';

class MetricsDahboardService {
  async execute() {
    const [totalProducts, productsWithMovements] = await Promise.all([
      prisma.product.count(),

      prisma.product.findMany({
        where: { isActive: true },
        select: {
          id: true,
          price: true,
          costPrice: true,

          movements: {
            select: {
              type: true,
              quantity: true,
            },
          },
        },
      }),
    ]);

    let totalItems = 0;
    let lowStockItems = 0;
    let patrimony = 0;
    let potentialRevenue = 0;

    productsWithMovements.forEach((product) => {
      const currentBalance = product.movements.reduce((acc, movement) => {
        if (movement.type === 'IN') return acc + movement.quantity;
        if (movement.type === 'OUT') return acc - movement.quantity;
        return acc;
      }, 0);

      totalItems += currentBalance;

      if (currentBalance <= 5) {
        lowStockItems++;
      }

      patrimony += currentBalance * (product.costPrice || 0);
      potentialRevenue += currentBalance * Number(product.price);
    });

    const expectedProfit = potentialRevenue - patrimony;

    const averageMargin =
      patrimony > 0 ? (expectedProfit / patrimony) * 100 : 0;

    return {
      financial: {
        patrimony,
        potentialRevenue,
        expectedProfit,
        averageMargin: Number(averageMargin.toFixed(2)),
      },
      inventory: {
        totalProducts,
        totalItems,
        lowStockItems,
      },
    };
  }
}

export default MetricsDahboardService;

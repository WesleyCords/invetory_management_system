import { MovementType } from '@prisma/client';
import { prisma } from '../lib/prisma';

class GetProductBalanceService {
  async execute(productId: string) {
    const groupMovements = await prisma.stockMovement.groupBy({
      by: ['type'],
      where: { productId },
      _sum: {
        quantity: true,
      },
    });

    const totalIN =
      groupMovements.find((m) => m.type === MovementType.IN)?._sum.quantity ||
      0;
    const totalOUT =
      groupMovements.find((m) => m.type === MovementType.OUT)?._sum.quantity ||
      0;

    return totalIN - totalOUT;
  }
}

export default GetProductBalanceService;

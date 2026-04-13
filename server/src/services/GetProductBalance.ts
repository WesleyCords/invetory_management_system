import { MovementType } from '@prisma/client';
import { prisma } from '../lib/prisma';
import { AppError } from '../errors/appError';

class GetProductBalanceService {
  async execute(productId: string) {
    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct || !existingProduct.isActive)
      throw new AppError('Product does not exist or is inactive.', 400);

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

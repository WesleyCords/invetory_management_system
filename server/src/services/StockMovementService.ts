import { AppError } from '../errors/appError';
import { prisma } from '../lib/prisma';
import { MovementType } from '@prisma/client';

export interface IStockRequest {
  productId: string;
  quantity: number;
  type: MovementType;
}

class StockMovementService {
  async execute({ productId, quantity, type }: IStockRequest) {
    if (quantity <= 0)
      throw new AppError('The quantity must be greater than zero', 400);

    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct || !existingProduct.isActive)
      throw new AppError('Product does not exist or is inactive.', 404);

    if (type === MovementType.OUT) {
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
        groupMovements.find((m) => m.type === MovementType.OUT)?._sum
          .quantity || 0;

      const currentBalance = totalIN - totalOUT;

      if (quantity > currentBalance)
        throw new AppError(
          `Insufficient stock. Current balance is ${currentBalance}, but you tried to remove ${quantity}.`,
          400,
        );
    }

    const movementCreated = await prisma.stockMovement.create({
      data: {
        quantity,
        type,
        productId,
      },
    });

    return movementCreated;
  }
}

export default StockMovementService;

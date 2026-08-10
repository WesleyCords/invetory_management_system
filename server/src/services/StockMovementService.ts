import { AppError } from '../errors/appError';
import { prisma } from '../lib/prisma';
import { MovementType } from '@prisma/client';

export interface IStockRequest {
  productId: string;
  quantity: number;
  type: MovementType;
  userId: string;
  notes?: string | null;
}

class StockMovementService {
  async execute({ productId, quantity, type, userId, notes }: IStockRequest) {
    if (quantity <= 0)
      throw new AppError('The quantity must be greater than zero', 400);

    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct || !existingProduct.isActive)
      throw new AppError('Product does not exist or is inactive.', 404);

    if (type === MovementType.OUT) {
      if (quantity > existingProduct.currentStock)
        throw new AppError(
          `Insufficient stock. Current balance is ${existingProduct.currentStock}, but you tried to remove ${quantity}.`,
          400,
        );
    }

    const result = await prisma.$transaction(async (tx) => {
      const movementCreated = await tx.stockMovement.create({
        data: {
          quantity,
          type,
          productId,
          userId,
          notes,
        },
      });

      const stockOperation =
        type === MovementType.IN
          ? { increment: quantity }
          : { decrement: quantity };

      await tx.product.update({
        where: { id: productId },
        data: { currentStock: stockOperation },
      });

      return movementCreated;
    });

    return result;
  }
}

export default StockMovementService;

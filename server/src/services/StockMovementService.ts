import { AppError } from '../errors/appError';
import { prisma } from '../lib/prisma';
import { MovementType } from '@prisma/client';
import GetProductBalanceService from './GetProductBalance';
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
      const currentBalance = await new GetProductBalanceService().execute(
        productId,
      );

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
        userId,
        notes,
      },
    });

    return movementCreated;
  }
}

export default StockMovementService;

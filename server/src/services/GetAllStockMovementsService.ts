import { prisma } from '../lib/prisma';

import { GetMovementsQueryParams } from '../controllers/StockMovementController';
import { AppError } from '../errors/appError';

class GetStockMovementsService {
  async execute({ period, page, productId }: GetMovementsQueryParams) {
    if (period < 1) throw new AppError('The minimum period is 1 day', 400);

    if (page < 1) throw new AppError('The minimum page is 1', 400);

    if (productId) {
      const productExists = await prisma.product.findUnique({
        where: { id: productId },
      });

      if (!productExists) throw new AppError('Product not found', 404);
    }

    const [movements, totalCount] = await Promise.all([
      prisma.stockMovement.findMany({
        where: {
          ...(productId && { productId }),
          createdAt: {
            gte: new Date(Date.now() - period * 24 * 60 * 60 * 1000),
          },
        },
        include: {
          user: {
            select: {
              name: true,
              avatarUrl: true,
              role: true,
              id: true,
            },
          },
          product: {
            select: {
              name: true,
              sku: true,
              id: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: (page - 1) * 10,
        take: 10,
      }),
      prisma.stockMovement.count({
        where: {
          ...(productId && { productId }),
          createdAt: {
            gte: new Date(Date.now() - period * 24 * 60 * 60 * 1000),
          },
        },
      }),
    ]);

    const formattedMovements = movements.map((movement) => {
      const { userId, productId, ...rest } = movement;
      return rest;
    });

    return {
      movements: formattedMovements,
      totalCount,
      totalPages: Math.ceil(totalCount / 10),
    };
  }
}

export default GetStockMovementsService;

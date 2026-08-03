import { prisma } from '../lib/prisma';

import { GetMovementsQueryParams } from '../controllers/StockMovementController';
import { AppError } from '../errors/appError';
import { Prisma } from '@prisma/client';

class GetStockMovementsService {
  async execute({
    period,
    page,
    productId,
    limit,
    type,
    search,
  }: GetMovementsQueryParams) {
    if (period < 1) throw new AppError('The minimum period is 1 day', 400);

    if (page < 1) throw new AppError('The minimum page is 1', 400);

    if (productId) {
      const productExists = await prisma.product.findUnique({
        where: { id: productId },
      });

      if (!productExists) throw new AppError('Product not found', 404);
    }

    if (limit < 1) throw new AppError('The minimum limit is 1', 400);

    const whereClause: Prisma.StockMovementWhereInput = {
      ...(search && {
        product: {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { sku: { contains: search, mode: 'insensitive' } },
          ],
        },
      }),
      ...(productId && { productId }),
      createdAt: {
        gte: new Date(Date.now() - period * 24 * 60 * 60 * 1000),
      },
      ...(type && type !== 'all' ? { type } : {}),
    };

    const [movements, totalCount] = await Promise.all([
      prisma.stockMovement.findMany({
        where: whereClause,
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
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.stockMovement.count({
        where: whereClause,
      }),
    ]);

    const formattedMovements = movements.map((movement) => {
      const { userId, productId, ...rest } = movement;
      return rest;
    });

    return {
      movements: formattedMovements,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
    };
  }
}

export default GetStockMovementsService;

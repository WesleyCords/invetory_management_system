import { type AuditLogs } from '../controllers/LogsController';
import { AppError } from '../errors/appError';
import { prisma } from '../lib/prisma';

class GetLogsService {
  async execute(query: AuditLogs) {
    const { period, page, productId } = query;

    if (period < 1) throw new AppError('The minimum period is 1 day', 400);

    if (page < 1) throw new AppError('The minimum page is 1', 400);

    if (productId) {
      const productExists = await prisma.product.findUnique({
        where: { id: productId },
      });

      if (!productExists) throw new AppError('Product not found', 404);
    }

    const ITEMS_PER_PAGE = 10;

    const logs = await prisma.auditLogs.findMany({
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
      skip: (page - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    });

    const formattedLogs = logs.map((log) => {
      const { userId, productId, ...rest } = log;
      return rest;
    });

    return formattedLogs;
  }
}

export default GetLogsService;

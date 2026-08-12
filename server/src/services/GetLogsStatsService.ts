import { Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma';

type Props = {
  periodInDays: number;
  search?: string;
  userId?: string;
  limit: number;
  page: number;
};

class GetLogsStatsService {
  async execute({ periodInDays, search, userId, limit, page }: Props) {
    const startDate = new Date(Date.now() - periodInDays * 24 * 60 * 60 * 1000);

    const whereClause: Prisma.AuditLogWhereInput = {
      createdAt: { gte: startDate },
      ...(search && {
        OR: [
          {
            user: {
              name: { contains: search, mode: 'insensitive' },
              username: { contains: search, mode: 'insensitive' },
            },
          },
          {
            product: {
              name: { contains: search, mode: 'insensitive' },
              sku: { contains: search, mode: 'insensitive' },
            },
          },
          { action: { contains: search, mode: 'insensitive' } },
        ],
      }),
      ...(userId && { userId }),
    };

    const [totalLogs, criticalLogsCount, topUserGroup, logs] =
      await Promise.all([
        prisma.auditLog.count({
          where: whereClause,
        }),

        prisma.auditLog.count({
          where: {
            createdAt: { gte: startDate },
            action: {
              in: ['DELETE', 'STOCK_ADJUSTMENT', 'UPDATE_COST_PRICE'],
            },
          },
        }),

        prisma.auditLog.groupBy({
          by: ['userId'],
          where: { createdAt: { gte: startDate } },
          _count: {
            id: true,
          },
          orderBy: {
            _count: {
              id: 'desc',
            },
          },
          take: 1,
        }),

        prisma.auditLog.findMany({
          where: whereClause,
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
                role: true,
              },
            },
            product: {
              select: {
                id: true,
                name: true,
                sku: true,
              },
            },
          },
          take: limit,
          skip: (page - 1) * limit,
          orderBy: {
            createdAt: 'desc',
          },
        }),
      ]);

    let topUser = null;

    if (topUserGroup.length > 0 && topUserGroup[0].userId) {
      const user = await prisma.user.findUnique({
        where: { id: topUserGroup[0].userId },
        select: { name: true },
      });

      if (user) {
        topUser = {
          name: user.name,
          actionsCount: topUserGroup[0]._count.id,
        };
      }
    }

    const restLogs = logs.map(({ userId, productId, ...restLog }) => restLog);

    return {
      totalLogs,
      criticalLogsCount,
      topUser,
      logs: restLogs,
      totalPages: Math.ceil(totalLogs / limit),
    };
  }
}

export default GetLogsStatsService;

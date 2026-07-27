import { prisma } from '../lib/prisma';

class GetActiivitysService {
  async execute() {
    const [recentsLogs, recentsMoviments] = await Promise.all([
      prisma.auditLogs.findMany({
        take: 10,
        orderBy: {
          createdAt: 'desc',
        },
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
      }),
      prisma.stockMovement.findMany({
        take: 10,
        orderBy: {
          createdAt: 'desc',
        },
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
      }),
    ]);

    const activities = [...recentsLogs, ...recentsMoviments]
      .sort((a, b) => {
        return b.createdAt.getTime() - a.createdAt.getTime();
      })
      .slice(0, 10);

    const getDynamicTitle = (action: string) => {
      switch (action) {
        case 'UPDATE':
          return 'Atualizou o produto';
        case 'CREATE':
          return 'Criou o produto';
        case 'DELETE':
          return 'Deletou o produto';
        default:
          return 'Registrou uma ação';
      }
    };

    const getDynamicDescription = (quantity: number, productName: string) => {
      return `${quantity} unidade${quantity > 1 ? 's' : ''} de ${productName}`;
    };

    const formattedActivities = activities.map((activity) => {
      const isMovement = 'type' in activity;

      return {
        id: activity.id,
        title: isMovement
          ? activity.type === 'IN'
            ? 'Registrou uma entrada de estoque'
            : 'Registrou uma saída de estoque'
          : getDynamicTitle(activity.action),
        description: isMovement
          ? getDynamicDescription(activity.quantity, activity.product.name)
          : activity.description,
        action: isMovement ? 'Movimentação' : 'Produto',
        createdAt: activity.createdAt,
        user: activity.user,
        product: activity.product,
      };
    });

    return {
      activities: formattedActivities,
      totalCount: formattedActivities.length,
    };
  }
}

export default GetActiivitysService;

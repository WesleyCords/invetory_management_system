import { prisma } from '../lib/prisma';

class GetActivitiesService {
  private getLogTitle(action: string): string {
    const titles: Record<string, string> = {
      UPDATE: 'Atualizou o produto',
      CREATE: 'Criou o produto',
      DELETE: 'Deletou o produto',
      PASSWORD_CHANGED: 'Alterou a senha de acesso',
      NAME_CHANGED: 'Alterou o nome de usuário',
    };
    return titles[action] || 'Registrou uma ação';
  }

  private getMovementDescription(
    quantity: number,
    productName?: string,
  ): string {
    const name = productName || 'Produto não especificado';
    return `${quantity} unidade${quantity > 1 ? 's' : ''} de ${name}`;
  }

  async execute() {
    const [recentLogs, recentMovements] = await Promise.all([
      prisma.auditLog.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { id: true, name: true, avatarUrl: true, role: true },
          },
          product: { select: { id: true, name: true, sku: true } },
        },
      }),
      prisma.stockMovement.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { id: true, name: true, avatarUrl: true, role: true },
          },
          product: { select: { id: true, name: true, sku: true } },
        },
      }),
    ]);

    const rawActivities = [...recentLogs, ...recentMovements]
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 10);

    const formattedActivities = rawActivities.map((activity) => {
      const isMovement = 'quantity' in activity;

      return {
        id: activity.id,
        title: isMovement
          ? activity.type === 'IN'
            ? 'Registrou uma entrada de estoque'
            : 'Registrou uma saída de estoque'
          : this.getLogTitle(activity.action),

        description: isMovement
          ? this.getMovementDescription(
              activity.quantity,
              activity.product?.name,
            )
          : activity.description,

        action: isMovement ? 'Movimentação' : 'Sistema',
        createdAt: activity.createdAt,
        user: activity.user,
        product: activity.product || null,
      };
    });

    return {
      activities: formattedActivities,
      totalCount: formattedActivities.length,
    };
  }
}

export default GetActivitiesService;

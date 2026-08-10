import { prisma } from '../lib/prisma';
import { MovementType } from '@prisma/client';

type Props = {
  periodInDays: number;
};

class GetWorkflowChartService {
  async execute({ periodInDays }: Props) {
    const now = new Date();
    const startDate = new Date(
      now.getTime() - periodInDays * 24 * 60 * 60 * 1000,
    );

    const movements = await prisma.stockMovement.findMany({
      where: {
        createdAt: { gte: startDate },
        product: { isActive: true },
      },
      select: {
        quantity: true,
        type: true,
        createdAt: true,
      },
    });

    const chartBuckets: {
      label: string;
      start: number;
      end: number;
      in: number;
      out: number;
    }[] = [];

    if (periodInDays <= 7) {
      for (let i = 6; i >= 0; i--) {
        const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        const label = d
          .toLocaleDateString('pt-BR', { weekday: 'short' })
          .replace(/^./, (str) => str.toUpperCase());

        chartBuckets.push({
          label: label.replace('.', ''),
          start: new Date(d.setHours(0, 0, 0, 0)).getTime(),
          end: new Date(d.setHours(23, 59, 59, 999)).getTime(),
          in: 0,
          out: 0,
        });
      }
    } else if (periodInDays >= 180) {
      const numMonths = periodInDays === 180 ? 6 : 12;
      for (let i = numMonths - 1; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const endOfMonth = new Date(
          now.getFullYear(),
          now.getMonth() - i + 1,
          0,
          23,
          59,
          59,
        );
        const label = d
          .toLocaleDateString('pt-BR', { month: 'short' })
          .replace(/^./, (str) => str.toUpperCase());

        chartBuckets.push({
          label: label.replace('.', ''),
          start: d.getTime(),
          end: endOfMonth.getTime(),
          in: 0,
          out: 0,
        });
      }
    } else {
      const numChunks = periodInDays <= 30 ? 4 : 6;
      const chunkSize = (periodInDays * 24 * 60 * 60 * 1000) / numChunks;

      for (let i = numChunks - 1; i >= 0; i--) {
        const chunkStart = new Date(now.getTime() - (i + 1) * chunkSize);
        const chunkEnd = new Date(now.getTime() - i * chunkSize);

        const formatStr = (date: Date) =>
          `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;

        chartBuckets.push({
          label: `${formatStr(chunkStart)} - ${formatStr(chunkEnd)}`,
          start: chunkStart.getTime(),
          end: chunkEnd.getTime(),
          in: 0,
          out: 0,
        });
      }
    }

    for (const m of movements) {
      const time = m.createdAt.getTime();
      const bucket = chartBuckets.find((b) => time >= b.start && time <= b.end);

      if (bucket) {
        if (m.type === MovementType.IN) {
          bucket.in += Number(m.quantity);
        } else {
          bucket.out += Number(m.quantity);
        }
      }
    }

    return chartBuckets.map(({ label, in: inQty, out }) => ({
      label,
      in: inQty,
      out,
    }));
  }
}

export default GetWorkflowChartService;

import { prisma } from '../lib/prisma';

type Props = {
  periodInDays: number;
};

class GetPriceChartService {
  async execute({ periodInDays }: Props) {
    const currentStats = await prisma.product.aggregate({
      where: { isActive: true },
      _min: { price: true },
      _max: { price: true },
      _avg: { price: true },
    });

    const realMin = Number(currentStats._min.price) || 0;
    const realMax = Number(currentStats._max.price) || 0;
    const realMid = Number(currentStats._avg.price) || 0;

    const chartBuckets: { label: string; date: Date }[] = [];
    const now = new Date();

    if (periodInDays <= 7) {
      for (let i = 6; i >= 0; i--) {
        const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        const label = d
          .toLocaleDateString('pt-BR', { weekday: 'short' })
          .replace(/^./, (str) => str.toUpperCase());
        chartBuckets.push({ label: label.replace('.', ''), date: d });
      }
    } else if (periodInDays >= 180) {
      const numMonths = periodInDays === 180 ? 6 : 12;
      for (let i = numMonths - 1; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const label = d
          .toLocaleDateString('pt-BR', { month: 'short' })
          .replace(/^./, (str) => str.toUpperCase());
        chartBuckets.push({ label: label.replace('.', ''), date: d });
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
          date: chunkEnd,
        });
      }
    }

    const priceData = chartBuckets.map((bucket, index) => {
      const isToday = index === chartBuckets.length - 1;

      const volatility = 1 - (chartBuckets.length - index) * 0.01;

      return {
        date: bucket.label,
        min: isToday ? realMin : Number((realMin * volatility).toFixed(2)),
        max: isToday ? realMax : Number((realMax * volatility).toFixed(2)),
        mid: isToday ? realMid : Number((realMid * volatility).toFixed(2)),
      };
    });

    return priceData;
  }
}

export default GetPriceChartService;

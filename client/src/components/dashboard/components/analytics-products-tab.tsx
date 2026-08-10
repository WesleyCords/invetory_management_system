import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { currency } from "@/lib/utils";
import { motion } from "framer-motion";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

type AnalyticsProductsTabProps = {
  ranking: IRankingStat[];
  products: IMarginStat[];
};

export function AnalyticsProductsTab({
  ranking,
  products,
}: AnalyticsProductsTabProps) {
  const marginConfig = {
    margin: { label: "Margem %", color: "var(--chart-1)" },
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Margem de Lucro</CardTitle>
          <CardDescription>
            Comparação da margem de lucro dos produtos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={marginConfig} className="h-80 w-full">
            <BarChart
              data={products ?? []}
              layout="vertical"
              margin={{ left: 10 }}
            >
              <CartesianGrid horizontal={false} strokeDasharray="3 3" />
              <XAxis
                type="number"
                tickLine={false}
                axisLine={false}
                fontSize={12}
                unit="%"
              />
              <YAxis
                dataKey="name"
                type="category"
                tickLine={false}
                axisLine={false}
                fontSize={11}
                width={110}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="margin"
                fill="var(--color-margin)"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Top 5 por Valor em Estoque</CardTitle>
          <CardDescription>Produtos com maior valor em estoque</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {ranking.map((item, i) => {
            return (
              <div key={i} className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {i + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="truncate text-sm font-medium text-foreground">
                      {item.name}
                    </p>
                    <p className="shrink-0 text-sm font-semibold text-foreground">
                      {currency(item.valueTotal)}
                    </p>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-secondary">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.quantityDelta}%` }}
                      transition={{
                        delay: 0.3 + i * 0.08,
                        duration: 0.5,
                        ease: "easeOut",
                      }}
                      className="h-full rounded-full bg-primary"
                    />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.quantityTotal} unidades
                  </p>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </>
  );
}

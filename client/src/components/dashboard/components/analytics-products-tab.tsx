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

export function AnalyticsProductsTab() {
  const marginConfig = {
    margin: { label: "Margem %", color: "var(--chart-1)" },
  };

  const marginsData = [
    { product: "Produto A", margin: 25 },
    { product: "Produto B", margin: 15 },
    { product: "Produto C", margin: 30 },
    { product: "Produto D", margin: 10 },
    { product: "Produto E", margin: 20 },
    { product: "Produto F", margin: 25 },
    { product: "Produto G", margin: 18 },
    { product: "Produto H", margin: 22 },
  ];

  const ranking = [
    { product: "Produto A", value: 1500, quantity: 50 },
    { product: "Produto B", value: 1200, quantity: 40 },
    { product: "Produto C", value: 1000, quantity: 30 },
    { product: "Produto D", value: 800, quantity: 25 },
    { product: "Produto E", value: 600, quantity: 20 },
  ];

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
              data={marginsData}
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
                dataKey="product"
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
            const pct = (item.value / ranking[0].value) * 100;
            return (
              <div key={i} className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {i + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="truncate text-sm font-medium text-foreground">
                      {item.product}
                    </p>
                    <p className="shrink-0 text-sm font-semibold text-foreground">
                      {currency(item.value)}
                    </p>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-secondary">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{
                        delay: 0.3 + i * 0.08,
                        duration: 0.5,
                        ease: "easeOut",
                      }}
                      className="h-full rounded-full bg-primary"
                    />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.quantity} unidades
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

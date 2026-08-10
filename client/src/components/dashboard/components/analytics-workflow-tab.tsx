import { CardSkeleton } from "@/components/skeletons/card-skeleton";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { currency } from "@/lib/utils";
import { motion } from "framer-motion";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

type WorkflowTabProps = {
  categories: ICategoryStat[];
  movements: WorkflowChartData[];
};

export function AnalyticsWorkflowTab({
  categories,
  movements,
}: WorkflowTabProps) {
  const productsConfig = {
    out: { label: "Saídas", color: "var(--chart-2)" },
    in: { label: "Entradas", color: "var(--destructive)" },
  };

  return (
    <>
      <Card className="col-span-2 flex flex-col h-100">
        <CardHeader>
          <CardTitle>Entradas vs Saídas</CardTitle>
          <CardDescription>
            Comparação de entradas e saídas de produtos
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 min-h-0 pb-4">
          <ChartContainer config={productsConfig} className="h-full w-full">
            <AreaChart
              data={movements ?? []}
              margin={{ left: -20, right: 10, top: 10, bottom: 0 }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                fontSize={12}
              />
              <YAxis tickLine={false} axisLine={false} fontSize={12} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <defs>
                <linearGradient id="fillIn" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-in)"
                    stopOpacity={0.5}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-in)"
                    stopOpacity={0.05}
                  />
                </linearGradient>
                <linearGradient id="fillOut" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-out)"
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-out)"
                    stopOpacity={0.05}
                  />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="in"
                stroke="var(--color-in)"
                fill="url(#fillIn)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="out"
                stroke="var(--color-out)"
                fill="url(#fillOut)"
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="fflex flex-col h-100">
        <CardHeader>
          <CardTitle>Valor por Categoria</CardTitle>
          <CardDescription>Participação no valor total</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto space-y-4 pr-2">
          {categories.map((c, i) => (
            <div key={i}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">{c.name}</span>
                <span className="text-muted-foreground">
                  {c.pct.toFixed(0)}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-secondary">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${c.pct}%` }}
                  transition={{
                    delay: 0.4 + i * 0.1,
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                  className="h-full rounded-full bg-primary"
                />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {currency(c.value)}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}

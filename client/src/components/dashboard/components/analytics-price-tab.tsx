import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { AreaChart, YAxis } from "recharts";
import { Area, CartesianGrid, XAxis } from "recharts";

export function AnalyticsPriceTab() {
  const priceConfig = {
    max: { label: "Maximo", color: "var(--chart-3)" },
    mid: { label: "Médio", color: "var(--chart-1)" },
    min: { label: "Mínimo", color: "var(--chart-2)" },
  };

  const priceData = [
    { date: "01/03", mid: 125.5, min: 39.9, max: 299.9 },
    { date: "05/03", mid: 128.3, min: 39.9, max: 299.9 },
    { date: "10/03", mid: 132.1, min: 39.9, max: 309.9 },
    { date: "15/03", mid: 135.8, min: 44.9, max: 309.9 },
    { date: "20/03", mid: 138.5, min: 44.9, max: 319.9 },
    { date: "25/03", mid: 142.2, min: 49.9, max: 319.9 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-card-foreground">
          Evolução de Preços
        </CardTitle>
        <CardDescription>
          Visualize a variação dos preços ao longo do tempo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={priceConfig} className="h-80 w-full">
          <AreaChart data={priceData} margin={{ left: -10 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              fontSize={12}
            />
            <YAxis tickLine={false} axisLine={false} fontSize={12} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Area
              type="monotone"
              dataKey="max"
              stroke="var(--color-max)"
              fill="var(--color-max)"
              fillOpacity={0.08}
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="mid"
              stroke="var(--color-mid)"
              fill="var(--color-mid)"
              fillOpacity={0.25}
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="min"
              stroke="var(--color-min)"
              fill="var(--color-min)"
              fillOpacity={0.08}
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

import { motion } from "framer-motion";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "../ui/select";

import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Crown,
  Lightbulb,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { AnalyticsWorkflowTab } from "./components/analytics-workflow-tab";
import { AnalyticsProductsTab } from "./components/analytics-products-tab";
import { AnalyticsPriceTab } from "./components/analytics-price-tab";
import { useGetAnalytics } from "@/hooks/querys/useGetAnalytics";
import { currency } from "@/lib/utils";
import { useState } from "react";
import { CardSkeleton } from "../skeletons/card-skeleton";

export function AnalyticsContent() {
  const [period, setPeriod] = useState(7);
  const {
    data: stats,
    isLoading,
    isError,
  } = useGetAnalytics({ periodInDays: period });

  const periods = [
    { label: "Último 7 dias", value: 7 },
    { label: "Últimos 30 dias", value: 30 },
    { label: "Ultimo 3 meses", value: 90 },
    { label: "Ultimo 6 meses", value: 180 },
    { label: "Ultimo ano", value: 365 },
  ];

  const kpi = [
    {
      label: "Valor em Estoque",
      value: currency(stats?.totalStockValue),
      percentage: stats?.stockValueDelta,
    },
    {
      label: "Custo Total",
      value: currency(stats?.totalCostValue),
      percentage: stats?.costValueDelta,
    },
    {
      label: "Lucro Potencial",
      value: currency(stats?.totalProfit),
      percentage: stats?.profitDelta,
    },
    {
      label: "Margem Media",
      value: stats?.avgMargin.toFixed(2) + "%",
      percentage: stats?.avgMarginDelta,
      avg: true,
    },
  ];

  const insights = [
    {
      icon: Crown,
      title: "Maior margem",
      text: `${stats?.bestMargin?.fullName} lidera com ${stats?.bestMargin?.margin?.toFixed(2)}% de margem.`,
    },
    {
      icon: AlertTriangle,
      title: "Atenção ao estoque",
      text: `${stats?.lowStock?.length} produtos com estoque baixo, verifique o estoque e reponha os produtos.`,
    },
    {
      icon: Lightbulb,
      title: "Fluxo do período",
      text: `${stats?.totalIn} entradas vs ${stats?.totalOut} saídas — saldo ${stats?.totalIn - stats?.totalOut > 0 ? "positivo" : "negativo"} de ${stats?.totalIn - stats?.totalOut} unidades.`,
    },
  ];

  if (isError) {
    return (
      <div className="py-12 text-center">
        <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground/50" />
        <p className="mt-4 text-muted-foreground">
          Ocorreu um erro ao carregar os dados para analise!
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/*Header */}
      <div className="flex items-center justify-between">
        <span>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-md text-muted-foreground">
            Inteligência sobre estoque, preços e movimentações
          </p>
        </span>
        <Select
          items={periods}
          defaultValue={periods[0].label}
          onValueChange={(value) => setPeriod(Number(value))}
        >
          <SelectTrigger className="w-45">
            <SelectValue placeholder="Selecione um período" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Periodo</SelectLabel>
              {periods.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/*Cards*/}
      <div className="grid grid-cols-4 gap-3">
        {kpi.map((stat, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            key={index}
          >
            {isLoading ? (
              <CardSkeleton />
            ) : (
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-md text-muted-foreground">
                    {stat.label}
                  </h3>
                  <span className="flex items-baseline justify-between mt-1 gap-2">
                    <p className="text-xl font-bold text-foreground text-nowrap">
                      {stat.value}
                    </p>
                    <Badge
                      variant="secondary"
                      className={`gap-0.5 p-1.5 text-sm font-medium ${stat.percentage > 0 ? "text-emerald-500" : "text-destructive"}`}
                    >
                      {stat.percentage > 0 ? (
                        <ArrowUpRight className="h-3 w-3" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3" />
                      )}
                      {"avg" in stat && stat.avg
                        ? `${stat.percentage?.toFixed(2)}pp`
                        : `${stat.percentage?.toFixed(2)}%`}
                    </Badge>
                  </span>
                </CardContent>
              </Card>
            )}
          </motion.div>
        ))}
      </div>

      {/*Insights*/}
      <div className="grid grid-cols-3 gap-3">
        {insights.map((ins, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            key={i}
          >
            <Card className="h-full">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <ins.icon className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-md font-semibold">{ins.title}</h3>
                  <p className="text-sm text-muted-foreground">{ins.text}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/*Charts*/}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <Tabs>
          <TabsList className="bg-secondary">
            <TabsTrigger value="workflow">Fluxo de Estoque</TabsTrigger>
            <TabsTrigger value="products">Produtos</TabsTrigger>
            <TabsTrigger value="prices">Preços</TabsTrigger>
          </TabsList>
          {isLoading ? (
            <CardSkeleton />
          ) : (
            <>
              <TabsContent
                value="workflow"
                className="grid grid-cols-3 gap-6 mt-4"
              >
                <AnalyticsWorkflowTab
                  movements={stats?.workflowData || []}
                  categories={stats?.categories || []}
                />
              </TabsContent>

              <TabsContent
                value="products"
                className="grid grid-cols-2 gap-6 mt-4"
              >
                <AnalyticsProductsTab
                  ranking={stats?.ranking}
                  products={stats?.margins}
                />
              </TabsContent>

              <TabsContent value="prices" className="mt-4">
                <AnalyticsPriceTab prices={stats?.priceData || []} />
              </TabsContent>
            </>
          )}
        </Tabs>
      </motion.div>
    </motion.div>
  );
}

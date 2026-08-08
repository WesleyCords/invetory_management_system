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

import { Card, CardHeader, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Crown,
  Lightbulb,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { AnalyticsWorkflowTab } from "./components/analytics-workflow-tab";
import { AnalyticsProductsTab } from "./components/analytics-products-tab";
import { AnalyticsPriceTab } from "./components/analytics-price-tab";

export function AnalyticsContent() {
  const itemsMock = [
    { label: "Últimos 30 dias", value: 30 },
    { label: "Ultimo 3 meses", value: 90 },
    { label: "Ultimo 6 meses", value: 180 },
    { label: "Ultimo ano", value: 365 },
  ];

  const statsMock = [
    {
      label: "Valor em Estoque",
      value: "R$ 12.345,67",
      percentage: 8.2,
    },
    {
      label: "Custo Total",
      value: "8.534,78",
      percentage: 3.1,
    },
    {
      label: "Lucro Potencial",
      value: "24.278,70",
      percentage: 11.4,
    },
    {
      label: "Margem Media",
      value: "59.6",
      percentage: -0.8,
    },
  ];

  const insights = [
    {
      icon: Crown,
      title: "Maior margem",
      text: "Boné Trucker lidera com 69.9% de margem.",
    },
    {
      icon: AlertTriangle,
      title: "Atenção ao estoque",
      text: "3 produtos abaixo do estoque mínimo: Tênis Esportivo Runner, Mochila Urban…",
    },
    {
      icon: Lightbulb,
      title: "Fluxo do período",
      text: "985 entradas vs 775 saídas — saldo positivo de 210 unidades.",
    },
  ];

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
        <Select items={itemsMock} defaultValue={itemsMock[0].label}>
          <SelectTrigger className="w-45">
            <SelectValue placeholder="Selecione um período" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Periodo</SelectLabel>
              {itemsMock.map((item) => (
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
        {statsMock.map((stat, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            key={index}
          >
            <Card>
              <CardContent className="p-4">
                <h3 className="text-md text-muted-foreground">{stat.label}</h3>
                <span className="flex items-baseline justify-between mt-1 gap-2">
                  <p className="text-xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <Badge
                    variant="secondary"
                    className={`gap-0.5 p-3 text-md font-semibold ${stat.percentage > 0 ? "text-emerald-500" : "text-destructive"}`}
                  >
                    {stat.percentage > 0 ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {stat.percentage}%
                  </Badge>
                </span>
              </CardContent>
            </Card>
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

          <TabsContent value="workflow" className="grid grid-cols-3 gap-6 mt-4">
            <AnalyticsWorkflowTab />
          </TabsContent>

          <TabsContent value="products" className="grid grid-cols-2 gap-6 mt-4">
            <AnalyticsProductsTab />
          </TabsContent>

          <TabsContent value="prices" className="mt-4">
            <AnalyticsPriceTab />
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}

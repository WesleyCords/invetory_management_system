import {
  mockProducts,
  mockMovements,
  mockLogs,
  calculateStats,
} from "@/lib/state-mock";
import { useUIStore } from "@/store/useUIStore";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowDownCircle,
  ArrowRight,
  ArrowUpCircle,
  DollarSign,
  Package,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useProducts } from "@/hooks/querys/useProducts";
import { useMetrics } from "@/hooks/querys/useMetrics";

export function OverviewContent() {
  const {
    data: products,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useProducts();
  const {
    data: metrics,
    isLoading: isMetricsLoading,
    isError: isMetricsError,
  } = useMetrics();
  const toggleTab = useUIStore((state) => state.setAbartOpen);

  const recentMovements = mockMovements.slice(0, 5);
  const recentLogs = mockLogs.slice(0, 4);

  if (isProductsError || isMetricsError || !products || !metrics) {
    return (
      <div className="flex items-center justify-center h-full min-h-100 text-destructive">
        <AlertTriangle className="h-8 w-8 mb-2 mx-auto" />
        <p>Erro ao carregar os dados do painel. Tente novamente.</p>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total de Produtos",
      value: products.length.toString(),
      subtitle: "SKUs cadastrados",
      icon: Package,
      color: "bg-primary/10 text-primary",
    },
    {
      title: "Valor em Estoque",
      value: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(metrics.data.financial.patrimony),
      subtitle: "Preço de venda",
      icon: DollarSign,
      color: "bg-emerald-500/10 text-emerald-500",
    },
    {
      title: "Estoque Baixo",
      value: metrics.data.inventory.lowStockItems.toString(),
      subtitle: "Itens para repor",
      icon: AlertTriangle,
      color:
        metrics.data.inventory.lowStockItems > 0
          ? "bg-amber-500/10 text-amber-500"
          : "bg-muted text-muted-foreground",
    },
    {
      title: "Movimentações Hoje",
      value: metrics.data.movements.todayTotal.toString(),
      subtitle: `${metrics.data.movements.todayEntries} entradas / ${metrics.data.movements.todayExits} saídas (mês)`,
      icon: ArrowDownCircle,
      color: "bg-blue-500/10 text-blue-500",
    },
  ];

  const productsLowStock = products.filter((p) => p.isLowStock).slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="">
          <h1 className="text-2xl font-bold text-foreground">
            Visao Geral do Estoque
          </h1>
          <p className="text-muted-foreground">
            Acompanhe as metricas e movimentacoes recentes do seu estoque
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => toggleTab("movements")} variant="outline">
            <ArrowUpCircle className="h-4 w-4" />
            Nova Movimentação
          </Button>
          <Button onClick={() => toggleTab("products")}>
            <Package className="h-4 w-4" />
            Ver Produtos
          </Button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:border-accent">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>{card.title}</CardTitle>
                <div className={`rounded-lg p-2 ${card.color}`}>
                  <card.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {card.value}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {card.subtitle}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="col-span-2"
        >
          <Card className="border-border border">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex gap-2 items-center">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <CardTitle className="text-foreground">
                  Produtos com Estoque Baixo
                </CardTitle>
              </div>
              <Button
                onClick={() => toggleTab("products")}
                className="bg-muted"
              >
                Ver todos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              {metrics.data.inventory.lowStockItems === 0 ? (
                <p className="text-muted-foreground text-sm py-4 text-center">
                  Nenhum produto com estoque baixo
                </p>
              ) : (
                <div className="space-y-3">
                  {productsLowStock.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      className="flex items-center justify-between rounded-lg p-3 bg-secondary/50 hover:bg-secondary transition-colors"
                    >
                      <div className="flex gap-3 items-center">
                        <div className="flex items-center justify-center h-10 w-10 rounded-md bg-amber-500/10">
                          <Package className="text-amber-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {product.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {product.sku}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`mb-1 inline-block px-2 py-1 rounded-sm text-xs font-medium ${
                            product.quantity === 0
                              ? "bg-destructive text-destructive-foreground"
                              : "bg-secondary text-secondary-foreground"
                          }`}
                        >
                          {product.quantity} em estoque
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="border-border border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-foreground">
                Ultimas Movimentacoes
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleTab("movements")}
              >
                Ver todas
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentMovements.map((movement, index) => (
                <motion.div
                  key={movement.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      movement.type === "entrada"
                        ? "bg-emerald-500/10"
                        : "bg-rose-500/10"
                    }`}
                  >
                    {movement.type === "entrada" ? (
                      <TrendingUp className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-rose-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {movement.productName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {movement.type === "entrada" ? "+" : "-"}
                      {movement.quantity} un
                    </p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="bg-card border-border">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Atividade Recente</CardTitle>
            <Button variant="ghost">
              Ver historico completo
              <ArrowRight />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentLogs.map((log, index) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.6 }}
                className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                  {log.userName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">{log.userName}</span>{" "}
                    <span className="text-muted-foreground">{log.action}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">{log.details}</p>
                  <p className="text-xs text-muted-foreground/70 mt-1">
                    {new Date(log.createdAt).toLocaleString("pt-BR")}
                  </p>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../ui/button";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Replace,
  Search,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useUiMovement } from "@/store/useUiMovement";
import { MovementDialog } from "./components/movement-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useGetMovement } from "@/hooks/querys/useGetMovement";
import { CardSkeleton } from "../skeletons/card-skeleton";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { useState } from "react";
import { Input } from "../ui/input";
import { Pagination } from "./components/pagination";

export function MovementsContent() {
  const openModal = useUiMovement((state) => state.openModal);
  const [activeTab, setActiveTab] = useState<"all" | "IN" | "OUT">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { currentPage, onChangePage: onPageChange } = useUiMovement();

  const {
    data: movements,
    isLoading,
    isError,
  } = useGetMovement({
    period: 1,
    page: currentPage,
  });

  const stats = {
    totalMovements: movements?.movements.length || 0,
    totalEntries: movements?.movements.reduce((acc, movement) => {
      if (movement.type === "IN") {
        return acc + movement.quantity;
      }
      return acc;
    }, 0),
    totalExits: movements?.movements.reduce((acc, movement) => {
      if (movement.type === "OUT") {
        return acc + movement.quantity;
      }
      return acc;
    }, 0),
  };

  const movementsFiltered = movements?.movements.filter((movement) => {
    const matchesSearch =
      movement.product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movement.product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "IN" && movement.type === "IN") ||
      (activeTab === "OUT" && movement.type === "OUT");
    return matchesSearch && matchesTab;
  });

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Ops! Algo deu errado</h1>
        <p className="text-md text-muted-foreground">
          Não foi possível carregar as movimentações. Tente novamente mais
          tarde.
        </p>
      </div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-4"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Movimentações</h1>
            <p className="text-md text-muted-foreground">
              Registre entradas e saidas do estoque
            </p>
          </div>
          <Button variant="outline" onClick={() => openModal()}>
            <Replace />
            <span>Registar Movimentação</span>
          </Button>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {isLoading ? (
            [1, 2, 3].map((index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CardSkeleton />
              </motion.div>
            ))
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card>
                  <CardContent className="flex items-center justify-between py-5">
                    <div>
                      <h2 className="text-md text-muted-foreground">
                        Movimentações Hoje
                      </h2>
                      <span className="text-2xl font-bold text-foreground">
                        {stats.totalMovements}
                      </span>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-md">
                      <Replace />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card>
                  <CardContent className="flex items-center justify-between py-5">
                    <div>
                      <h2 className="text-md text-muted-foreground">
                        Entradas Hoje
                      </h2>
                      <span className="text-2xl font-bold text-emerald-500">
                        +{stats.totalEntries}un
                      </span>
                    </div>
                    <div className="bg-emerald-500/10 p-3 rounded-md">
                      <TrendingUp className="text-emerald-500" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card>
                  <CardContent className="flex items-center justify-between py-5">
                    <div>
                      <h2 className="text-md text-muted-foreground">
                        Saídas Hoje
                      </h2>
                      <span className="text-2xl font-bold text-rose-500">
                        -{stats.totalExits}un
                      </span>
                    </div>
                    <div className="bg-rose-500/10 p-3 rounded-md">
                      <TrendingDown className="text-rose-500" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </>
          )}
        </div>

        {/* Filters */}
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Tabs
                value={activeTab}
                onValueChange={(v) => setActiveTab(v as typeof activeTab)}
                className="w-full sm:w-auto"
              >
                <TabsList className="bg-secondary">
                  <TabsTrigger value="all">Todas</TabsTrigger>
                  <TabsTrigger
                    value="IN"
                    className="data-[state=active]:text-emerald-500"
                  >
                    Entradas
                  </TabsTrigger>
                  <TabsTrigger
                    value="OUT"
                    className="data-[state=active]:text-rose-500"
                  >
                    Saidas
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="relative w-full sm:w-75">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome ou SKU do produto..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-secondary border-border"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Movements List */}
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Movimentações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <AnimatePresence>
                {movementsFiltered?.length === 0 && !isLoading ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center justify-center gap-4 py-10"
                  >
                    <h1 className="text-2xl font-bold">Nenhuma movimentação</h1>
                    <p className="text-md text-muted-foreground">
                      Nenhuma movimentação encontrada para os filtros aplicados.
                    </p>
                  </motion.div>
                ) : (
                  movementsFiltered?.map((m, index) => (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: index * 0.03 }}
                      className="flex items-center justify-between gap-4 rounded-md border border-border bg-card p-4 transition-colors hover:bg-secondary/50 pointer-events-none"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                            m.type === "IN"
                              ? "bg-emerald-500/10"
                              : "bg-rose-500/10"
                          }`}
                        >
                          {m.type === "IN" ? (
                            <ArrowUpCircle className="h-6 w-6 text-emerald-500" />
                          ) : (
                            <ArrowDownCircle className="h-6 w-6 text-rose-500" />
                          )}
                        </div>
                        <div className="flex flex-col gap-1">
                          <h2>
                            {m.product.name} ({m.product.sku})
                            <span
                              className={`px-2 py-1 rounded-md text-xs font-medium ml-3 ${
                                m.type === "IN"
                                  ? "text-emerald-500 bg-green-500/10"
                                  : "text-rose-500 bg-rose-500/10"
                              }`}
                            >
                              {m.type === "IN" ? "Entrada" : "Saida"}
                            </span>
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            {m.notes ? m.notes : "Sem observações"}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span
                          className={`text-lg font-bold ${m.type === "IN" ? "text-emerald-500" : "text-rose-500"}`}
                        >
                          {m.type === "IN" ? "+" : "-"}
                          {m.quantity}un
                        </span>
                        <p className="text-md text-muted-foreground">
                          {m.user.name}
                        </p>
                        <p className="text-[12px] text-muted-foreground">
                          {new Date(m.createdAt).toLocaleString("pt-BR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })}
                        </p>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>

        <Pagination
          currentPage={currentPage}
          totalPages={movements?.totalPages || 0}
          onPageChange={onPageChange}
        />
        <div>
          {currentPage} of {movements?.totalPages || 0}
        </div>
      </motion.div>

      <MovementDialog />
    </>
  );
}

import {
  Download,
  FileText,
  Search,
  ShieldAlert,
  UserCheck,
  History,
  Calendar,
  ArrowLeftRight,
  User,
  Package,
  ChevronDown,
} from "lucide-react";
import { Button } from "../ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGetLogsStats } from "@/hooks/querys/useGetLogsStats";
import { CardSkeleton } from "../skeletons/card-skeleton";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { useGetUsers } from "@/hooks/querys/useGetUsers";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Pagination } from "./components/pagination";
import { usePaginationLog } from "@/store/usePaginationLog";

const entityTypeLabels: Record<IActivity["category"], string> = {
  PRODUCT: "Produto",
  INVENTORY: "Movimentação",
  SYSTEM: "Sistema",
  SECURITY: "Segurança",
};

const entityTypeColors: Record<IActivity["category"], string> = {
  PRODUCT: "bg-primary/10 text-primary",
  INVENTORY: "bg-amber-500/10 text-amber-500",
  SYSTEM: "bg-blue-500/10 text-blue-500",
  SECURITY: "bg-red-500/10 text-red-500",
};

const entityTypeIcons: Record<
  IActivity["category"],
  React.ComponentType<{ className?: string }>
> = {
  PRODUCT: Package,
  INVENTORY: ArrowLeftRight,
  SYSTEM: User,
  SECURITY: ShieldAlert,
};

export function LogsContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState(30);
  const [selectedUser, setSelectedUser] = useState<string | undefined>();
  const [expandedLogs, setExpandedLogs] = useState<Set<string>>(new Set());

  const periods = [
    { label: "Últimos 7 dias", value: 7 },
    { label: "Últimos 30 dias", value: 30 },
    { label: "Últimos 90 dias", value: 90 },
    { label: "Últimos 180 dias", value: 180 },
    { label: "Último ano", value: 365 },
  ];

  const debounceSearch = useDebounce(searchQuery, 500);
  const { currentPage, setCurrentPage } = usePaginationLog((state) => state);

  const { data: logsStats, isLoading } = useGetLogsStats({
    periodInDays: selectedPeriod,
    search: debounceSearch,
    userId: selectedUser,
    page: currentPage,
    limit: 10,
  });
  const { data: users, isLoading: isUserLoading } = useGetUsers();

  const usersFormatted = [
    { label: "Todos os Usuários", value: "ALL" },
    ...(users?.map((user) => ({
      label: user.name,
      value: user.id,
    })) ?? []),
  ];

  const kpis = [
    {
      title: "Total de Registros",
      value: logsStats?.totalLogs.toString() || "0",
      subtitle: "Neste período",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Ações Críticas",
      value: logsStats?.criticalLogsCount.toString() || "0",
      subtitle: "Exclusões e alertas",
      icon: <ShieldAlert className="h-5 w-5" />,
    },
    {
      title: "Usuário Mais Ativo",
      value: logsStats?.topUser?.name || "N/A",
      subtitle: `${logsStats?.topUser?.actionsCount || 0} ações realizadas`,
      icon: <UserCheck className="h-5 w-5" />,
    },
  ];

  const groupsLog = logsStats?.logs.reduce(
    (group, log) => {
      const date = new Date(log.createdAt).toLocaleDateString("pt-BR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      if (!group[date]) {
        group[date] = [];
      }

      group[date].push(log);

      return group;
    },
    {} as Record<string, IActivity[]>,
  );

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedLogs);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedLogs(newExpanded);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Logs de Atividades</h1>
          <p className="text-muted-foreground">
            Histórico completo de ações no sistema {logsStats?.totalPages || 0}{" "}
            páginas
          </p>
        </div>
        <Button variant="outline" className="mt-4">
          <Download className="mr-2 h-4 w-4" />
          Exportar Logs
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {isLoading
          ? [1, 2, 3].map((index) => <CardSkeleton key={index} />)
          : kpis.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="flex items-center justify-between gap-2 py-4">
                    <div>
                      <p className="text-muted-foreground text-sm font-medium mb-1">
                        {card.title}
                      </p>
                      <span className="text-2xl font-bold">{card.value}</span>
                      {card.subtitle && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {card.subtitle}
                        </p>
                      )}
                    </div>
                    <div className="bg-primary/10 text-muted-foreground p-3 rounded-md">
                      {card.icon}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
      </div>
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-row items-center gap-4">
            <div className="relative flex-1">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Pesquisar logs por usuario, produto..."
                className="pl-10"
              />
            </div>
            <div className="flex flex-row gap-4">
              <Select
                items={periods}
                key={periods[0].value}
                onValueChange={(value) => setSelectedPeriod(Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um período" />
                </SelectTrigger>
                <SelectContent>
                  {periods.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                items={usersFormatted}
                onValueChange={(selected: string) => {
                  if (selected !== "ALL") {
                    setSelectedUser(selected);
                  } else {
                    setSelectedUser(undefined);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um usuário" />
                </SelectTrigger>
                <SelectContent>
                  {usersFormatted.map((user) => (
                    <SelectItem key={user.value} value={user.value}>
                      {user.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Timeline dos logs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {isLoading ? (
              <CardSkeleton />
            ) : Object.keys(groupsLog).length !== 0 ? (
              Object.entries(groupsLog).map(([date, log], index) => (
                <motion.div
                  key={date}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: index * 0.1 }}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <h3 className="text-sm font-medium text-muted-foreground capitalize">
                      {date}
                    </h3>
                    <Badge variant="secondary" className="ml-auto">
                      {log.length} logs
                    </Badge>
                  </div>
                  <div className="relative ml-2 space-y-4 border-l-2 border-border pl-6">
                    <AnimatePresence>
                      {log.map((act, i) => {
                        const Icon = entityTypeIcons[act.category];
                        return (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ delay: index * 0.03 }}
                            className="relative"
                          >
                            {/*dots*/}
                            <div
                              className={`absolute -left-7.75 flex h-4 w-4 items-center justify-center rounded-full border-2 border-background ${entityTypeColors[act.category].split(" ")[0]}`}
                            >
                              <div className="h-2 w-2 rounded-full bg-current" />
                            </div>

                            <Collapsible
                              open={expandedLogs.has(act.id)}
                              onOpenChange={() => toggleExpanded(act.id)}
                            >
                              <div className="rounded-lg border border-border bg-secondary/30 p-4 hover:bg-secondary/50 transition-colors">
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex items-start gap-3">
                                    <div
                                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${entityTypeColors[act.category]}`}
                                    >
                                      <Icon className="h-5 w-5" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <p className="font-medium text-foreground">
                                          {act.user.name}
                                        </p>
                                        <span className="text-muted-foreground">
                                          -
                                        </span>
                                        <p className="text-muted-foreground">
                                          {act.action}
                                        </p>
                                      </div>
                                      <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                                        {act.description}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2 shrink-0">
                                    <Badge
                                      variant="secondary"
                                      className={entityTypeColors[act.category]}
                                    >
                                      {entityTypeLabels[act.category]}
                                    </Badge>
                                    <CollapsibleTrigger
                                      render={
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-8 w-8"
                                        >
                                          <ChevronDown
                                            className={`h-4 w-4 transition-transform ${expandedLogs.has(act.id) ? "rotate-180" : ""}`}
                                          />
                                        </Button>
                                      }
                                    ></CollapsibleTrigger>
                                  </div>
                                </div>
                                <CollapsibleContent>
                                  <div className="mt-4 pt-4 border-t border-border space-y-2">
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                      <div>
                                        <p className="text-muted-foreground">
                                          ID do Registro
                                        </p>
                                        <p className="font-mono text-foreground">
                                          {act.id}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-muted-foreground">
                                          Usuario ID
                                        </p>
                                        <p className="font-mono text-foreground">
                                          {act.user.id}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-muted-foreground">
                                          Data/Hora
                                        </p>
                                        <p className="text-foreground">
                                          {new Date(
                                            act.createdAt,
                                          ).toLocaleString("pt-BR")}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </CollapsibleContent>
                              </div>
                            </Collapsible>

                            <p className="text-xs text-muted-foreground mt-2">
                              {new Date(act.createdAt).toLocaleTimeString(
                                "pt-BR",
                                { hour: "2-digit", minute: "2-digit" },
                              )}
                            </p>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="py-12 text-center">
                <History className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">
                  Nenhum log encontrado
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Pagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalPages={logsStats?.totalPages || 0}
      />
    </motion.div>
  );
}

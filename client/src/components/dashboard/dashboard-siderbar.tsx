import {
  ArrowLeftRight,
  BarChart3,
  LayoutDashboard,
  Package,
  HistoryIcon,
  LogOut,
  Settings,
  HelpCircle,
} from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";
import { useUIStore } from "@/store/useUIStore";
import { cn } from "@/lib/utils";
import { AlertLogout } from "./components/alert-logout";

const menuItems = [
  { id: "overview", label: "Visao Geral", icon: LayoutDashboard },
  { id: "products", label: "Produtos", icon: Package },
  { id: "movements", label: "Movimentacoes", icon: ArrowLeftRight },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "logs", label: "Logs", icon: HistoryIcon },
];

const bottomItems = [
  { id: "settings", label: "Configuracoes", icon: Settings },
  { id: "help", label: "Ajuda", icon: HelpCircle },
];

export function DashboardSideBar() {
  const isOpen = useUIStore((state) => state.isSidebarOpen);
  const aba = useUIStore((state) => state.abartOpen);

  return (
    <motion.aside
      initial={false}
      animate={{ width: isOpen ? 260 : 80 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative flex flex-col border-r-2 border-border bg-card"
    >
      <header className="flex h-16 items-center gap-3 border-b border-border px-4">
        <div className="h-10 w-10 bg-primary flex items-center justify-center rounded-md shrink-0">
          <Package className="h-6 w-6 text-primary-foreground" />
        </div>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0, x: -10 }}
              animate={{ width: "auto", opacity: 1, x: 0 }}
              exit={{ width: 0, opacity: 0, x: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden whitespace-nowrap"
            >
              <span className="text-xl font-bold text-foreground">
                System Inventory
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <nav className="flex-1 space-y-1 p-3">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.id}
              item={item}
              isOpen={isOpen}
              isActive={aba == item.id}
            />
          ))}
        </div>
      </nav>

      <div className="border-t border-border p-3 space-y-1">
        {bottomItems.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            isOpen={isOpen}
            isActive={aba == item.id}
          />
        ))}

        <AlertLogout>
          <button
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
              "text-muted-foreground hover:bg-destructive/10 hover:text-destructive cursor-pointer outline-none",
            )}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            <AnimatePresence>
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="whitespace-nowrap overflow-hidden"
                >
                  Sair
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </AlertLogout>
      </div>
    </motion.aside>
  );
}

interface SidebarItemProps {
  item: {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  };
  isOpen: boolean;
  isActive: boolean;
}

function SidebarItem({ item, isOpen, isActive }: SidebarItemProps) {
  const setAbartOpen = useUIStore((state) => state.setAbartOpen);
  return (
    <button
      onClick={() => setAbartOpen(item.id)}
      className={cn(
        "relative flex w-full items-center gap-3 rounded-lg cursor-pointer px-3 py-2.5 text-sm font-medium transition-all duration-200",
        isActive
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground",
      )}
    >
      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-primary"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
      <item.icon className="h-5 w-5 shrink-0" />
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
          >
            <span className="overflow-hidden whitespace-nowrap">
              {item.label}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}

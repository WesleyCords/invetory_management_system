import { useUIStore } from "@/store/useUIStore";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  ChevronDown,
  ChevronFirst,
  ChevronLast,
  Search,
  User,
} from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DashboardHeader() {
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);
  const isSideOpen = useUIStore((state) => state.isSidebarOpen);
  const toggleTab = useUIStore((state) => state.setAbartOpen);
  return (
    <header className="flex h-16 items-center justify-between bg-card px-6 border-b-2 border-border">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="h-10 w-10 text-muted-foreground cursor-pointer hover:bg-primary hover:text-foreground rounded-md flex items-center justify-center transition-colors"
          aria-label="Alternar menu lateral"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={isSideOpen ? "collapse" : "expand"}
              initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {isSideOpen ? <ChevronFirst /> : <ChevronLast />}
            </motion.div>
          </AnimatePresence>
        </button>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar..."
            className="w-80 pl-9 bg-secondary border-border focus:border-primary"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="relative text-muted-foreground border border-border"
        >
          <Bell />
          <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-primary" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                className="group h-auto py-1 gap-2 text-muted-foreground"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full group-hover:bg-primary group-hover:text-primary-foreground bg-secondary">
                  <User className="h-4 w-4" />
                </div>

                <div className="block text-left">
                  <p className="text-sm font-medium text-foreground">
                    Wesley Cordeiro
                  </p>
                  <p className="text-xs text-muted-foreground">Admin</p>
                </div>

                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            }
          ></DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 bg-card rounded-md border-border"
            align="end"
          >
            <DropdownMenuGroup className="text-muted-foreground">
              <DropdownMenuLabel className="text-sm font-semibold text-foreground">
                Minha Conta
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => toggleTab("help")}>
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toggleTab("settings")}>
                Configurações
              </DropdownMenuItem>
              <DropdownMenuItem>Suporte</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:bg-destructive/30 ">
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

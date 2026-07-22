import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/hooks/querys/useAuth";
import { destroyCookie } from "nookies";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export function AlertLogout({ children }: { children: React.ReactElement }) {
  const { logout } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    destroyCookie(null, "nexus.token", { path: "/" });
    api.defaults.headers.common["Authorization"] = "";
    router.refresh();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger render={children} />

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Encerrar Sessão</AlertDialogTitle>
          <AlertDialogDescription>
            Você tem certeza que deseja sair? Será necessário fazer login
            novamente para acessar o painel de gerenciamento.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleLogout}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Sim, sair
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

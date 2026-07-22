import { setCookie } from "nookies";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useAuthState } from "@/store/useAuthState";
import { useRouter } from "next/navigation";

export function useAuth() {
  const { user, setUser, logout } = useAuthState();
  const router = useRouter();

  async function signIn({ username, password }: SignInCredentials) {
    try {
      const response = await api.post("/login", { username, password });

      const { token, user: userData } = response.data;

      setCookie(null, "nexus.token", token, {
        maxAge: 60 * 60 * 24,
        path: "/",
      });

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser(userData);

      toast.success("Bem-vindo de volta!");
      router.refresh();
    } catch (error) {
      toast.error("Credenciais inválidas");
      throw error;
    }
  }

  return {
    user,
    signIn,
    logout,
  };
}

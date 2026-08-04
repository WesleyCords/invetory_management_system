import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { ChangePasswordDTO } from "@/dtos";
import { toast } from "sonner";

export function useChangePassword() {
  return useMutation({
    mutationFn: async (payload: ChangePasswordDTO) => {
      const response = await api.patch("/user/change-password", payload);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Senha alterada com sucesso!", {
        description: "Sua senha foi atualizada.",
      });
    },

    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        "Não foi possível conectar ao servidor. Tente novamente.";

      toast.error("Falha ao alterar a senha", {
        description: errorMessage,
      });

      console.error("Erro interno:", error);
    },
  });
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { CreateMovementDTO } from "@/dtos";

export function useCreateMovement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateMovementDTO) => {
      const response = await api.post("/movements", payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movements"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Movimentação criada com sucesso!");
    },

    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        "Não foi possível conectar ao servidor. Tente novamente.";

      toast.error("Falha ao criar a movimentação", {
        description: errorMessage,
      });

      console.error("Erro interno:", error);
    },
  });
}

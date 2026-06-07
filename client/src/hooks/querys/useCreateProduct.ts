import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { CreateProductDTO } from "@/dtos";
import { toast } from "sonner";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateProductDTO) => {
      const response = await api.post("/product", payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });

      toast.success("Produto criado com sucesso!", {
        description: "O item já está disponível no seu estoque.",
      });
    },

    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        "Não foi possível conectar ao servidor. Tente novamente.";

      toast.error("Falha ao criar o produto", {
        description: errorMessage,
      });

      console.error("Erro interno:", error);
    },
  });
}

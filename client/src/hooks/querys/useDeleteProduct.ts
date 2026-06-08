import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "@/lib/api";

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/product/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Produto deletado com sucesso!");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Erro ao deletar produto.";
      toast.error("Falha na exclusão", { description: errorMessage });
    },
  });
}

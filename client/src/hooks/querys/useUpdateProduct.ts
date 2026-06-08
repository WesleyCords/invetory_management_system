import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateProductDTO } from "@/dtos";
import { toast } from "sonner";
import { api } from "@/lib/api";

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateProductDTO) => {
      const { id, ...data } = payload;
      const response = await api.patch(`/product/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Produto atualizado com sucesso!");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Erro ao atualizar produto.";
      toast.error("Falha na atualização", { description: errorMessage });
    },
  });
}

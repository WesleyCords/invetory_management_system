import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

interface IProductsResponse {
  message: string;
  data: IProduct[];
}

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await api.get<IProductsResponse>("/products");

      return response.data.data;
    },
  });
}

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

interface IProductsResponse {
  message: string;
  data: IProductGet;
}

export function useProducts({
  page = 1,
  limit = 10,
  search,
}: UseProductsParams = {}) {
  return useQuery({
    queryKey: ["products", page, limit, search],
    queryFn: async () => {
      const response = await api.get<IProductsResponse>("/products", {
        params: {
          page,
          limit,
          search,
        },
      });

      console.log("RESPONSE: ", response.data.data);

      return response.data.data;
    },
  });
}

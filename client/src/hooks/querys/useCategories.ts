import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface ICategoriesResponse {
  message: string;
  data: ICategories[];
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await api.get<ICategoriesResponse>("/categories");

      return response.data.data;
    },

    staleTime: 1000 * 60 * 5,
  });
}

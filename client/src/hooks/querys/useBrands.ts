import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface IBrandsResponse {
  message: string;
  data: IBrands[];
}

export function useBrands() {
  return useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const response = await api.get<IBrandsResponse>("/brands");

      return response.data.data;
    },
  });
}

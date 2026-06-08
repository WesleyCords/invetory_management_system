import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface ISuppliersResponse {
  message: string;
  data: ISuppliers[];
}

export function useSuppliers() {
  return useQuery({
    queryKey: ["suppliers"],
    queryFn: async () => {
      const response = await api.get<ISuppliersResponse>("/suppliers");

      return response.data.data;
    },
  });
}

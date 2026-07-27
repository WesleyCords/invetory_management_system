import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

interface IActivityResponse {
  message: string;
  data: IActivityGet;
}

interface UseActivitysParams {
  page?: number;
  limit?: number;
  productId?: string;
}

export function useActivitys({
  page = 1,
  limit = 10,
  productId,
}: UseActivitysParams = {}) {
  return useQuery({
    queryKey: ["activitys", page, limit, productId],
    queryFn: async () => {
      const response = await api.get<IActivityResponse>("/activitys", {
        params: {
          page,
          limit,
          productId,
        },
      });

      return response.data.data;
    },
  });
}

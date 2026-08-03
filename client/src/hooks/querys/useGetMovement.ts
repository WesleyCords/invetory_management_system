import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

interface IGetMovementResponse {
  message: string;
  data: IMovementGet;
}

export function useGetMovement({
  period,
  page,
  productId,
  limit,
  type,
  search,
}: UseGetMovementParams = {}) {
  return useQuery({
    queryKey: ["movements", period, page, productId, limit, type, search],
    queryFn: async () => {
      const response = await api.get<IGetMovementResponse>("/movements", {
        params: {
          period,
          page,
          productId,
          limit,
          type,
          search,
        },
      });

      return response.data.data;
    },
  });
}

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
}: UseGetMovementParams = {}) {
  return useQuery({
    queryKey: ["movements", period, page, productId],
    queryFn: async () => {
      const response = await api.get<IGetMovementResponse>("/movements", {
        params: {
          period,
          page,
          productId,
        },
      });

      return response.data.data;
    },
  });
}

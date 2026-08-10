import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

interface IGetAnalyticsResponse {
  message: string;
  data: AnalyticsResponse;
}

export function useGetAnalytics({
  periodInDays,
}: { periodInDays?: number } = {}) {
  return useQuery({
    queryKey: ["analytics", periodInDays],
    queryFn: async () => {
      const response = await api.get<IGetAnalyticsResponse>(
        "/analytics/stats",
        {
          params: {
            periodInDays,
          },
        },
      );

      return response.data.data;
    },
  });
}

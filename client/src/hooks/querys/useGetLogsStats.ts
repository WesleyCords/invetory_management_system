import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface IGetLogsStatsResponse {
  message: string;
  data: LogsStatsResponse;
}

type LogsStatsProps = {
  periodInDays: number;
  search?: string;
  userId?: string;
  page: number;
  limit: number;
};

export function useGetLogsStats({
  periodInDays,
  search,
  userId,
  page,
  limit,
}: LogsStatsProps) {
  return useQuery({
    queryKey: ["logs-stats", periodInDays, search, userId, page, limit],
    queryFn: async () => {
      const response = await api.get<IGetLogsStatsResponse>("/audit-logs", {
        params: {
          period: periodInDays,
          search,
          userId,
          page,
          limit,
        },
      });

      return response.data.data;
    },
  });
}

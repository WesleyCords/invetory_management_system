import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

interface IGetAnalyticsWorkflowChartResponse {
  message: string;
  data: WorkflowChartData[];
}

type WorkflowChartReq = {
  periodInDays: number;
};

export function useGetAnalyticsWorkflowChart({
  periodInDays,
}: WorkflowChartReq) {
  return useQuery({
    queryKey: ["analytics-workflow-chart", periodInDays],
    queryFn: async () => {
      const response = await api.get<IGetAnalyticsWorkflowChartResponse>(
        "/analytics/workflow-chart",
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

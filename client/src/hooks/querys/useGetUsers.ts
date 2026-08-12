import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

type IGetUsersResponse = {
  message: string;
  data: {
    id: string;
    name: string;
    username: string;
    role: "EMPLOYEE";
    avatarUrl: string | null;
  }[];
};

export function useGetUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await api.get<IGetUsersResponse>("/users");

      return response.data.data;
    },
  });
}

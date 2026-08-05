// src/hooks/querys/useUploadAvatar.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useAuthState } from "@/store/useAuthState";

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const updateUser = useAuthState((state) => state.updateUser);

  return useMutation({
    mutationFn: async ({ name, username }: PatchUserProfile) => {
      const response = await api.patch("/user/profile", {
        name,
        username,
      });

      return response.data.data;
    },
    onSuccess: (data) => {
      updateUser({ name: data.name, username: data.username });
      toast.success("Dados do perfil atualizados com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
    onError: (data) => {
      toast.error(
        data.message || "Falha ao atualizar o perfil. Tente novamente.",
      );
    },
  });
}

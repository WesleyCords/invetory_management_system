// src/hooks/querys/useUploadAvatar.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useAuthState } from "@/store/useAuthState";

export function useUploadAvatar() {
  const queryClient = useQueryClient();

  const updateUser = useAuthState((state) => state.updateUser);

  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();

      formData.append("file", file);

      const response = await api.patch("/user/upload-avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    },
    onSuccess: (data) => {
      updateUser({ avatarUrl: data.avatarUrl });
      toast.success("Foto de perfil atualizada!");
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
    onError: () => {
      toast.error("Falha ao atualizar a imagem. Tente uma imagem menor.");
    },
  });
}

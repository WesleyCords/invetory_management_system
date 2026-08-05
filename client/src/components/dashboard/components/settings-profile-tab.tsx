import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useUpdateProfile } from "@/hooks/querys/useUpdateProfile";
import { useUploadAvatar } from "@/hooks/querys/useUploadAvatar";
import { avatarWithName } from "@/lib/utils";
import { useAuthState } from "@/store/useAuthState";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const profileSchema = z.object({
  name: z.string().min(1, "O nome completo é obrigatório."),
  username: z.string().min(1, "O nome de usuário é obrigatório."),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function SettingsProfileTab() {
  const user = useAuthState((state) => state.user);

  const [previewUrl, setPreviewUrl] = useState<string | null>(
    user?.avatarUrl || null,
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      username: user?.username || "",
    },
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: uploadAvatar, isPending } = useUploadAvatar();
  const { mutate: updateProfile, isPending: isUpdatingProfile } =
    useUpdateProfile();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.warning(
        "O arquivo é muito grande. O tamanho máximo permitido é 5MB.",
      );
      return;
    }

    setPreviewUrl(URL.createObjectURL(file));
    setSelectedFile(file);
  };

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      setIsSaving(true);

      if (selectedFile) {
        await uploadAvatar(selectedFile);
      }

      if (isDirty) {
        updateProfile(data);
      }

      setSelectedFile(null);
    } catch (error) {
      toast.error("Ocorreu um erro ao salvar as alterações.");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="p-5">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="h-24 w-24 border-border border">
              {previewUrl ? (
                <AvatarImage
                  src={previewUrl}
                  alt="Foto Do Perfil"
                  className="object-cover"
                />
              ) : null}
              <AvatarFallback className="bg-primary text-xl font-semibold text-primary-foreground">
                {avatarWithName(user?.name)}
              </AvatarFallback>
            </Avatar>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isSaving}
              className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-card bg-primary text-primary-foreground transition-transform hover:scale-110"
            >
              <Camera className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="space-y-1">
            <p className="font-medium">Foto de Perfil</p>
            <p className="text-muted-foreground">JPG, PNG ou WebP. Max 5MB.</p>
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
              >
                Escolher foto
              </Button>
              {selectedFile && (
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    setSelectedFile(null);
                    setPreviewUrl(user?.avatarUrl || null);
                  }}
                >
                  Remover
                </Button>
              )}
            </div>
          </div>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".jpg, .jpeg, .png, .webp, image/jpeg, image/png, image/webp"
          onChange={handleFileChange}
        />

        <Separator />

        <Field>
          <FieldLabel htmlFor="name">Nome completo</FieldLabel>
          <Input
            id="name"
            {...register("name")}
            className="bg-secondary border-border"
          />
          {errors.name && <FieldError>{errors.name.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="username">Nome de usuário</FieldLabel>
          <div className="flex items-center">
            <span className="flex h-9 items-center rounded-l-md border border-r-0 border-border bg-muted px-3 text-sm text-muted-foreground">
              @
            </span>
            <Input
              id="username"
              {...register("username")}
              className="rounded-l-none bg-secondary border-border"
            />
          </div>
          {errors.username && (
            <FieldError>{errors.username.message}</FieldError>
          )}
        </Field>

        <div className="flex items-center justify-end gap-3">
          <Button
            type="submit"
            disabled={isSaving || (!isDirty && !selectedFile)}
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : (
              "Salvar alterações"
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
}

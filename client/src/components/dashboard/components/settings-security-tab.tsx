import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { useChangePassword } from "@/hooks/querys/useChangePassword";

const securitySchema = z
  .object({
    currentPassword: z.string().min(1, "A senha atual é obrigatória."),
    newPassword: z
      .string()
      .min(6, "A nova senha precisa ter no mínimo 6 caracteres."),
    confirmPassword: z.string().min(1, "Confirme a sua nova senha."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

type SecurityFormData = z.infer<typeof securitySchema>;

export function SettingsSecurityTab() {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const {
    mutate: changePassword,
    isPending: isUpdating,
    isSuccess: isChangePasswordSuccess,
  } = useChangePassword();

  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<SecurityFormData>({
    resolver: zodResolver(securitySchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: SecurityFormData) => {
    const { currentPassword, newPassword } = data;
    changePassword(
      { currentPassword, newPassword },
      {
        onSuccess: () => {
          setIsSuccess(true);
          form.reset();
          setTimeout(() => setIsSuccess(false), 3000);
        },
      },
    );
    isChangePasswordSuccess ? setIsSuccess(true) : setIsSuccess(false);
    form.reset();
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <Card className="p-5">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            Alterar senha
          </h3>
          <p className="text-sm text-muted-foreground">
            Use uma senha forte para proteger sua conta
          </p>
        </div>

        <Field>
          <FieldLabel htmlFor="current">Senha atual</FieldLabel>
          <div className="relative">
            <Input
              id="current"
              type={showPassword.current ? "text" : "password"}
              className="bg-secondary border-border pr-10"
              {...form.register("currentPassword")}
            />
            <button
              type="button"
              onClick={() =>
                setShowPassword((v) => ({ ...v, current: !v.current }))
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword.current ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          <FieldError errors={[form.formState.errors.currentPassword]} />
        </Field>

        <Field>
          <FieldLabel htmlFor="new">Nova senha</FieldLabel>
          <div className="relative">
            <Input
              id="new"
              type={showPassword.new ? "text" : "password"}
              className="bg-secondary border-border pr-10"
              {...form.register("newPassword")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => ({ ...v, new: !v.new }))}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword.new ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          <FieldError errors={[form.formState.errors.newPassword]} />
        </Field>

        <Field>
          <FieldLabel htmlFor="confirm">Confirmar nova senha</FieldLabel>
          <div className="relative">
            <Input
              id="confirm"
              type={showPassword.confirm ? "text" : "password"}
              className="bg-secondary border-border pr-10"
              {...form.register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() =>
                setShowPassword((v) => ({ ...v, confirm: !v.confirm }))
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword.confirm ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          <FieldError errors={[form.formState.errors.confirmPassword]} />
        </Field>

        <div className="flex items-center justify-end gap-3">
          {isSuccess && (
            <span className="flex items-center gap-1 text-sm text-primary">
              <Check className="h-4 w-4" />
              Senha alterada
            </span>
          )}
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {isUpdating ? "Atualizando..." : "Atualizar senha"}
          </Button>
        </div>
      </form>
    </Card>
  );
}

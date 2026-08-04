import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export function SettingsSecurityTab() {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  return (
    <Card className="p-5">
      <form className="space-y-6">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            Alterar senha
          </h3>
          <p className="text-sm text-muted-foreground">
            Use uma senha forte para proteger sua conta
          </p>
        </div>

        {/* Senha atual */}
        <div className="space-y-2">
          <Label htmlFor="current" className="text-foreground">
            Senha atual
          </Label>
          <div className="relative">
            <Input
              id="current"
              type={showPassword.current ? "text" : "password"}
              className="bg-secondary border-border pr-10"
            />
            <button
              type="button"
              onClick={() =>
                setShowPassword((v) => ({ ...v, current: !v.current }))
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={
                showPassword.current ? "Ocultar senha" : "Mostrar senha"
              }
            >
              {showPassword.current ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Nova senha */}
        <div className="space-y-2">
          <Label htmlFor="new" className="text-foreground">
            Nova senha
          </Label>
          <div className="relative">
            <Input
              id="new"
              type={showPassword.new ? "text" : "password"}
              className="bg-secondary border-border pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => ({ ...v, new: !v.new }))}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={showPassword.new ? "Ocultar senha" : "Mostrar senha"}
            >
              {showPassword.new ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Confirmar senha */}
        <div className="space-y-2">
          <Label htmlFor="confirm" className="text-foreground">
            Confirmar nova senha
          </Label>
          <div className="relative">
            <Input
              id="confirm"
              type={showPassword.confirm ? "text" : "password"}
            />
            <button
              type="button"
              onClick={() =>
                setShowPassword((v) => ({ ...v, confirm: !v.confirm }))
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={
                showPassword.confirm ? "Ocultar senha" : "Mostrar senha"
              }
            >
              {showPassword.confirm ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {true && <p className="text-sm text-destructive">ERRO</p>}

        <div className="flex items-center justify-end gap-3">
          {true && (
            <span className="flex items-center gap-1 text-sm text-primary">
              <Check className="h-4 w-4" />
              Senha alterada
            </span>
          )}
          <Button type="submit">Atualizar senha</Button>
        </div>
      </form>
    </Card>
  );
}

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { avatarWithName } from "@/lib/utils";
import { useAuthState } from "@/store/useAuthState";
import { Camera, Check, Trash2 } from "lucide-react";
import { useRef } from "react";

export function SettingsProfileTab() {
  const user = useAuthState((state) => state.user);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <Card className="p-5">
      <form className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="h-24 w-24 border-border border">
              {user.avatarUrl ? (
                <AvatarImage src={user.avatarUrl} alt="Foto Do Perfil" />
              ) : null}
              <AvatarFallback className="bg-primary text-xl font-semibold text-primary-foreground">
                {avatarWithName(user?.name)}
              </AvatarFallback>
            </Avatar>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-card bg-primary text-primary-foreground transition-transform hover:scale-110"
              aria-label="Alterar foto"
            >
              <Camera className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="space-y-1">
            <p className="font-medium">Foto de Perfil</p>
            <p className="text-muted-foreground">JPG, PNG ou GIF. Max 2MB.</p>
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                className="bg-secondary text-accent-foreground border border-border"
              >
                Enviar foto
              </Button>
              {true && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="border border-red-500/50"
                >
                  <Trash2 className="h-4 w-4" />
                  Remover
                </Button>
              )}
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <Label htmlFor="name" className="text-foreground">
            Nome completo
          </Label>
          <Input id="name" className="bg-secondary border-border" />
        </div>

        {/* Username */}
        <div className="space-y-2">
          <Label htmlFor="username" className="text-foreground">
            Nome de usuario
          </Label>
          <div className="flex items-center">
            <span className="flex h-9 items-center rounded-l-md border border-r-0 border-border bg-muted px-3 text-sm text-muted-foreground">
              @
            </span>
            <Input
              id="username"
              className="rounded-l-none bg-secondary border-border"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          {true && (
            <span className="flex items-center gap-1 text-sm text-primary">
              <Check className="h-4 w-4" />
              Salvo
            </span>
          )}
          <Button type="submit">Salvar alteracoes</Button>
        </div>
      </form>
    </Card>
  );
}

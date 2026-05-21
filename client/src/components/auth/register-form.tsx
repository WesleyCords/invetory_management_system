import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Mail, User, Lock, EyeOff, Eye, Check, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const passwordStrength = {
    hasMinLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
  };

  const strengthCount = Object.values(passwordStrength).filter(Boolean).length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Conta criada com sucesso!", {
      description: "Bem-vindo ao Nexus Dashboard. Agora é só fazer o login.",
    });

    setIsLoading(false);
    // Add registration logic here
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Nome completo
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="pl-10 h-12 bg-secondary border-border focus:border-primary focus:ring-primary"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 h-12 bg-secondary border-border focus:border-primary focus:ring-primary"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Senha</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Crie uma senha forte"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10 pr-10 h-12 bg-secondary border-border focus:border-primary focus:ring-primary"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Password Strength Indicator */}
        {password && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="space-y-2 pt-2"
          >
            <div className="flex gap-1.5">
              {[1, 2, 3].map((level) => (
                <div
                  key={level}
                  className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                    level <= strengthCount
                      ? strengthCount === 1
                        ? "bg-destructive"
                        : strengthCount === 2
                          ? "bg-amber-500"
                          : "bg-primary"
                      : "bg-secondary"
                  }`}
                />
              ))}
            </div>
            <div className="space-y-1">
              {[
                { key: "hasMinLength", label: "Pelo menos 8 caracteres" },
                { key: "hasUppercase", label: "Uma letra maiuscula" },
                { key: "hasNumber", label: "Um numero" },
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center gap-2 text-xs">
                  <div
                    className={`h-3.5 w-3.5 rounded-full flex items-center justify-center ${
                      passwordStrength[key as keyof typeof passwordStrength]
                        ? "bg-primary"
                        : "bg-secondary"
                    }`}
                  >
                    {passwordStrength[key as keyof typeof passwordStrength] && (
                      <Check className="h-2.5 w-2.5 text-primary-foreground" />
                    )}
                  </div>

                  <span
                    className={
                      passwordStrength[key as keyof typeof passwordStrength]
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
        <Button
          type="submit"
          className="w-full cursor-pointer h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
          disabled={isLoading || strengthCount < 3}
        >
          {isLoading ? (
            <motion.div
              className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          ) : (
            <>
              Criar conta
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </motion.div>

      <p className="text-center text-xs text-muted-foreground">
        Ao criar uma conta, voce concorda com nossos{" "}
        <button type="button" className="text-primary hover:underline">
          Termos de Servico
        </button>{" "}
        e{" "}
        <button type="button" className="text-primary hover:underline">
          Politica de Privacidade
        </button>
      </p>
    </form>
  );
}

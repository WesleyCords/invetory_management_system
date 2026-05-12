import { AnimatePresence, compareByDepth } from "framer-motion";
import { motion } from "framer-motion";

import {
  BarChart3,
  Clock,
  Database,
  Globe,
  Shield,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

interface FeatureShowcaseProps {
  isLogin: boolean;
}

const loginFeatures = [
  {
    icon: BarChart3,
    title: "Analytics Poderoso",
    description:
      "Visualize seus dados em tempo real com dashboards interativos",
    color: "from-primary/20 to-primary/5",
  },
  {
    icon: Shield,
    title: "Seguranca Avancada",
    description: "Protecao de nivel empresarial para seus dados",
    color: "from-slate-500/20 to-slate-500/5",
  },
  {
    icon: Zap,
    title: "Performance Otimizada",
    description: "Carregamento instantaneo e experiencia fluida",
    color: "from-slate-400/20 to-slate-400/5",
  },
];

const registerFeatures = [
  {
    icon: Users,
    title: "Colaboracao em Equipe",
    description: "Trabalhe junto com sua equipe em tempo real",
    color: "from-primary/20 to-primary/5",
  },
  {
    icon: TrendingUp,
    title: "Crescimento Garantido",
    description: "Ferramentas para escalar seu negocio",
    color: "from-slate-500/20 to-slate-500/5",
  },
  {
    icon: Database,
    title: "Dados Centralizados",
    description: "Todas as suas informacoes em um so lugar",
    color: "from-slate-400/20 to-slate-400/5",
  },
];

export function FeatureShowcase({ isLogin }: FeatureShowcaseProps) {
  const features = isLogin ? loginFeatures : registerFeatures;
  return (
    <div className="w-full max-w-lg">
      <AnimatePresence mode="wait">
        <motion.div
          key={isLogin ? "login" : "register"}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="space-y-4"
        >
          <div className="space-y-3">
            <motion.h1
              className="text-4xl font-bold text-balance text-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {isLogin ? "Bem-vindo de volta" : "Comece sua jornada"}
            </motion.h1>
            <motion.p
              className="text-lg text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {isLogin
                ? "Acesse seu painel e continue de onde parou"
                : "Crie sua conta e descubra o poder do Nexus"}
            </motion.p>
          </div>

          <div className="space-y-4 pt-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={
                  "group relative overflow-hidden rounded-xl border border-border bg-card" +
                  " p-5 transition-all duration-300 hover:border-primary/60"
                }
              >
                {/* Hover */}
                <div
                  className={`absolute inset-0 bg-linear-to-br ${feature.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                />
                <div className="relative flex items-start gap-4 pointer-events-none">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-3 gap-2 pt-6"
          >
            {[
              { icon: Users, value: "10k+", label: "Usuarios" },
              { icon: Globe, value: "50+", label: "Paises" },
              { icon: Clock, value: "99.9%", label: "Uptime" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center gap-1.5 text-2xl font-bold text-foreground">
                  <stat.icon className="h-4 w-4 text-primary" />
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

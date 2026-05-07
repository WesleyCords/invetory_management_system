"use client";
//import { Button } from "@/components/ui/button";
//import { useState } from "react";
import { motion } from "framer-motion";

export function AuthPage() {
  //const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <motion.div
        initial={{ opacity: 0, x: -100 }} // Nasce invisível e arrastado para a esquerda
        animate={{ opacity: 1, x: 0 }} // Desliza para o centro e aparece
        transition={{ duration: 0.8, ease: "easeOut" }} // Demora 0.6s freando suavemente
      >
        <h1 className="text-4xl font-bold text-foreground">Nexus System</h1>
      </motion.div>
    </div>
  );
}

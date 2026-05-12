"use client";
//import { Button } from "@/components/ui/button";
//import { useState } from "react";
import { motion } from "framer-motion";
import { FloatingParticles } from "./floating-particles";
import { FeatureShowcase } from "./feature-showcase";

export function AuthPage() {
  //const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <FloatingParticles />
      <div className="relative z-10 flex min-h-screen">
        <motion.div
          className="hidden lg:flex lg:w-1/2 items-center justify-center p-12"
          initial={{
            opacity: 0,
            x: -50,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
        >
          <FeatureShowcase isLogin={true} />
        </motion.div>
      </div>
    </div>
  );
}

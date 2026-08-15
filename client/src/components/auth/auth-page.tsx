"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FloatingParticles } from "./floating-particles";
import { FeatureShowcase } from "./feature-showcase";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <FloatingParticles />

      <div className="relative z-10 flex min-h-screen">
        <motion.div
          className="lg:flex hidden lg:w-1/2 items-center justify-center p-12"
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
          <FeatureShowcase isLogin={isLogin} />
        </motion.div>

        <div className="flex w-full items-center lg:w-1/2 justify-center p-6 lg:p-10">
          <motion.div
            className="w-full max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Logo */}
            <div className="mb-4 text-center lg:text-left">
              <motion.div
                className="inline-flex items-center gap-2 mb-4"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                  <svg
                    className="h-6 w-6 bg-primary text-primary-foreground"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <span className="text-2xl font-bold text-foreground pointer-events-none">
                  System Inventory
                </span>
              </motion.div>
            </div>

            {/* Toggle do menu*/}
            <div className="relative mb-6">
              <div className="flex rounded-xl p-1 bg-secondary">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`relative flex-1 cursor-pointer rounded-lg py-2.5 text-sm font-medium transition-all duration-300 ${
                    isLogin
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isLogin && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-lg bg-primary"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">Entrar</span>
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`relative cursor-pointer flex-1 rounded-lg py-2.5 text-sm font-medium transition-all duration-300 ${
                    !isLogin
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {!isLogin && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-lg bg-primary"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">Criar Conta</span>
                </button>
              </div>
            </div>

            {/* Inputs do form */}
            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <LoginForm />
                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <RegisterForm onRegistered={() => setIsLogin(true)} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

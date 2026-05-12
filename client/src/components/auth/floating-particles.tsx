"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function FloatingParticles() {
  const [particles, setParticles] = useState<
    { id: number; left: number; top: number; duration: number; delay: number }[]
  >([]);

  useEffect(() => {
    const generated = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-40 -right-40 h-80 w-80 bg-primary/10 rounded-full blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl"
        animate={{
          x: [0, -20, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute h-1 w-1 rounded-full bg-primary"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: p.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

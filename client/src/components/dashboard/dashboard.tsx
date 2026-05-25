"use client";
import { motion } from "framer-motion";

export function Dashboard() {
  return (
    <motion.div className="flex w-min-screen h-screen items-center">
      <div className="flex w-75 bg-red-500 h-screen ">menu</div>
      <div className="flex-1 bg-green-500 h-screen ">
        <div>header</div>
        <main className="flex-1 bg-blue-500 h-screen ">Content</main>
      </div>
    </motion.div>
  );
}

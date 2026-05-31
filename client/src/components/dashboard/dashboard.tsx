"use client";
import { motion } from "framer-motion";
import { DashboardSideBar } from "./dashboard-siderbar";
import { DashboardHeader } from "./dashboard-header";
import { DashboardContent } from "./dashboard-content";
import { useIsMobile } from "@/hooks/use-mobile";
import { DashboardMobile } from "../test-mobile";

export function Dashboard() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <DashboardMobile />;
  }

  return (
    <motion.div
      className="flex h-screen w-full overflow-hidden bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <DashboardSideBar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader />

        <main className="flex-1 overflow-y-auto p-6 custom-scroll">
          <DashboardContent />
        </main>
      </div>
    </motion.div>
  );
}

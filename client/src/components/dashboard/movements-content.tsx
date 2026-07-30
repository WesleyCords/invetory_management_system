import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Replace } from "lucide-react";
import { useUiMovement } from "@/store/useUiMovement";
import { MovementDialog } from "./components/movement-dialog";

export function MovementsContent() {
  const openModal = useUiMovement((state) => state.openModal);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-4"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Movimentações</h1>
            <p className="text-md text-muted-foreground">
              Registre entradas e saidas do estoque
            </p>
          </div>
          <Button variant="outline" onClick={() => openModal()}>
            <Replace />
            <span>Registar Movimentação</span>
          </Button>
        </div>
      </motion.div>

      <MovementDialog />
    </>
  );
}

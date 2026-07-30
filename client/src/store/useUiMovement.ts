import { create } from "zustand";

export type FormMoviment = {
  id: string;
  type: "IN" | "OUT";
  quantity: number;
};

export interface UiMovementStore {
  isOpen: boolean;
  selectedProduct: { id: string; name: string } | null;
  openModal: (product?: { id: string; name: string }) => void;
  closeModal: () => void;
}

export const useUiMovement = create<UiMovementStore>((set) => ({
  isOpen: false,
  selectedProduct: null,
  openModal: (product) =>
    set({ isOpen: true, selectedProduct: product || null }),
  closeModal: () => set({ isOpen: false, selectedProduct: null }),
}));

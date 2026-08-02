import { create } from "zustand";
export interface UiMovementStore {
  isOpen: boolean;
  currentPage: number;
  onChangePage: (page: number) => void;
  selectedProduct: { id: string; name: string } | null;
  openModal: (product?: { id: string; name: string }) => void;
  closeModal: () => void;
}

export const useUiMovement = create<UiMovementStore>((set) => ({
  currentPage: 1,
  isOpen: false,
  selectedProduct: null,
  onChangePage: (page) => set({ currentPage: page }),
  openModal: (product) =>
    set({ isOpen: true, selectedProduct: product || null }),
  closeModal: () => set({ isOpen: false, selectedProduct: null }),
}));

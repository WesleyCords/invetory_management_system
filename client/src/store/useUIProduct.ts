import { create } from "zustand";

interface Products {
  currentPage: number;
  itemsPerPages: number;
  previusPage: () => void;
  nextPage: () => void;
  search: string;
  onChangeSearch: (text: string) => void;
}

export const useUIProducts = create<Products>((set) => ({
  // Estado Inicial
  search: "",
  currentPage: 1,
  itemsPerPages: 10,

  // Actions as únicas funções autorizadas a mexer no estado
  onChangeSearch: (text) => set({ search: text }),
  previusPage: () => set((state) => ({ currentPage: state.currentPage - 1 })),
  nextPage: () => set((state) => ({ currentPage: state.currentPage + 1 })),
}));

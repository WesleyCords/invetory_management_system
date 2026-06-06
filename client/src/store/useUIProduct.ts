import { create } from "zustand";

interface Products {
  currentPage: number;
  itemsPerPages: number;
  productToEdit: IProduct | null;
  search: string;
  dialogOpen: boolean;

  previusPage: () => void;
  nextPage: () => void;
  onChangeSearch: (text: string) => void;
  openNewProductDialog: () => void;
  openEditProductDialog: (product: IProduct) => void;
  closeDialog: () => void;
}

export const useUIProducts = create<Products>((set) => ({
  // Estado Inicial
  search: "",
  currentPage: 1,
  itemsPerPages: 10,
  productToEdit: null,
  dialogOpen: false,

  // Actions as únicas funções autorizadas a mexer no estado
  onChangeSearch: (text) => set({ search: text }),
  previusPage: () => set((state) => ({ currentPage: state.currentPage - 1 })),
  nextPage: () => set((state) => ({ currentPage: state.currentPage + 1 })),
  openNewProductDialog: () => set({ dialogOpen: true, productToEdit: null }),
  openEditProductDialog: (product) =>
    set({ dialogOpen: true, productToEdit: product }),
  closeDialog: () => set({ dialogOpen: false, productToEdit: null }),
}));

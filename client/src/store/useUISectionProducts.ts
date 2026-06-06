import { create } from "zustand";

interface Products {
  currentPage: number;
  itemsPerPages: number;
  productToEdit: IProduct | null;
  search: string;
  dialogOpen: boolean;
  categorySelected: string;
  sortField: keyof IProduct;
  sortOrder: "asc" | "desc";

  previusPage: () => void;
  nextPage: () => void;
  onChangeSearch: (text: string) => void;
  openNewProductDialog: () => void;
  openEditProductDialog: (product: IProduct) => void;
  closeDialog: () => void;
  handleCategoryChange: (category: string) => void;
  handleSortChange: (field: keyof IProduct) => void;
}

export const useUISectionProducts = create<Products>((set) => ({
  // Estado Inicial
  search: "",
  currentPage: 1,
  itemsPerPages: 10,
  productToEdit: null,
  dialogOpen: false,
  categorySelected: "Todos",
  sortField: "name",
  sortOrder: "asc",

  // Actions as únicas funções autorizadas a mexer no estado
  onChangeSearch: (text) => set({ search: text }),
  previusPage: () => set((state) => ({ currentPage: state.currentPage - 1 })),
  nextPage: () => set((state) => ({ currentPage: state.currentPage + 1 })),
  openNewProductDialog: () => set({ dialogOpen: true, productToEdit: null }),
  openEditProductDialog: (product) =>
    set({ dialogOpen: true, productToEdit: product }),
  closeDialog: () => set({ dialogOpen: false, productToEdit: null }),
  handleCategoryChange: (category) => set({ categorySelected: category }),
  handleSortChange: (field) =>
    set((state) => ({
      sortField: field,
      sortOrder:
        state.sortField === field
          ? state.sortOrder === "asc"
            ? "desc"
            : "asc"
          : "asc",
    })),
}));

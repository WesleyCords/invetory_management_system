import { create } from "zustand";

interface ProductsUIState {
  currentPage: number;
  itemsPerPages: number;
  search: string;
  dialogOpen: boolean;
  categorySelected: string;
  sortField: keyof IProduct;
  sortOrder: "asc" | "desc";

  previusPage: () => void;
  nextPage: () => void;
  onChangeSearch: (text: string) => void;
  openNewProductDialog: () => void;
  openEditProductDialog: () => void;
  closeDialog: () => void;
  handleCategoryChange: (category: string) => void;
  handleSortChange: (field: keyof IProduct) => void;
}

export const useUISectionProducts = create<ProductsUIState>((set) => ({
  search: "",
  currentPage: 1,
  itemsPerPages: 10,
  dialogOpen: false,
  categorySelected: "Todos",
  sortField: "name",
  sortOrder: "asc",

  onChangeSearch: (text) => set({ search: text }),
  previusPage: () => set((state) => ({ currentPage: state.currentPage - 1 })),
  nextPage: () => set((state) => ({ currentPage: state.currentPage + 1 })),
  openNewProductDialog: () => set({ dialogOpen: true }),
  openEditProductDialog: () => set({ dialogOpen: true }),
  closeDialog: () => set({ dialogOpen: false }),
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

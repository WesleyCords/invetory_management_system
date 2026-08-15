import { create } from "zustand";

interface PaginationLogState {
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export const usePaginationLog = create<PaginationLogState>((set) => ({
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
}));

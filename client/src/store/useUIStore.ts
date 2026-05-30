import { create } from "zustand";

// Contrato para o TS entender
interface UIState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setAbartOpen: (aba: string) => void;
  abartOpen: string;
}

// Criação da store desse "armario"
export const useUIStore = create<UIState>((set) => ({
  // Estado Inicial
  isSidebarOpen: true,
  abartOpen: "overview",

  // Actions as únicas funções autorizadas a mexer no estado
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setAbartOpen: (aba) => set({ abartOpen: aba }),
}));

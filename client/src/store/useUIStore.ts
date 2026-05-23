import { create } from "zustand";

// Contrato para o TS entender
interface UIState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
}

// Criação da store desse "armario"
export const useUIStore = create<UIState>((set) => ({
  // Estado Inicial
  isSidebarOpen: true,

  // Ações (Actions) - As únicas funções autorizadas a mexer no estado
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
}));

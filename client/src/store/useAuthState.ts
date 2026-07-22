import { create } from "zustand";

enum UserRole {
  "ADMIN",
  "EMPLOYEE",
}

interface AuthState {
  user: {
    id: string;
    name: string;
    username: string;
    role: UserRole;
    avatarUrl?: string;
  } | null;
  setUser: (user: AuthState["user"]) => void;
  logout: () => void;
}

export const useAuthState = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

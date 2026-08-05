import { create } from "zustand";
import { persist } from "zustand/middleware";

enum UserRole {
  "MANAGER",
  "EMPLOYEE",
}

type User = {
  id: string;
  name: string;
  username: string;
  role: UserRole;
  avatarUrl?: string;
};

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUser: (data: Partial<User>) => void;
  logout: () => void;
}

export const useAuthState = create<AuthState>()(
  persist(
    (set) => ({
      user: null,

      setUser: (user) => set({ user }),
      updateUser: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),

      logout: () => set({ user: null }),
    }),
    {
      name: "auth-storage",
    },
  ),
);

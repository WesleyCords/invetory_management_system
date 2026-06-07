"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { setCookie } from "nookies";
import { api } from "@/lib/api";
type UserRole = "EMPLOYEE" | "MANAGER";

interface User {
  id: string;
  name: string;
  username: string;
  role: UserRole;
}

interface SignInCredentials {
  username: string;
  password: string;
}

interface AuthContextData {
  user: User | null;
  signIn: (credentials: SignInCredentials) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  async function signIn({ username, password }: SignInCredentials) {
    try {
      const response = await api.post("/login", {
        username,
        password,
      });

      const { token, user: userData } = response.data;
      setCookie(null, "nexus.token", token, {
        maxAge: 60 * 60 * 24,
        path: "/",
      });

      setUser(userData);

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // Para o if do AuthPage funcionar e redirecionar para a dashboard
      window.location.reload();
    } catch (error) {
      throw error;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

// Sem "use client"! Este é um Server Component poderoso.
import { cookies } from "next/headers";
import { AuthPage } from "@/components/auth/auth-page";
import { Dashboard } from "@/components/dashboard/dashboard";
import { useAuthState } from "@/store/useAuthState";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("nexus.token")?.value;

  if (token) {
    return <Dashboard />;
  }

  return <AuthPage />;
}

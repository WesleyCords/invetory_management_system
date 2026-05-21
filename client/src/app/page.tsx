// Sem "use client"! Este é um Server Component poderoso.
import { cookies } from "next/headers";
import { AuthPage } from "@/components/auth/auth-page";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("nexus.token")?.value;

  if (token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
      </div>
    );
  }

  return <AuthPage />;
}

import { AuthPage } from "@/components/auth/auth-page";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("nexus.token")?.value;

  if (token) {
    return (
      <div>
        <h1>Dashboard</h1>
      </div>
    );
  }

  return <AuthPage />;
}

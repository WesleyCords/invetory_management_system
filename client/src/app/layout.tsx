import type { Metadata } from "next";
import { Inter } from "next/font/google";
// O Analytics serve para coletar dados de uso da aplicação e aqui so ativa se for produção.
import { Analytics } from "@vercel/analytics/next";
import "./global.css";
import { Toaster } from "sonner";
import { QueryProvider } from "@/providers/query-provider";

interface PropsRootLayout {
  children: React.ReactNode;
}

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Dados que preencher o html
export const metadata: Metadata = {
  title: "System Inventory",
  description: "Plataforma de gerenciamento inteligente",
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }: PropsRootLayout) {
  return (
    <html lang="pt-BR" className="bg-background">
      <body className={`${inter.variable} font-sans antialiased`}>
        <QueryProvider>{children}</QueryProvider>

        {process.env.NODE_ENV === "production" && <Analytics />}

        <Toaster
          richColors
          closeButton
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: "16px",
            },
            className: "border-border bg-background text-foreground",
          }}
        />
      </body>
    </html>
  );
}

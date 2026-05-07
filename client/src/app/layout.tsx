import type { Metadata } from "next";
import { Inter } from "next/font/google";

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
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg", // Mudar
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }: PropsRootLayout) {
  return (
    <html lang="pt-BR" className="bg-background">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}

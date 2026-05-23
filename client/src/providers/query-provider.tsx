"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

interface QueryProviderProps {
  children: ReactNode;
}

export const QueryProvider = ({ children }: QueryProviderProps) => {
  const queryClient = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false, // Refetch quando a janela ganhar foco
            refetchOnReconnect: false, // Refetch quando o usuário reconectar à internet
            retry: 1, // Número de tentativas de refetch em caso de falha
            staleTime: 1000 * 60 * 5, // Tempo para o dado ser fresco (cache)
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient[0]}>
      {children}
    </QueryClientProvider>
  );
};

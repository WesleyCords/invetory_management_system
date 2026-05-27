"use client";
import * as React from "react";

// Criei esse hook para não usar a props do CSS para gerenciar tamanho da tela,
// pois isso não é reativo e pode causar problemas em alguns casos,
// como quando o usuário redimensiona a janela ou quando a aplicação é
// usada em um dispositivo móvel. Com esse hook, podemos ter uma abordagem mais reativa
// e garantir que a aplicação se adapte corretamente ao tamanho da tela.

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  // Como o next carrega no servidor e nao tem tela,
  // deixamos que monte normal e quando tiver no browser ele seta o valor correto,
  // assim evitamos problemas de mismatch entre server e client
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);

    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

//twMerge ele obedece a ultima propriedade css passadano componente
// clsx permite que eu coloque blocos condicionais em class
// inputs é as tags normais que passa dentro da function

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function avatarWithName(name: string): string {
  if (!name) return "";

  const ignoredConnectors = ["da", "de", "do", "das", "dos"];

  const validNames = name
    .trim()
    .split(/\s+/)
    .filter((part) => !ignoredConnectors.includes(part.toLowerCase()));

  if (validNames.length === 1) {
    return validNames[0].charAt(0).toUpperCase();
  }

  const firstInitial = validNames[0].charAt(0);
  const lastInitial = validNames[validNames.length - 1].charAt(0);

  return `${firstInitial}${lastInitial}`.toUpperCase();
}

export function primaryLetterUppercase(str: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

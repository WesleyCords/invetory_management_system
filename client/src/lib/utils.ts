import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

//twMerge ele obedece a ultima propriedade css passadano componente
// clsx permite que eu coloque blocos condicionais em class
// inputs é as tags normais que passa dentro da function

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const titleCase = (s: string) => {
    return s.toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
}

export const unitConversion = (figure: number) => {
    return figure / 10;
}

export function formatStatName(stat: string): string {
  return stat
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
    .join(" ");
}
